import { HSL } from 'color/HSL';
import { RGB } from './RGB';

export interface Color {
  toString(): string;
  clone(): Color;

  shiftHue(shift: number): void;
  increaseSaturation(increasePercentage: number): void;
  increaseLuminance(increasePercentage: number): void;
  decreaseSaturation(decreasePercentage: number): void;
  decreaseLuminance(decreasePercentage: number): void;

  toHsl(): HSL;
  toRGB(): RGB;
}
