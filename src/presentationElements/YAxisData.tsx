import { Coordinates } from 'shapes/Coordinates';

export class YAxisData {
  private topLeft: Coordinates;
  private width: number;
  private height: number;
  private labels: string[];
  private buckets: boolean;
  private id: string;

  constructor(topLeft: Coordinates, width: number, height: number, labels: string[], buckets: boolean, id: string) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
    this.labels = labels;
    this.buckets = buckets;
    this.id = id;
  }

  getTopLeft() {
    return this.topLeft;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getLabels() {
    return this.labels;
  }

  useBuckets() {
    return this.buckets;
  }

  getId() {
    return this.id;
  }
}
