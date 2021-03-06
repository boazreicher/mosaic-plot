import { ScaleSequential } from 'd3';
import { ScaleType, ZeroType } from 'types';
import { Color } from './Color';
import { Black, fromString } from './ColorUtils';
import { Hex } from './Hex';
import { makeSpectrumColorScale } from './Spectrum';

export class ScaleColorPicker {
  private minValue: number;
  private maxValue: number;
  private zeroType: ZeroType;
  private zeroColor: string;
  private scaler: ScaleSequential<string, never>;
  private scaleType: ScaleType;
  private discreteScale: boolean;

  constructor(
    minValue: number,
    maxValue: number,
    palette: string,
    invertPalette: boolean,
    scaleType: ScaleType,
    discreteScale: boolean,
    zeroType: ZeroType = 'regular',
    zeroColor = '#000000'
  ) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.scaleType = scaleType;
    this.discreteScale = discreteScale;
    this.zeroType = zeroType;
    this.zeroColor = zeroColor;
    this.scaler = makeSpectrumColorScale(palette, 0, 100, invertPalette);
  }

  getColor(value: number): Color {
    if (this.minValue === this.maxValue) {
      return Black();
    }

    if (value === 0) {
      switch (this.zeroType) {
        case 'color':
          return new Hex(this.zeroColor);
        default:
          if (this.minValue !== 0) {
            return this.getColor(this.minValue);
          } else {
            return fromString(this.scaler(0));
          }
      }
    }
    let factor;
    switch (this.scaleType) {
      case 'log':
        factor = (100 * Math.log(value - this.minValue + 1)) / Math.log(this.maxValue - this.minValue + 1);
        break;
      case 'linear':
        factor = (100 * (value - this.minValue)) / (this.maxValue - this.minValue);
        break;
      case 'squared':
        factor = (100 * Math.pow(value - this.minValue, 2)) / Math.pow(this.maxValue - this.minValue, 2);
        break;
      case 'sqrt':
        factor = (100 * Math.sqrt(value - this.minValue)) / Math.sqrt(this.maxValue - this.minValue);
        break;
    }

    if (this.discreteScale) {
      factor = 20 * Math.round(factor / 20);
    }

    return fromString(this.scaler(factor));
  }

  static DefaultScaleColorPicker() {
    return new ScaleColorPicker(0, 0, 'interpolateSpectral', false, 'log', false);
  }
}
