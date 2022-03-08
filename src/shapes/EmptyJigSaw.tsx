import React from 'react';
import { PositionType } from './Cell';
import { Coordinates } from './Coordinates';
import { JigSaw, JigSawPiece } from './JigSaw';
import { JigSawDimensions } from './JigSawDimensions';

export class EmptyJigSaw extends JigSaw {
  constructor(
    rowName: string,
    timestamp: number,
    dimensions: JigSawDimensions,
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
      dimensions,
      topLeftCoordinates,
      fill,
      outlineColor,
      positionType,
      value,
      outlineWidth,
      JigSawPiece.DefaultPiece(),
      filterName,
      groupName
    );
  }

  public toSvg(): JSX.Element {
    return <></>;
  }
}
