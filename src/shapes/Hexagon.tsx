import React from 'react';
import { Cell, PositionType } from './Cell';
import { Coordinates } from './Coordinates';
import { HexagonDimensions } from './HexagonDimensions';

export class Hexagon extends Cell {
  private points: Coordinates[] = [];

  constructor(
    rowName: string,
    timestamp: number,
    dimensions: HexagonDimensions,
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
    this.points = this.calculatePoints();
  }

  private calculatePoints(): Coordinates[] {
    let result: Coordinates[] = [];

    let hexagonDimensions: HexagonDimensions = this.dimensions as HexagonDimensions;

    result.push(
      new Coordinates(this.topLeftCoordinates.x, this.topLeftCoordinates.y + hexagonDimensions.getHeight() / 4)
    );
    result.push(
      new Coordinates(this.topLeftCoordinates.x + hexagonDimensions.getWidth() / 2, this.topLeftCoordinates.y)
    );
    result.push(
      new Coordinates(
        this.topLeftCoordinates.x + hexagonDimensions.getWidth(),
        this.topLeftCoordinates.y + hexagonDimensions.getHeight() / 4
      )
    );
    result.push(
      new Coordinates(
        this.topLeftCoordinates.x + hexagonDimensions.getWidth(),
        this.topLeftCoordinates.y + (hexagonDimensions.getHeight() * 3) / 4
      )
    );
    result.push(
      new Coordinates(
        this.topLeftCoordinates.x + hexagonDimensions.getWidth() / 2,
        this.topLeftCoordinates.y + hexagonDimensions.getHeight()
      )
    );
    result.push(
      new Coordinates(this.topLeftCoordinates.x, this.topLeftCoordinates.y + (hexagonDimensions.getHeight() * 3) / 4)
    );

    return result;
  }

  private getPointsString(): string {
    let result = '';

    this.points.forEach((point) => {
      result += Math.floor(point.x * 10) / 10 + ',' + Math.floor(point.y * 10) / 10 + ' ';
    });

    return result;
  }

  toSvgSpecific(): JSX.Element {
    return (
      <polyline
        filter={this.filterName}
        points={this.getPointsString()}
        fill={this.fill}
        stroke={this.outlineColor}
        strokeWidth={this.outlineWidth}
      />
    );
  }
}
