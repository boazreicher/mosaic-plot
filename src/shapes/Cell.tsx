import { Tooltip } from '@grafana/ui';
import { ToolTipData } from 'data/ToolTipData';
import React from 'react';
import { CellDimensions } from './CellDimensions';
import { Coordinates } from './Coordinates';

export abstract class Cell {
  protected topLeftCoordinates: Coordinates;
  protected dimensions: CellDimensions;
  protected fill: string;
  protected outlineColor: string;
  protected positionType: PositionType;
  protected value: number;
  protected outlineWidth: number;
  protected toolTipData: ToolTipData;
  protected filterName?: string;

  constructor(
    rowName: string,
    timestamp: number,
    topLeftCoordinates: Coordinates,
    dimensions: CellDimensions,
    fill: string,
    outlineColor: string,
    positionType: PositionType,
    value: number,
    outlineWidth: number,
    filterName?: string,
    groupName?: string
  ) {
    this.topLeftCoordinates = topLeftCoordinates;
    this.dimensions = dimensions;
    this.fill = fill;
    this.outlineColor = outlineColor;
    this.positionType = positionType;
    this.value = value;
    this.outlineWidth = outlineWidth;
    this.toolTipData = new ToolTipData(timestamp, rowName, value, groupName);
    this.filterName = filterName;
  }

  public getTopLeft() {
    return this.topLeftCoordinates;
  }

  public toSvg(): JSX.Element {
    return <Tooltip content={this.toolTipData.asToolTipContent()}>{this.toSvgSpecific()}</Tooltip>;
  }

  public getFill() {
    return this.fill;
  }

  public setFill(fill: string) {
    this.fill = fill;
  }

  public setOutlineColor(color: string) {
    this.outlineColor = color;
  }

  public abstract toSvgSpecific(): JSX.Element;
}

export enum PositionType {
  TOP_LEFT,
  TOP,
  TOP_RIGHT,
  RIGHT,
  BOTTOM_RIGHT,
  BOTTOM,
  BOTTOM_LEFT,
  LEFT,
  MIDDLE,
}
