import { RGB } from 'color/RGB';
import { ScaleColorPicker } from 'color/ScaleColorPicker';
import { Row } from 'data/Row';
import { Series } from 'data/Series';
import { Cell, PositionType } from 'shapes/Cell';
import { CellDimensions } from 'shapes/CellDimensions';
import { EmptyCell } from 'shapes/EmptyCell';
import { Grid } from './Grid';
import { GridGeneratorParameters } from './GridGeneratorParameters';

export abstract class GridGenerator {
  protected parameters: GridGeneratorParameters;
  protected series: Series[] = [];
  protected colorPicker: ScaleColorPicker;
  // Currently only used for jigsaw, where the generator needs data about its neighbors
  protected cells: Cell[][] = [];

  constructor(parameters: GridGeneratorParameters, colorPicker: ScaleColorPicker) {
    this.parameters = parameters;
    this.colorPicker = colorPicker;
  }

  public generateGrid() {
    let grid = new Grid(this.parameters.name);
    for (let rowIndex = 0; rowIndex < this.series.length; rowIndex++) {
      let row = new Row(this.series[rowIndex].getName());
      this.cells.push([]);
      for (let columnIndex = 0; columnIndex < this.series[rowIndex].getValues().length; columnIndex++) {
        let positionType = this.getPositionType(
          this.series.length,
          this.series[rowIndex].getValues().length,
          rowIndex,
          columnIndex
        );
        let cell;
        if (this.parameters.zeroType === 'empty' && this.series[rowIndex].getValues()[columnIndex] === 0) {
          cell = this.buildEmptyCell(rowIndex, columnIndex, this.parameters.cellAttributes.dimensions, positionType);
        } else {
          cell = this.buildCell(rowIndex, columnIndex, this.parameters.cellAttributes.dimensions, positionType);
        }

        this.cells[rowIndex].push(cell);
        row.addCell(cell);
      }
      grid.addRow(row);
    }

    if (this.parameters.cellAttributes.smooth) {
      for (let rowIndex = 0; rowIndex < this.series.length; rowIndex++) {
        for (let columnIndex = this.series[rowIndex].getValues().length - 1; columnIndex > 0; columnIndex--) {
          let sourceFill = this.cells[rowIndex][columnIndex - 1].getFill();
          let targetFill = this.cells[rowIndex][columnIndex].getFill();

          grid.addColorPair(sourceFill, targetFill);
          this.cells[rowIndex][columnIndex].setFill('url(#' + this.buildColorPairName(sourceFill, targetFill) + ')');
          this.cells[rowIndex][columnIndex].setOutlineColor(
            'url(#' + this.buildColorPairName(sourceFill, targetFill) + ')'
          );
        }
      }
    }

    return grid;
  }

  private buildColorPairName(fill: string, prevFill: string) {
    if (fill.startsWith('rgb(')) {
      return fill.slice(4, fill.length - 1) + '_' + prevFill.slice(4, prevFill.length - 1);
    } else {
      let start = fill.startsWith('#') ? 1 : 0;
      return fill.slice(start) + '_' + prevFill.slice(start);
    }
  }

  public addSeries(series: Series) {
    this.series.push(series);
  }

  public addAllSeries(data: Series[]) {
    data.forEach((series) => {
      this.series.push(series);
    });
  }

  protected getColorForCell(rowIndex: number, columnIndex: number) {
    let color = this.colorPicker.getColor(this.series[rowIndex].getValues()[columnIndex]);

    if (this.parameters.cellAttributes.invertColors) {
      let rgb = color.toRGB();
      color = new RGB(255 - rgb.red, 255 - rgb.green, 255 - rgb.blue);
    }
    return color;
  }

  protected abstract buildCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): Cell;

  protected abstract buildEmptyCell(
    rowIndex: number,
    columnIndex: number,
    dimensions: CellDimensions,
    positionType: PositionType
  ): EmptyCell;

  private getPositionType(numRows: number, numColumns: number, rowIndex: number, columnIndex: number) {
    if (rowIndex === 0) {
      if (columnIndex === 0) {
        return PositionType.TOP_LEFT;
      } else if (columnIndex === numColumns - 1) {
        return PositionType.TOP_RIGHT;
      } else {
        return PositionType.TOP;
      }
    } else if (rowIndex === numRows - 1) {
      if (columnIndex === 0) {
        return PositionType.BOTTOM_LEFT;
      } else if (columnIndex === numColumns - 1) {
        return PositionType.BOTTOM_RIGHT;
      } else {
        return PositionType.BOTTOM;
      }
    } else {
      if (columnIndex === 0) {
        return PositionType.LEFT;
      } else if (columnIndex === numColumns - 1) {
        return PositionType.RIGHT;
      } else {
        return PositionType.MIDDLE;
      }
    }
  }
}
