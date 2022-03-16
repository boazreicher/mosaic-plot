import React from 'react';
import { Cell, PositionType } from './Cell';
import { Coordinates } from './Coordinates';
import { RectangleDimensions } from './RectangleDimensions';

export class Rectangle extends Cell {
  constructor(
    rowName: string,
    timestamp: number,
    dimensions: RectangleDimensions,
    topLeftCoordinates: Coordinates,
    fill: string,
    outlineColor: string,
    positionType: PositionType,
    value: number,
    outlineWidth: number,
    filterName?: string,
    groupName?: string
  ) {
    super(
      rowName,
      timestamp,
      topLeftCoordinates,
      dimensions,
      fill,
      outlineColor,
      positionType,
      value,
      outlineWidth,
      filterName,
      groupName
    );
  }

  toSvgSpecific(): JSX.Element {
    let rectangleDimensions: RectangleDimensions = this.dimensions as RectangleDimensions;

    return (
      <rect
        filter={this.filterName}
        x={Math.floor(this.topLeftCoordinates.x * 10) / 10}
        y={Math.floor(this.topLeftCoordinates.y * 10) / 10}
        width={Math.floor(rectangleDimensions.getWidth() * 10) / 10}
        height={Math.floor(rectangleDimensions.getHeight() * 10) / 10}
        fill={this.fill}
        stroke={this.outlineColor}
        strokeWidth={this.outlineWidth}
      ></rect>
    );
  }
}
