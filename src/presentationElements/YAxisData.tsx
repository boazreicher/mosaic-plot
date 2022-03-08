import { Coordinates } from 'shapes/Coordinates';

export class YAxisData {
  private topLeft: Coordinates;
  private width: number;
  private height: number;
  private labels: string[];

  constructor(topLeft: Coordinates, width: number, height: number, labels: string[]) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
    this.labels = labels;
  }

  public getTopLeft() {
    return this.topLeft;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getLabels() {
    return this.labels;
  }
}
