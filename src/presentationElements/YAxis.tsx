import { normalizeName } from 'data/SeriesUtils';
import { Grids } from 'grid/Grids';
import * as React from 'react';
import { Coordinates } from 'shapes/Coordinates';
import { LabelPositionType, LabelType, propNumber } from 'types';
import { YAxisData } from './YAxisData';

var d3 = require('d3');

export const YAxis = ({
  ...props
}: React.SVGProps<SVGElement> & { data: YAxisData } & {
  labelPositionType: LabelPositionType;
} & { isDark: boolean }) => createYAxis(props.data, props.labelPositionType, props.isDark);

function getTransform(topLeft: Coordinates) {
  let shiftX = topLeft.x;
  return 'translate(' + shiftX + ',0)';
}

function getLabelTransform(labelPositionType: LabelPositionType): string {
  return getRotation(labelPositionType) + ' ' + getTranslation(labelPositionType);
}

function getRotation(labelPositionType: LabelPositionType): string {
  switch (labelPositionType) {
    case 'horizontal':
      return 'rotate(0)';
    case 'angle':
      return 'rotate(-45)';
    case 'vertical':
      return 'rotate(-90)';
  }
}

function getTranslation(labelPositionType: LabelPositionType): string {
  switch (labelPositionType) {
    case 'horizontal':
      return 'translate(0,0)';
    case 'angle':
      return 'translate(1,-1)';
    case 'vertical':
      return 'translate(10, -10)';
  }
}

function createYAxis(data: YAxisData, labelPositionType: LabelPositionType, isDark: boolean) {
  let yScale = initScale(data);

  const yAxis = d3.axisLeft(yScale); //.tickSize(0);
  return (
    <g
      transform={getTransform(data.getTopLeft())}
      ref={(node) => {
        d3.select(node)
          .style('text-shadow', getShadow(isDark))
          .style('font-size', '10')
          .call(yAxis as any)
          .selectAll('text')
          .style('text-anchor', 'end')
          //.attr('transform', 'rotate(-45)');
          .attr('transform', getLabelTransform(labelPositionType));
      }}
    />
  );
}

function getShadow(isDark: boolean) {
  return isDark
    ? '-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000'
    : '-0.5px -0.5px 0 #bdbdbd, 0.5px -0.5px 0 #bdbdbd, -0.5px 0.5px 0 #bdbdbd, 0.5px 0.5px 0 #bdbdbd';
}

export function buildAllYAxis(
  grids: Grids,
  width: propNumber,
  height: propNumber,
  leftMargin: number,
  labelType: LabelType,
  compact: boolean
) {
  if (labelType === 'none' || leftMargin === 0 || compact) {
    return [];
  }
  if (typeof width !== 'number') {
    throw new Error('Width must be a number');
  }
  if (typeof height !== 'number') {
    throw new Error('Height must be a number');
  }

  let result: YAxisData[] = [];

  let index = 0;
  grids.getGrids().forEach((grid) => {
    let labelsContainer = grid.getLabelsContainer();
    let labels: string[] = [];
    switch (labelType) {
      case 'group':
        labels.push(grid.getId());
        break;
      case 'series':
        labels = grid.getRowNames();
        break;
      case 'buckets':
        labels = getBucketStartValues(grid.getRowNames());
        break;
    }

    result.push(
      new YAxisData(
        new Coordinates(leftMargin, labelsContainer.getTopLeft().y),
        -1,
        labelsContainer.getHeight(),
        labels,
        labelType === 'buckets',
        'yaxis_' + index
      )
    );
  });

  return result;
}

function getBucketStartValues(buckets: string[]): string[] {
  let result: string[] = [];

  buckets.forEach((bucket) => {
    let normalized = normalizeName(bucket);
    result.push(normalized === undefined ? bucket : normalized);
  });

  return result;
}

function initScale(data: YAxisData) {
  if (data.useBuckets()) {
    let min = getMin(data.getLabels());
    let max = getMax(data.getLabels());
    return d3
      .scaleLinear()
      .domain([min, max])
      .range([data.getTopLeft().y + data.getHeight(), data.getTopLeft().y]);
  } else {
    return d3
      .scaleBand()
      .domain(data.getLabels().reverse())
      .range([data.getTopLeft().y + data.getHeight(), data.getTopLeft().y]);
  }
}

function getMin(labels: string[]) {
  let min: number | undefined;

  labels.forEach((label) => {
    if (min === undefined || min > +label) {
      min = +label;
    }
  });

  return min;
}

function getMax(labels: string[]) {
  let max = 0;

  labels.forEach((label) => {
    if (max < +label) {
      max = +label;
    }
  });

  return max;
}
