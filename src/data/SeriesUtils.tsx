import { DataFrame, Vector } from '@grafana/data';
import { BinType, DataFormat, MaxType, SortMode, SortType, ZeroType } from 'types';
import { Series } from './Series';
import { TimeRange } from './TimeRange';

export function getDataSeries(
  dataFrames: DataFrame[],
  valueField: string,
  rowField: string,
  groupField: string,
  sortType: SortType,
  sortMode: SortMode,
  numColumns: number,
  timeRange: TimeRange,
  dataFormat: DataFormat,
  maxRows: number,
  binType: BinType,
  zeroType: ZeroType
): Series[] {
  let rows: Record<string, Series> = {};

  if (dataFormat === 'singleFrame') {
    if (dataFrames.length > 1) {
      throw new Error('Single frame data format expects exactly 1 data frame.  Found ' + dataFrames.length);
    }
    extractRowsFromSingleFrame(rows, dataFrames[0], numColumns, timeRange, valueField, rowField, groupField, binType, zeroType);
  } else {
    dataFrames.forEach((dataFrame) => {
      let timestamps = calculateTimestamps(dataFrame.fields, numColumns, timeRange);
      addRows(rows, dataFrame.fields, valueField, rowField, groupField, numColumns, dataFormat, binType, timestamps, zeroType);
    });
  }

  let result: Series[] = [];
  for (let rowName in rows) {
    result.push(rows[rowName]);
  }

  sortSeries(result, sortType, sortMode);
  result = truncateSeries(result, maxRows);

  return result;
}

export function getNumColumns(dataFrames: DataFrame[]) {
  return dataFrames[0].fields[0].values.length;
}

export function sortSeries(series: Series[], sortType: SortType, sortMode: SortMode) {
  switch (sortType) {
    case 'lex':
      series.sort(compareBySortKeyLex);
      break;
    case 'max':
      updateGroupMax(series);
      series.sort(compareByGroupMax);
      break;
    case 'sum':
      updateGroupSum(series);
      series.sort(compareByGroupSum);
      break;
  }
  if (sortMode === 'desc') {
    series.reverse();
  }
}

function compareByGroupMax(a: Series, b: Series) {
  if (a.getGroupMax() === b.getGroupMax()) {
    return compareByMax(a, b);
  }
  return a.getGroupMax() > b.getGroupMax() ? 1 : -1;
}

function compareByMax(a: Series, b: Series) {
  if (a.getMaxValue() === b.getMaxValue()) {
    return 0;
  }
  return a.getMaxValue() > b.getMaxValue() ? 1 : -1;
}

function compareByGroupSum(a: Series, b: Series) {
  if (a.getGroupSum() === b.getGroupSum()) {
    return compareBySum(a, b);
  }
  return a.getGroupSum() > b.getGroupSum() ? 1 : -1;
}

function compareBySum(a: Series, b: Series) {
  if (a.getSum() === b.getSum()) {
    return 0;
  }
  return a.getSum() > b.getSum() ? 1 : -1;
}

function compareBySortKeyLex(a: Series, b: Series) {
  let groupA = normalizeName(a.getGroup());
  let groupB = normalizeName(b.getGroup());

  if (groupA === undefined || groupB === undefined || groupA === groupB) {
    return compareLex(normalizeName(a.getName()), normalizeName(b.getName()));
  }
  return compareLex(normalizeName(groupA), normalizeName(groupB));
}

function compareLex(a: string | undefined, b: string | undefined): number {
  if (a === undefined || b === undefined) {
    return 0;
  }
  if (!isNaN(+a) && !isNaN(+b)) {
    return compareNumeric(+a, +b);
  }
  if (!isNaN(+a) && isNaN(+b)) {
    return -1;
  }
  if (isNaN(+a) && !isNaN(+b)) {
    return 1;
  }
  if (a === b) {
    return 0;
  }
  return 0 - (a < b ? 1 : -1);
}

function compareNumeric(a: number, b: number): number {
  if (a === b) {
    return 0;
  }
  return 0 - (a > b ? -1 : 1);
}

export function getTimeRange(series: DataFrame[]): TimeRange {
  let minTimestamp = -1;
  let maxTimestamp = 0;

  for (let index = 0; index < series.length; index++) {
    let dataFrame = series[index];

    let timestampsFieldIndex = -1;
    for (let index = 0; index < dataFrame.fields.length; index++) {
      if (dataFrame.fields[index].type === 'time') {
        timestampsFieldIndex = index;
        break;
      }
    }
    if (timestampsFieldIndex === -1) {
      throw new Error('Unable to find a time field');
    }

    let timestamps = dataFrame.fields[timestampsFieldIndex].values;
    if (minTimestamp === -1 || minTimestamp > timestamps.get(0)) {
      minTimestamp = timestamps.get(0);
    }
    if (maxTimestamp < timestamps.get(timestamps.length - 1)) {
      maxTimestamp = timestamps.get(timestamps.length - 1);
    }
  }

  return new TimeRange(minTimestamp, maxTimestamp);
}

export function normalizeName(name?: string) {
  if (name === undefined) {
    return undefined;
  }
  // Normalize bucket names "<START>-<END>" to "<START>", so that lex sorting will work properly
  let result = /^\s*(\d+\.?\d*)\s*-\s*(\d+\.?\d*)\s*$/i.exec(name);

  if (!result) {
    return name;
  }

  return result[1];
}

function calculateTimestamps(
  fields: Array<import('@grafana/data').Field<any, import('@grafana/data').Vector<any>>>,
  numColumns: number,
  timeRange: TimeRange
): number[] {
  let timestamps: number[] = [];
  fields.forEach((field) => {
    if (field.type === 'time') {
      if (timestamps.length > 0) {
        console.warn('Multiple time fields in data frame.  Using last');
      }

      normailizeTimestamps(timestamps, numColumns, timeRange, field.values.length);
    }
  });

  return timestamps;
}

function normailizeTimestamps(timestamps: number[], numColumns: number, timeRange: TimeRange, numValues: number) {
  if (timestamps.length > 0) {
    console.warn('Multiple time fields in data frame.  Using last');
  }

  let effectiveNumColumns = Math.min(numColumns, numValues);

  let step = Math.round((timeRange.end - timeRange.start) / effectiveNumColumns);

  for (let index = 0; index < effectiveNumColumns; index++) {
    timestamps.push(timeRange.start + index * step);
  }
}

function addRows(
  rows: Record<string, Series>,
  fields: Array<import('@grafana/data').Field<any, import('@grafana/data').Vector<any>>>,
  valueField: string,
  rowField: string,
  groupField: string,
  numColumns: number,
  dataFormat: string,
  binType: BinType,
  timestamps: number[],
  zeroType: ZeroType
) {
  fields.forEach((field) => {
    if (field.type === 'time') {
      return;
    }
    let rowName: string | undefined;
    let groupName: string | undefined;
    switch (dataFormat) {
      case 'regular':
        if (field.name === valueField) {
          if (field.type !== 'number') {
            throw new Error('Value field must be of type number');
          }

          for (let label in field.labels) {
            if (label === rowField) {
              rowName = field.labels[label];
            } else if (label === groupField) {
              groupName = field.labels[label];
            }
          }
        } else {
          return;
        }
        break;
      case 'heatmap':
        if (field.type !== 'number') {
          throw new Error('Value field must be of type number');
        }
        rowName = field.name;
        break;
    }

    if (rowName === undefined) {
      throw new Error("Couldn't deduce row name.  Try using a different Data Format");
    }
    if (rows.hasOwnProperty(rowName)) {
      console.warn('Found multiple series with ' + rowField + ': ' + rowName + ', using last...');
    }

    rows[rowName] = buildSeries(rowName, groupName, createValuesArray(field.values), numColumns, binType, timestamps, zeroType);
  });
}

function createValuesArray(values: Vector<any>): number[] {
  let result: number[] = [];

  for (let index = 0; index < values.length; index++) {
    result.push(values.get(index));
  }

  return result;
}

function buildSeries(
  rowName: string,
  groupName: string | undefined,
  values: number[],
  numColumns: number,
  binType: BinType,
  timestamps: number[],
  zeroType: ZeroType
): Series {
  let series = new Series(rowName, groupName);

  let binSize = Math.max(values.length / numColumns, 1);

  let sum = 0;
  let remainder = 0;
  let binIndex = 0;
  let nullCount = 0;
  let nullRemainder = 0;
  let isNull = false;

  for (let index = 0; index < values.length; index++) {
    sum += remainder;
    nullCount += nullRemainder;

    isNull = values[index] == null

    if (index >= binIndex * binSize && index + 1 <= (binIndex + 1) * binSize) {
      // The value is completely in the bin
      sum += values[index];
      remainder = 0;
      nullRemainder = 0;

      if(isNull){nullCount += 1}

    } else if (index > binIndex * binSize && index + 1 > (binIndex + 1) * binSize) {
      // The value overlaps the end of the bin
      let relativePart = 1 - (index + 1 - (binIndex + 1) * binSize);
      sum += relativePart * values[index];
      remainder = (1 - relativePart) * values[index];

      if(isNull){
        nullCount += relativePart;
        nullRemainder = 1 - relativePart
      }

    } else {
      throw new Error('This shouldnt happen');
    }

    if (index + 1 >= (binIndex + 1) * binSize) {
      // Closing the bin
      let aggregated: number;
      switch (binType) {
        case 'sum':
          aggregated = sum;
          break;
        case 'avg':
          if (zeroType == 'empty'){
            // do not include nulls in average calculation
            aggregated = sum / (binSize - nullCount);
          }
          else{
            aggregated = sum / binSize;
          }
          break;
      }

      series.addValue(timestamps[binIndex], aggregated);
      sum = 0;
      nullCount = 0;
      binIndex++;
    }
  }

  return series;
}

function updateGroupMax(series: Series[]) {
  for (let index = 0; index < series.length; index++) {
    for (let secondIndex = 0; secondIndex < series.length; secondIndex++) {
      series[index].updateGroupMax(series[secondIndex].getMaxValue(), series[secondIndex].getGroup());
    }
  }
}

function updateGroupSum(series: Series[]) {
  for (let index = 0; index < series.length; index++) {
    for (let secondIndex = 0; secondIndex < series.length; secondIndex++) {
      series[index].updateGroupSum(series[secondIndex].getSum(), series[secondIndex].getGroup());
    }
  }
}

function truncateSeries(result: Series[], maxRows: number): Series[] {
  if (result.length <= maxRows) {
    return result;
  }

  return result.slice(0, maxRows);
}

export function getEffectiveMaxValue(fromData: number, maxType: MaxType, explicit: number) {
  if (isNaN(explicit)) {
    return fromData;
  }
  switch (maxType) {
    case 'fromData':
      return fromData;
    case 'explicit':
      return explicit;
    case 'softMax':
      return Math.max(fromData, explicit);
  }
}

function extractRowsFromSingleFrame(
  rows: Record<string, Series>,
  dataFrame: DataFrame,
  numColumns: number,
  timeRange: TimeRange,
  valueField: string,
  rowField: string,
  groupField: string,
  binType: BinType,
  zeroType: ZeroType
) {
  let fieldRowIndex = 0;
  let timeFieldName = '';

  let numericLabel = false;

  let timeStamps = new Set<number>();

  let groupNames: Record<string, string> = {};
  let values: Record<string, number[]> = {};

  let maxFieldRowIndex: number | undefined;

  while (fieldRowIndex !== -1) {
    let timestamp = -1;
    let value = -1;
    let rowName = '';
    let groupName: string | undefined;
    for (let fieldIndex = 0; fieldIndex < dataFrame.fields.length; fieldIndex++) {
      if (dataFrame.fields[fieldIndex].type === 'time') {
        if (maxFieldRowIndex === undefined) {
          maxFieldRowIndex = dataFrame.fields[fieldIndex].values.length;
        }
        if (timeFieldName === '') {
          timeFieldName = dataFrame.fields[fieldIndex].name;
        }
        if (timeFieldName !== dataFrame.fields[fieldIndex].name) {
          throw new Error(
            'Unsupported - Multiple time fields (' + timeFieldName + ', ' + dataFrame.fields[fieldIndex].name
          );
        }

        timestamp = dataFrame.fields[fieldIndex].values.get(fieldRowIndex);
      } else if (dataFrame.fields[fieldIndex].type === 'number') {
        if (dataFrame.fields[fieldIndex].name === valueField) {
          value = dataFrame.fields[fieldIndex].values.get(fieldRowIndex);
        } else if (dataFrame.fields[fieldIndex].name === rowField) {
          rowName = dataFrame.fields[fieldIndex].values.get(fieldRowIndex);
          numericLabel = true;
        } else if (dataFrame.fields[fieldIndex].name === groupField) {
          groupName = dataFrame.fields[fieldIndex].values.get(fieldRowIndex);
          numericLabel = true;
        }
      } else if (dataFrame.fields[fieldIndex].type === 'string') {
        if (dataFrame.fields[fieldIndex].name === rowField) {
          rowName = dataFrame.fields[fieldIndex].values.get(fieldRowIndex);
        } else if (dataFrame.fields[fieldIndex].name === groupField) {
          groupName = dataFrame.fields[fieldIndex].values.get(fieldRowIndex);
        }
      } else {
        console.warn(
          'Unsupported field type ' +
            dataFrame.fields[fieldIndex].type +
            ' for field ' +
            dataFrame.fields[fieldIndex].name
        );
      }
    }

    timeStamps.add(timestamp);

    if (groupName !== undefined) {
      groupNames[rowName] = groupName;
    }
    if (!values.hasOwnProperty(rowName)) {
      values[rowName] = [];
    }
    values[rowName].push(value);

    fieldRowIndex++;
    if (fieldRowIndex === maxFieldRowIndex) {
      fieldRowIndex = -1;
    }
  }

  if (numericLabel) {
    console.warn('Using a numeric field as a label.  Try converting to a string.');
  }

  let formattedTimestamps: number[] = [];
  normailizeTimestamps(formattedTimestamps, numColumns, timeRange, timeStamps.size);

  for (let rowName in values) {
    let groupName: string | undefined;
    if (groupNames.hasOwnProperty(rowName)) {
      groupName = groupNames[rowName];
    }
    rows[rowName] = buildSeries(rowName, groupName, values[rowName], numColumns, binType, formattedTimestamps, zeroType);
  }
}
