import { Color } from 'color/Color';
import { fromString } from 'color/ColorUtils';
import { makeSpectrumColorScale } from 'color/Spectrum';
import { SCALE_FILLER_HEIGHT, SCALE_WIDTH } from 'Constants';
import React from 'react';
import { Coordinates } from 'shapes/Coordinates';
import { ScaleType } from 'types';
import { getStyleObj } from 'utils/Style';
import { ScaleAxis } from './ScaleAxis';

export class Scale {
  private topLeft: Coordinates;
  private width: number;
  private height: number;
  private margin: number;
  private minColor: Color;
  private maxColor: Color;
  private minValue: number;
  private maxValue: number;
  private palette: string;
  private scaleType: ScaleType;
  private inverted: boolean;

  constructor(
    topLeft: Coordinates,
    width: number,
    height: number,
    margin: number,
    minColor: Color,
    maxColor: Color,
    minValue: number,
    maxValue: number,
    palette: string,
    scaleType: ScaleType,
    inverted: boolean
  ) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
    this.margin = margin;
    this.minColor = minColor;
    this.maxColor = maxColor;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.palette = palette;
    this.scaleType = scaleType;
    this.inverted = inverted;
  }

  public static buildScale(
    width: number,
    height: number,
    minValue: number,
    maxValue: number,
    palette: string,
    invertPalette: boolean,
    scaleType: ScaleType,
    inverted: boolean
  ) {
    if (typeof width !== 'number') {
      throw new Error('Width must be a number');
    }
    if (typeof height !== 'number') {
      throw new Error('Height must be a number');
    }

    let margin = SCALE_FILLER_HEIGHT;

    let scaler = makeSpectrumColorScale(palette, 0, 100, invertPalette);

    let minColor = fromString(scaler(0));
    let maxColor = fromString(scaler(100));

    return new Scale(
      new Coordinates(width - SCALE_WIDTH, 0),
      SCALE_WIDTH,
      height,
      margin,
      minColor,
      maxColor,
      minValue,
      maxValue,
      palette,
      scaleType,
      inverted
    );
  }

  public toSvg(): JSX.Element {
    return (
      <>
        <rect
          id="scale_top"
          x={this.topLeft.x}
          y={this.topLeft.y}
          width={this.width}
          height={this.margin}
          style={getStyleObj('fill:' + this.maxColor.toString() + ';')}
        />
        <rect
          id="scale_bottom"
          x={this.topLeft.x}
          y={this.topLeft.y + this.height - this.margin}
          width={this.width}
          height={this.margin}
          style={getStyleObj('fill:' + this.minColor.toString() + ';')}
        />
        <rect
          id="scale"
          x={this.topLeft.x}
          y={this.topLeft.y + this.margin}
          width={this.width}
          height={this.height - 2 * this.margin}
          fill={this.getFill()}
        />

        <ScaleAxis
          min={this.minValue}
          max={this.maxValue}
          maxY={this.topLeft.y + this.height - this.margin}
          topLeft={new Coordinates(this.topLeft.x, this.topLeft.y + this.margin)}
          scaleType={this.scaleType}
        />
      </>
    );
  }

  private getFill(): string {
    return "url('#scale_" + this.palette + '_' + this.inverted + "')";
  }
}
