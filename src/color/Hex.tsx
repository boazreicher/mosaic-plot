import { Color } from 'color/Color';
import { hexToHsl, hexToRgb } from 'color/ColorUtils';
import { HSL } from 'color/HSL';
import { RGB } from './RGB';

export class Hex implements Color {
  hex: string;

  constructor(hex: string) {
    this.hex = hex;
  }

  shiftHue(shift: number): void {
    throw new Error('Method not implemented.');
  }

  toString(): string {
    return this.hex.charAt(0) !== '#' ? '#' + this.hex : this.hex;
  }
  clone(): Color {
    return new Hex(this.hex);
  }
  increaseLuminance(increasePercentage: number): void {
    throw new Error('Method not implemented.');
  }
  increaseSaturation(increasePercentage: number): void {
    throw new Error('Method not implemented.');
  }
  decreaseLuminance(decreasePercentage: number): void {
    throw new Error('Method not implemented.');
  }
  decreaseSaturation(decreasePercentage: number): void {
    throw new Error('Method not implemented.');
  }

  toHsl(): HSL {
    return hexToHsl(this.hex);
  }

  toRGB(): RGB {
    return hexToRgb(this.hex);
  }

  static fromString(colorString: string): Color {
    return new Hex(colorString);
  }
}
