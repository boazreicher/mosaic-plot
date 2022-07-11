import { Color } from 'color/Color';
import { fromString } from 'color/ColorUtils';
import { RGB } from 'color/RGB';
import { makeSpectrumColorScale } from 'color/Spectrum';
import { SCALE_FILLER_HEIGHT } from 'Constants';
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
  private discrete: boolean;
  private invertedColors: boolean;
  private isDark: boolean;

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
    inverted: boolean,
    discrete: boolean,
    invertedColors: boolean,
    isDark: boolean
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
    this.discrete = discrete;
    this.invertedColors = invertedColors;
    this.isDark = isDark;
  }

  static buildScale(
    scaleWidth: number,
    width: number,
    height: number,
    minValue: number,
    maxValue: number,
    palette: string,
    invertPalette: boolean,
    scaleType: ScaleType,
    inverted: boolean,
    discrete: boolean,
    invertedColors: boolean,
    isDark: boolean
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

    if (invertedColors) {
      let minColorRGB = minColor.toRGB();
      minColor = new RGB(255 - minColorRGB.red, 255 - minColorRGB.green, 255 - minColorRGB.blue);
      let maxColorRGB = maxColor.toRGB();
      maxColor = new RGB(255 - maxColorRGB.red, 255 - maxColorRGB.green, 255 - maxColorRGB.blue);
    }

    return new Scale(
      new Coordinates(width - scaleWidth, 0),
      scaleWidth,
      height,
      margin,
      minColor,
      maxColor,
      minValue,
      maxValue,
      palette,
      scaleType,
      inverted,
      discrete,
      invertedColors,
      isDark
    );
  }

  toSvg(): JSX.Element {
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
          width={this.width}
          isDark={this.isDark}
        />
      </>
    );
  }

  private getFill(): string {
    return `url('#scale_${this.palette}_${this.inverted}_${this.discrete}_${this.invertedColors}')`;
  }
}
