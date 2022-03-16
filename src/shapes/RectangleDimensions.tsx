import { MIN_CELL_HEIGHT_RECTANGLE } from 'Constants';
import { CellDimensions } from './CellDimensions';

export class RectangleDimensions extends CellDimensions {
  private width: number;
  private height: number;

  constructor(
    width: number,
    height: number,
    numColumns: number
  ) {
    super();

    this.width = width / numColumns;
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
    return MIN_CELL_HEIGHT_RECTANGLE;
  }
}
