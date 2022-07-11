import { X_AXIS_HEIGHT } from 'Constants';
import { TimeRange } from 'data/TimeRange';
import React from 'react';
import { Coordinates } from 'shapes/Coordinates';
import { MosaicPlotOptions } from 'types';

var d3 = require('d3');

export const XAxis = ({
  ...props
}: React.SVGProps<SVGElement> & {} & { timeRange: TimeRange } & { topLeft: Coordinates } & {
  width: number;
} & { isDark: boolean }) => createXAxis(props.timeRange, props.topLeft, props.width, props.isDark);

function getTransform(topLeft: Coordinates) {
  return 'translate(0,' + topLeft.y + ')';
}

function createXAxis(timeRange: TimeRange, topLeft: Coordinates, width: number, isDark: boolean) {
  const xScale = d3
    .scaleTime()
    .domain([timeRange.start, timeRange.end])
    .range([topLeft.x, topLeft.x + width]);
  const xAxis = d3.axisBottom(xScale).ticks(7);
  return (
    <g
      transform={getTransform(topLeft)}
      ref={(node) => {
        d3.select(node)
          .style('font-size', '10')
          .style('text-shadow', getShadow(isDark))
          .call(xAxis as any)
          .selectAll('text')
          .style('text-anchor', 'end')
          .attr('dx', '1.2em')
          .attr('dy', '.5em');
      }}
    />
  );
}

function getShadow(isDark: boolean) {
  return isDark
    ? '-0.5px -0.5px 0 #000, 0.5px -0.5px 0 #000, -0.5px 0.5px 0 #000, 0.5px 0.5px 0 #000'
    : '-0.5px -0.5px 0 #bdbdbd, 0.5px -0.5px 0 #bdbdbd, -0.5px 0.5px 0 #bdbdbd, 0.5px 0.5px 0 #bdbdbd';
}

export function buildXAxis(width: number, height: number, panelOptions: MosaicPlotOptions, timeRange: TimeRange) {
  if (!panelOptions.showXAxis || panelOptions.compact) {
    return <></>;
  }

  let axisHeight = X_AXIS_HEIGHT;
  let rightMargin = panelOptions.showScale ? panelOptions.scaleWidth : 0;
  let axisWidth = width - rightMargin - panelOptions.leftMargin;

  return (
    <XAxis
      height={axisHeight}
      width={axisWidth}
      timeRange={timeRange}
      topLeft={new Coordinates(panelOptions.leftMargin, height - axisHeight)}
      isDark={panelOptions.isDark}
    />
  );
}
