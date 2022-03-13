import { Color } from 'color/Color';
import { HSL } from 'color/HSL';
import { Black } from './ColorUtils';

export class RGB implements Color {
  red = 0;
  green = 0;
  blue = 0;

  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  // TODO: Add support for RGBa
  public static fromString(colorString: string): Color {
    let parsed = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/i.exec(colorString);

    if (!parsed || parsed.length != 4) {
      console.warn(`Unable to parse color string ${colorString}`);
      return Black();
    }

    return new RGB(+parsed[1], +parsed[2], +parsed[3]);
  }

  shiftHue(shift: number): void {
    throw new Error('Method not implemented.');
  }

  toString(): string {
    return 'rgb(' + this.red + ',' + this.green + ',' + this.blue + ')';
  }

  clone(): Color {
    return new RGB(this.red, this.green, this.blue);
  }

  increaseLuminance(increasePercentage: number) {
    console.warn('Method not implemented');
  }

  increaseSaturation(increasePercentage: number) {
    console.warn('Method not implemented');
  }

  decreaseLuminance(decreasePercentage: number) {
    console.warn('Method not implemented');
  }

  decreaseSaturation(decreasePercentage: number) {
    console.warn('Method not implemented');
  }

  toRGB(): RGB {
    return this;
  }

  toHsl(): HSL {
    let r = (this.red /= 255);
    let g = (this.green /= 255);
    let b = (this.blue /= 255);

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = (max + min) / 2;
    let l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    let opacity = 1;

    return new HSL(h, s, l, opacity);
  }
}
