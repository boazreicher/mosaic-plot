import { Coordinates } from 'shapes/Coordinates';

export class GridDimensions {
  private topLeft: Coordinates;
  private width: number;
  private height: number;

  constructor(topLeft: Coordinates, width: number, height: number) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
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
}
