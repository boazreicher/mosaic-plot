import { Hex } from 'color/Hex';
import { ScaleColorPicker } from 'color/ScaleColorPicker';
import { Cell, PositionType } from 'shapes/Cell';
import { CellDimensions } from 'shapes/CellDimensions';
import { Coordinates } from 'shapes/Coordinates';
import { EmptyCell } from 'shapes/EmptyCell';
import { Hexagon } from 'shapes/Hexagon';
import { HexagonDimensions } from 'shapes/HexagonDimensions';
import { GridGenerator } from './GridGenerator';
import { GridGeneratorParameters } from './GridGeneratorParameters';

export class HexagonGridGenerator extends GridGenerator {
  private shift;

  constructor(parameters: GridGeneratorParameters, colorPicker: ScaleColorPicker, shift: number) {
    super(parameters, colorPicker);
    this.shift = shift;
  }

  protected buildCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): Cell {
    let hexagonDimensions: HexagonDimensions = dimensions as HexagonDimensions;

    let shiftHorizontal = (rowIndex + this.shift) % 2 === 0 ? 0 : hexagonDimensions.getWidth() / 2;
    let shiftVertical = (-1 * hexagonDimensions.getHeight()) / 4;

    let color = this.getColorForCell(rowIndex, columnIndex);
    let outlineColor = color.clone();
    switch (this.parameters.outlineColorType) {
      case 'custom':
        outlineColor = new Hex(this.parameters.cellAttributes.outlineColor);
        break;
    }

    let value = this.series[rowIndex].getValues()[columnIndex];

    return new Hexagon(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      hexagonDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + hexagonDimensions.getWidth() * columnIndex + shiftHorizontal,
        this.parameters.cellAttributes.topLeft.y + hexagonDimensions.getHeight() * rowIndex + shiftVertical * rowIndex
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
    let hexagonDimensions: HexagonDimensions = dimensions as HexagonDimensions;

    let shiftHorizontal = (rowIndex + this.shift) % 2 === 0 ? 0 : hexagonDimensions.getWidth() / 2;
    let shiftVertical = (-1 * hexagonDimensions.getHeight()) / 4;

    return new EmptyCell(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      hexagonDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + hexagonDimensions.getWidth() * columnIndex + shiftHorizontal,
        this.parameters.cellAttributes.topLeft.y + hexagonDimensions.getHeight() * rowIndex + shiftVertical * rowIndex
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
