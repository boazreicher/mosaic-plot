import { CellDimensions } from './CellDimensions';
import { Coordinates } from './Coordinates';

export class CellAttributes {
  topLeft: Coordinates;
  dimensions: CellDimensions;
  outlineColor: string;
  outlineWidth: number;
  smooth: boolean;
  invertColors: boolean;
  filterName?: string;

  constructor(
    topLeft: Coordinates,
    dimensions: CellDimensions,
    outlineColor: string,
    outlineWidth: number,
    smooth: boolean,
    invertColors: boolean,
    filterName?: string
  ) {
    this.topLeft = topLeft;
    this.dimensions = dimensions;
    this.outlineColor = outlineColor;
    this.smooth = smooth;
    this.invertColors = invertColors;
    this.outlineWidth = outlineWidth;
    this.filterName = filterName;
  }
}
