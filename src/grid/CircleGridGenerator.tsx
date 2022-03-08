import { Hex } from 'color/Hex';
import { ScaleColorPicker } from 'color/ScaleColorPicker';
import { PositionType, Cell } from 'shapes/Cell';
import { CellDimensions } from 'shapes/CellDimensions';
import { Circle } from 'shapes/Circle';
import { CircleDimensions } from 'shapes/CircleDimensions';
import { Coordinates } from 'shapes/Coordinates';
import { EmptyCell } from 'shapes/EmptyCell';
import { GridGenerator } from './GridGenerator';
import { GridGeneratorParameters } from './GridGeneratorParameters';

export class CircleGridGenerator extends GridGenerator {
  private stacked: boolean;

  constructor(parameters: GridGeneratorParameters, colorPicker: ScaleColorPicker, stacked: boolean) {
    super(parameters, colorPicker);
    this.stacked = stacked;
  }

  protected buildCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): Cell {
    let circleDimensions: CircleDimensions = dimensions as CircleDimensions;

    let color = this.getColorForCell(rowIndex, columnIndex);
    let outlineColor = color.clone();
    switch (this.parameters.outlineColorType) {
      case 'custom':
        outlineColor = new Hex(this.parameters.cellAttributes.outlineColor);
        break;
    }

    let value = this.series[rowIndex].getValues()[columnIndex];

    return new Circle(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      circleDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + circleDimensions.getWidth() * columnIndex,
        this.parameters.cellAttributes.topLeft.y + circleDimensions.getHeight() * rowIndex
      ),
      color.toString(),
      outlineColor.toString(),
      positionType,
      value,
      this.parameters.cellAttributes.outlineWidth,
      this.stacked,
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
    let circleDimensions: CircleDimensions = dimensions as CircleDimensions;
    return new EmptyCell(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      circleDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + circleDimensions.getWidth() * columnIndex,
        this.parameters.cellAttributes.topLeft.y + circleDimensions.getHeight() * rowIndex
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
