import React from 'react';
import { Cell, PositionType } from './Cell';
import { CellDimensions } from './CellDimensions';
import { Coordinates } from './Coordinates';

export class EmptyCell extends Cell {
  constructor(
    rowName: string,
    timestamp: number,
    dimensions: CellDimensions,
    topLeftCoordinates: Coordinates,
    fill: string,
    outlineColor: string,
    positionType: PositionType,
    value: number,
    outlineWidth: number,
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
      groupName
    );
  }

  toSvgSpecific(): JSX.Element {
    return <></>;
  }
}
