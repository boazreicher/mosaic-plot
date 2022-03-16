import { Color } from 'color/Color';
import { HSL } from 'color/HSL';
import { RGB } from 'color/RGB';
import { Hex } from './Hex';

export function hexToRgb(hex: string): RGB {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? new RGB(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)) : new RGB(0, 0, 0);
}

export function hexToHsl(hex: string): HSL {
  let result;
  if (hex.length === 6 || hex.length === 7) {
    // No opacity
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  } else if (hex.length === 8 || hex.length === 9) {
    // Has opacity
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  }

  if (!result) {
    console.warn('Failed to parse ' + hex);
    return new HSL(0, 0, 0);
  }

  let opacity: number = result.length === 4 ? 255 : parseInt(result[4], 16);
  opacity /= 255;

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255;
  g /= 255;
  b /= 255;
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

  return new HSL(h, s, l, opacity);
}

export function Black(): Color {
  return new RGB(0, 0, 0);
}

export function White(): Color {
  return new RGB(255, 255, 255);
}

export function blend(baseColor: Color, attributesColor: Color): Color {
  let base: HSL = baseColor.toHsl();
  let attributes: HSL = attributesColor.toHsl();

  return new HSL(base.h, attributes.s, attributes.l);
}

export function fromString(colorString: string): Color {
  if (colorString.startsWith('rgb(')) {
    return RGB.fromString(colorString);
  } else {
    return Hex.fromString(colorString);
  }
}
