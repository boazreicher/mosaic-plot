import { Color } from 'color/Color';

export class ColorStep {
  private color: Color;
  private step: number;

  constructor(color: Color, step: number) {
    this.color = color;
    this.step = step;
  }

  public getColor() {
    return this.color;
  }

  public getStep() {
    return this.step;
  }
}
