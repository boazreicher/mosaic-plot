import * as React from 'react';
import { Coordinates } from 'shapes/Coordinates';
import { ScaleType } from 'types';

var d3 = require('d3');

export const ScaleAxis = ({
  ...props
}: React.SVGProps<SVGElement> & { min: number } & {
  max: number;
} & { topLeft: Coordinates } & { maxY: number } & { scaleType: ScaleType } & { width: number }) =>
  createYAxis(props.min, props.max, props.topLeft, props.maxY, props.scaleType, props.width);

function getTransform(topLeft: Coordinates, width: number) {
  let shiftX = topLeft.x + width;
  return 'translate(' + shiftX + ',0)';
}

function createYAxis(
  min: number,
  max: number,
  topLeft: Coordinates,
  maxY: number,
  scaleType: ScaleType,
  width: number
) {
  let effectiveMin = Math.max(min, 0.00001);
  if (effectiveMin > max) {
    effectiveMin = max / 100;
  }

  const yScale = getYScale(effectiveMin, max, maxY, topLeft.y, scaleType);
  const yAxis = d3.axisLeft(yScale).ticks(5, '~r').tickSize(0);
  return (
    <g
      transform={getTransform(topLeft, width)}
      ref={(node) => {
        d3.select(node)
          .style('text-shadow', '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000')
          .style('font-size', '15')
          .call(yAxis as any)
          .selectAll('text')
          .style('text-anchor', 'end');
      }}
    />
  );
}

function getYScale(effectiveMin: number, max: number, maxY: number, y: number, scaleType: ScaleType) {
  switch (scaleType) {
    case 'log':
      return d3.scaleLog().domain([effectiveMin, max]).range([maxY, y]);
    case 'linear':
      return d3.scaleLinear().domain([effectiveMin, max]).range([maxY, y]);
    case 'squared':
      return d3.scalePow().exponent(2).domain([effectiveMin, max]).range([maxY, y]);
    case 'sqrt':
      return d3.scaleSqrt().domain([effectiveMin, max]).range([maxY, y]);
  }
}
