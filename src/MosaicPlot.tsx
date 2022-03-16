import { DataFrame } from '@grafana/data';
import { Bevel } from 'color/filters/Bevel';
import { EmptyFilter } from 'color/filters/EmptyFilter';
import { CLICKABLE_CLASS } from 'Constants';
import { Series } from 'data/Series';
import { getDataSeries, getNumColumns } from 'data/SeriesUtils';
import { TimeRange } from 'data/TimeRange';
import { Grids } from 'grid/Grids';
import { GridsGenerator } from 'grid/GridsGenerator';
import { GridsGeneratorParameters } from 'grid/GridsGeneratorParameters';
import { buildDefs } from 'presentationElements/MosaicPlotDefs';
import { Scale } from 'presentationElements/Scale';
import { buildXAxis } from 'presentationElements/XAxis';
import { buildAllYAxis, YAxis } from 'presentationElements/YAxis';
import * as React from 'react';
import { CellDimensions } from 'shapes/CellDimensions';
import { EmptySvg } from 'shapes/EmptySvg';
import { Timer } from 'Timer';
import { MosaicPlotOptions, optionsChangeCallback, propNumber } from 'types';
import { getStyleObj } from 'utils/Style';

var data: Series[] = [];
var maxNumColumns: number;
var minValue: number;
var maxValue: number;
var grids: Grids;
var cellDimensions: CellDimensions;
var colorPairs: Record<string, Set<string>> = {};
var errorMessage: string | null;
var timer: Timer;

export const MosaicPlot = ({
  ...props
}: React.SVGProps<SVGSVGElement> & { dataFrames: DataFrame[] } & {
  panelOptions: MosaicPlotOptions;
} & { timeRange: TimeRange } & { onOptionsChange: optionsChangeCallback }) => (
  <>
    <svg
      xmlns={initPlotElements(props.panelOptions, props.dataFrames, props.width, props.height, props.timeRange)}
      height={props.height}
      width={props.width}
      viewBox={getViewbox(props.width, props.height)}
    >
      {errorMessage === null ? (
        buildElements(props.width, props.height, props.panelOptions, props.timeRange, props.onOptionsChange)
      ) : (
        <text y="50" x="5" style={getStyleObj('fill: red;  font-size: 8px;')}>
          {errorMessage}
        </text>
      )}
    </svg>
  </>
);

function buildElements(
  width: propNumber,
  height: propNumber,
  panelOptions: MosaicPlotOptions,
  timeRange: TimeRange,
  onOptionsChange: optionsChangeCallback
) {
  if (typeof width !== 'number') {
    throw new Error('Width must be a number');
  }
  if (typeof height !== 'number') {
    throw new Error('Height must be a number');
  }

  return (
    <>
      {getMainSvgStyle()}
      {buildGrids(width, height, panelOptions, onOptionsChange).toSvg()}
      {buildDefs(
        panelOptions.palette,
        panelOptions.invertPalette,
        panelOptions.discreteScale,
        panelOptions.invertColors,
        panelOptions.cellShape,
        cellDimensions,
        colorPairs
      )}
      {buildScale(width, height, panelOptions).toSvg()}
      {buildXAxis(width, height, panelOptions, timeRange)}
      {buildAllYAxis(grids, width, height, panelOptions.leftMargin, panelOptions.labelType, panelOptions.compact).map(
        (yAxisData) => (
          <YAxis data={yAxisData} labelPositionType={panelOptions.labelPositionType} />
        )
      )}
    </>
  );
}

function buildScale(width: number, height: number, panelOptions: MosaicPlotOptions) {
  if (!panelOptions.showScale || panelOptions.compact) {
    return new EmptySvg();
  }

  let bottomMargin = panelOptions.showXAxis ? 20 : 0;
  let effectiveHeight = height - bottomMargin;

  return Scale.buildScale(
    panelOptions.scaleWidth,
    width,
    effectiveHeight,
    minValue,
    maxValue,
    panelOptions.palette,
    panelOptions.invertPalette,
    panelOptions.scaleType,
    panelOptions.invertPalette,
    panelOptions.discreteScale,
    panelOptions.invertColors
  );
}

function buildGrids(
  width: number,
  height: number,
  panelOptions: MosaicPlotOptions,
  onOptionsChange: optionsChangeCallback
): Grids {
  let bottomMargin = panelOptions.showXAxis && !panelOptions.compact ? 20 : 0;
  let effectiveHeight = height - bottomMargin;
  let generator = new GridsGenerator(
    new GridsGeneratorParameters(
      width,
      effectiveHeight,
      panelOptions.bevel ? new Bevel() : new EmptyFilter(),
      panelOptions
    )
  );
  for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
    generator.addSeries(data[rowIndex]);
  }
  minValue = generator.getMinValue();
  maxValue = generator.getMaxValue();

  grids = generator.generateGrids(panelOptions, onOptionsChange);

  cellDimensions = generator.getCellDimensions();
  colorPairs = generator.getColorPairs();

  timer = Timer.getInstance(panelOptions, maxNumColumns, onOptionsChange);
  timer.setMaxNumColumns(maxNumColumns);
  if (panelOptions.animate && panelOptions.enableFocus) {
    timer.start();
  } else {
    timer.stop();
  }

  return grids;
}

function getViewbox(width: string | number | undefined, height: string | number | undefined): string | undefined {
  return '0 0 ' + width + ' ' + height;
}

function initPlotElements(
  panelOptions: MosaicPlotOptions,
  dataFrames: DataFrame[],
  width: string | number | undefined,
  height: string | number | undefined,
  timeRange: TimeRange
): string | undefined {
  maxNumColumns = Math.min(getNumColumns(dataFrames), panelOptions.maxColumns);

  let numColumns: number;
  if (!panelOptions.enableFocus) {
    numColumns = panelOptions.minColumns;
  } else {
    numColumns = panelOptions.numColumns === undefined ? panelOptions.minColumns : panelOptions.numColumns;
    if (numColumns > panelOptions.maxColumns) {
      numColumns = panelOptions.maxColumns;
    }
    if (numColumns < panelOptions.minColumns) {
      numColumns = panelOptions.minColumns;
    }
  }
  panelOptions.numColumns = numColumns;

  try {
    data = getDataSeries(
      dataFrames,
      panelOptions.amplitudeField,
      panelOptions.rowField,
      panelOptions.groupField,
      panelOptions.sortType,
      panelOptions.sortMode,
      numColumns,
      timeRange,
      panelOptions.dataFormat,
      panelOptions.maxRows,
      panelOptions.binType
    );
    errorMessage = null;
  } catch (error) {
    errorMessage = `${error}`;
  }

  return 'http://www.w3.org/2000/svg';
}

function getMainSvgStyle() {
  const styles = '.' + CLICKABLE_CLASS + ' { cursor: pointer } ';
  return <style>{styles}</style>;
}
