import React from 'react';
import { Cell, PositionType } from './Cell';
import { Coordinates } from './Coordinates';
import { JigSawDimensions } from './JigSawDimensions';

export class JigSaw extends Cell {
  private piece: JigSawPiece;

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
    piece: JigSawPiece,
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
    this.piece = piece;
    this.piece.setIdSuffix(dimensions.toString());
  }

  toSvgSpecific(): JSX.Element {
    return (
      <use
        x={this.topLeftCoordinates.x}
        y={this.topLeftCoordinates.y}
        filter={this.filterName}
        fill={this.fill}
        stroke={this.outlineColor}
        strokeWidth={this.outlineWidth}
        href={'#' + this.piece.getId()}
      />
    );
  }

  getPiece() {
    return this.piece;
  }
}

export class JigSawPiece {
  left: JigSawSegmentType;
  top: JigSawSegmentType;
  right: JigSawSegmentType;
  bottom: JigSawSegmentType;
  idSuffix!: string;

  constructor(left: JigSawSegmentType, top: JigSawSegmentType, right: JigSawSegmentType, bottom: JigSawSegmentType) {
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
  }

  setIdSuffix(suffix: string) {
    this.idSuffix = suffix;
  }

  getId() {
    return (
      this.typeAsString(this.left) +
      '_' +
      this.typeAsString(this.top) +
      '_' +
      this.typeAsString(this.right) +
      '_' +
      this.typeAsString(this.bottom) +
      '_' +
      this.idSuffix
    );
  }

  private typeAsString(type: JigSawSegmentType) {
    switch (type) {
      case JigSawSegmentType.WALL:
        return 'w';
      case JigSawSegmentType.CONCAVE:
        return 'i';
      case JigSawSegmentType.CONVEX:
        return 'o';
    }
  }

  static DefaultPiece() {
    return new JigSawPiece(
      JigSawSegmentType.WALL,
      JigSawSegmentType.WALL,
      JigSawSegmentType.WALL,
      JigSawSegmentType.WALL
    );
  }
}

export enum JigSawSegmentType {
  WALL,
  CONCAVE,
  CONVEX,
}
