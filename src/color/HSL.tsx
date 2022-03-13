import { Color } from 'color/Color';
import { RGB } from './RGB';

export class HSL implements Color {
  h: number;
  s: number;
  l: number;
  a: number;

  constructor(h: number, s: number, l: number, a = 1) {
    this.h = h;
    this.s = s;
    this.l = l;
    this.a = a;
  }
  shiftHue(shift: number): void {
    this.h = this.h + (shift % 360);
  }

  clone(): Color {
    return new HSL(this.h, this.s, this.l, this.a);
  }

  toString(): string {
    return 'hsl(' + Math.round(this.h) + ',' + Math.round(this.s) + '%,' + Math.round(this.l) + '%,' + this.a + ')';
  }

  increaseLuminance(increasePercentage: number) {
    //this.l = Math.min(100, this.l * (1 + increasePercentage / 100))
    this.l = Math.round(Math.min(100, this.l + increasePercentage));
  }

  increaseSaturation(increasePercentage: number) {
    this.s = Math.round(Math.min(100, this.s * (1 + increasePercentage / 100)));
  }

  decreaseLuminance(decreasePercentage: number) {
    //this.l = Math.max(0, this.l * (1 - decreasePercentage / 100))
    this.l = Math.round(Math.max(0, this.l - decreasePercentage));
  }

  decreaseSaturation(decreasePercentage: number) {
    this.s = Math.round(Math.max(0, this.s * (1 - decreasePercentage / 100)));
  }

  toRGB(): RGB {
    throw new Error('Unimplemented method');
  }

  toHsl(): HSL {
    return this;
  }
}
