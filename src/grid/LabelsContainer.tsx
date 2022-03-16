import { Coordinates } from 'shapes/Coordinates';

export class LabelsContainer {
  private topLeft: Coordinates;
  private height: number;

  constructor(topLeft: Coordinates, height: number) {
    this.topLeft = topLeft;
    this.height = height;
  }

  getTopLeft() {
    return this.topLeft;
  }

  getHeight() {
    return this.height;
  }
}
