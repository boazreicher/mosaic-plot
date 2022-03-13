import { Coordinates } from 'shapes/Coordinates';

export class YAxisData {
  private topLeft: Coordinates;
  private width: number;
  private height: number;
  private labels: string[];
  private buckets: boolean;

  constructor(topLeft: Coordinates, width: number, height: number, labels: string[], buckets: boolean) {
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
    this.labels = labels;
    this.buckets = buckets;
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

  public useBuckets() {
    return this.buckets;
  }
}
