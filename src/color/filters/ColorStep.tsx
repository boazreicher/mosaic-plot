import { Color } from 'color/Color';

export class ColorStep {
  private color: Color;
  private step: number;

  constructor(color: Color, step: number) {
    this.color = color;
    this.step = step;
  }

  getColor() {
    return this.color;
  }

  getStep() {
    return this.step;
  }
}
