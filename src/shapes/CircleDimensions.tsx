import { MIN_CELL_HEIGHT_CIRCLE } from 'Constants';
import { CellDimensions } from './CellDimensions';

export class CircleDimensions extends CellDimensions {
  private width: number;
  private height: number;

  constructor(width: number, height: number, numColoumns: number) {
    super();

    // Width is disregarded
    // this.width = height;
    this.width = width / numColoumns;
    this.height = height;
  }

  public getWidth() {
    return this.width;
  }

  public getHeight() {
    return this.height;
  }

  public getVerticalShift(): number {
    return 0;
  }

  public toString(): string {
    return Math.round(this.getWidth()) + 'x' + Math.round(this.getHeight());
  }

  public static getGridHeightFactor(numRows: number): number {
    return numRows;
  }

  public static getMinCellHeight() {
    return MIN_CELL_HEIGHT_CIRCLE;
  }
}
