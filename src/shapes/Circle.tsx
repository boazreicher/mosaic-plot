import React from 'react';
import { Cell, PositionType } from './Cell';
import { CircleDimensions } from './CircleDimensions';
import { Coordinates } from './Coordinates';

export class Circle extends Cell {
  private stacked: boolean;

  constructor(
    rowName: string,
    timestamp: number,
    dimensions: CircleDimensions,
    topLeftCoordinates: Coordinates,
    fill: string,
    outlineColor: string,
    positionType: PositionType,
    value: number,
    outlineWidth: number,
    stacked: boolean,
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
    this.stacked = stacked;
  }

  toSvgSpecific(): JSX.Element {
    let circleDimensions: CircleDimensions = this.dimensions as CircleDimensions;

    let radius = this.stacked
      ? circleDimensions.getHeight() / 2
      : Math.min(circleDimensions.getWidth(), circleDimensions.getHeight()) / 2;

    radius = Math.floor(radius * 10) / 10;

    return (
      <circle
        cx={Math.floor((this.topLeftCoordinates.x + circleDimensions.getWidth() / 2) * 10) / 10}
        cy={Math.floor((this.topLeftCoordinates.y + circleDimensions.getHeight() / 2) * 10) / 10}
        r={radius}
        fill={this.fill}
        stroke={this.outlineColor}
        strokeWidth={this.outlineWidth}
        filter={this.filterName}
      />
    );
  }
}
