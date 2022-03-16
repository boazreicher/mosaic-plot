import { Hex } from 'color/Hex';
import { Cell, PositionType } from 'shapes/Cell';
import { CellDimensions } from 'shapes/CellDimensions';
import { Coordinates } from 'shapes/Coordinates';
import { EmptyCell } from 'shapes/EmptyCell';
import { Rectangle } from 'shapes/Rectangle';
import { RectangleDimensions } from 'shapes/RectangleDimensions';
import { GridGenerator } from './GridGenerator';

export class RectangleGridGenerator extends GridGenerator {
  static combos: Set<String> = new Set();

  protected buildCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): Cell {
    let rectangleDimensions: RectangleDimensions = dimensions as RectangleDimensions;

    let color = this.getColorForCell(rowIndex, columnIndex);
    let outlineColor = color.clone();
    switch (this.parameters.outlineColorType) {
      case 'custom':
        outlineColor = new Hex(this.parameters.cellAttributes.outlineColor);
        break;
    }

    let value = this.series[rowIndex].getValues()[columnIndex];

    if (columnIndex > 0) {
      let colorLeft = this.getColorForCell(rowIndex, columnIndex - 1);
      let combo = color.toString() + '-' + colorLeft.toString();
      RectangleGridGenerator.combos.add(combo);
    }

    return new Rectangle(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      rectangleDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + rectangleDimensions.getWidth() * columnIndex,
        this.parameters.cellAttributes.topLeft.y + rectangleDimensions.getHeight() * rowIndex
      ),
      color.toString(),
      outlineColor.toString(),
      positionType,
      value,
      this.parameters.cellAttributes.outlineWidth,
      this.parameters.cellAttributes.filterName,
      this.series[rowIndex].getGroup()
    );
  }

  protected buildEmptyCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): EmptyCell {
    let rectangleDimensions: RectangleDimensions = dimensions as RectangleDimensions;
    return new EmptyCell(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      rectangleDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + rectangleDimensions.getWidth() * columnIndex,
        this.parameters.cellAttributes.topLeft.y + rectangleDimensions.getHeight() * rowIndex
      ),
      '#000000',
      '#000000',
      positionType,
      0,
      0,
      this.series[rowIndex].getGroup()
    );
  }
}
