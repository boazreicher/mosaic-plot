import { Hex } from 'color/Hex';
import { ScaleColorPicker } from 'color/ScaleColorPicker';
import { Cell, PositionType } from 'shapes/Cell';
import { CellDimensions } from 'shapes/CellDimensions';
import { Coordinates } from 'shapes/Coordinates';
import { EmptyCell } from 'shapes/EmptyCell';
import { EmptyJigSaw } from 'shapes/EmptyJigSaw';
import { JigSaw, JigSawPiece } from 'shapes/JigSaw';
import { JigSawDimensions } from 'shapes/JigSawDimensions';
import { GridGenerator } from './GridGenerator';
import { GridGeneratorParameters } from './GridGeneratorParameters';
import { JigSawCalculator } from './JigSawCalculator';

export class JigSawGridGenerator extends GridGenerator {
  private calculator: JigSawCalculator;

  constructor(parameters: GridGeneratorParameters, colorPicker: ScaleColorPicker, seed: number) {
    super(parameters, colorPicker);
    this.calculator = new JigSawCalculator('seed_' + seed);
  }

  protected buildCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): Cell {
    let jigSawDimensions: JigSawDimensions = dimensions as JigSawDimensions;

    let color = this.getColorForCell(rowIndex, columnIndex);
    let outlineColor = color.clone();
    switch (this.parameters.outlineColorType) {
      case 'custom':
        outlineColor = new Hex(this.parameters.cellAttributes.outlineColor);
        break;
    }

    let value = this.series[rowIndex].getValues()[columnIndex];

    let pieceLeft = this.getPieceLeft(positionType, rowIndex, columnIndex);
    let pieceAbove = this.getPieceAbove(positionType, rowIndex, columnIndex);
    let piece = this.calculator.getNewPiece(positionType, pieceLeft, pieceAbove);

    return new JigSaw(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      jigSawDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + jigSawDimensions.getWidth() * columnIndex,
        this.parameters.cellAttributes.topLeft.y + jigSawDimensions.getHeight() * rowIndex
      ),
      color.toString(),
      outlineColor.toString(),
      positionType,
      value,
      this.parameters.cellAttributes.outlineWidth,
      piece,
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
    let jigSawDimensions: JigSawDimensions = dimensions as JigSawDimensions;
    return new EmptyJigSaw(
      this.series[rowIndex].getName(),
      this.series[rowIndex].getTimestamps()[columnIndex],
      jigSawDimensions,
      new Coordinates(
        this.parameters.cellAttributes.topLeft.x + jigSawDimensions.getWidth() * columnIndex,
        this.parameters.cellAttributes.topLeft.y + jigSawDimensions.getHeight() * rowIndex
      ),
      '#000000',
      '#000000',
      positionType,
      0,
      0,
      this.parameters.cellAttributes.filterName,
      this.series[rowIndex].getGroup()
    );
  }

  private getPieceLeft(positionType: PositionType, rowIndex: number, columnIndex: number): JigSawPiece {
    switch (positionType) {
      case PositionType.TOP_LEFT:
      case PositionType.LEFT:
      case PositionType.BOTTOM_LEFT:
        return JigSawPiece.DefaultPiece();
      default:
        return (this.cells[rowIndex][columnIndex - 1] as JigSaw).getPiece();
    }
  }

  private getPieceAbove(positionType: PositionType, rowIndex: number, columnIndex: number): JigSawPiece {
    switch (positionType) {
      case PositionType.TOP_LEFT:
      case PositionType.TOP:
      case PositionType.TOP_RIGHT:
        return JigSawPiece.DefaultPiece();
      default:
        return (this.cells[rowIndex - 1][columnIndex] as JigSaw).getPiece();
    }
  }
}
