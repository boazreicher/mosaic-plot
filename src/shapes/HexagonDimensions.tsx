import { MIN_CELL_HEIGHT_HEXAGON } from 'Constants';
import { CellDimensions } from './CellDimensions';

export class HexagonDimensions extends CellDimensions {
  private width: number;
  private height: number;

  constructor(width: number, height: number, numColumns: number) {
    super();
    this.width = width / (numColumns + 0.5);
    this.height = height;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getVerticalShift(): number {
    return this.height / 4;
  }

  toString(): string {
    return this.getWidth() + ' x ' + this.getHeight();
  }

  static getGridHeightFactor(numRows: number): number {
    return 1 + (3 / 4) * (numRows - 1);
  }

  static getMinCellHeight() {
    return MIN_CELL_HEIGHT_HEXAGON;
  }
}
