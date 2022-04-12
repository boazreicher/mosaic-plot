import { ScaleColorPicker } from 'color/ScaleColorPicker';
import { Series } from 'data/Series';
import { GridGeneratorFactory } from 'grid/GridGeneratorFactory';
import { CellAttributes } from 'shapes/CellAttributes';
import { CellDimensions } from 'shapes/CellDimensions';
import { Coordinates } from 'shapes/Coordinates';
import { MosaicPlotOptions, optionsChangeCallback } from 'types';
import { GridGeneratorParameters } from './GridGeneratorParameters';
import { Grids } from './Grids';
import { GridsGeneratorParameters } from './GridsGeneratorParameters';

export class GridsGenerator {
  private parameters: GridsGeneratorParameters;
  private data: Record<string, Series[]> = {};
  private maxValue!: number;
  private minValue!: number;
  private effectiveMaxValue!: number;
  private numGrids = 0;
  private numRows = 0;
  private numColumns = 0;
  private gridGeneratorFactory: GridGeneratorFactory;
  private computedCellDimensions!: CellDimensions;
  private colorPairs: Record<string, Set<string>> = {};

  constructor(parameters: GridsGeneratorParameters) {
    if (typeof parameters.width !== 'number') {
      throw new Error('Width must be a number');
    }
    if (typeof parameters.height !== 'number') {
      throw new Error('Height must be a number');
    }
    this.parameters = parameters;
    this.gridGeneratorFactory = new GridGeneratorFactory(parameters.shape);
  }

  getMinValue() {
    return this.minValue;
  }

  getMaxValue() {
    return this.maxValue;
  }

  setEffectiveMaxValue(effectiveMaxValue: number) {
    this.effectiveMaxValue = effectiveMaxValue;
  }

  generateGrids(panelOptions: MosaicPlotOptions, onOptionsChange: optionsChangeCallback) {
    let grids = new Grids(panelOptions, onOptionsChange);

    let rightMargin = this.parameters.showScale && !this.parameters.compact ? panelOptions.scaleWidth : 0;
    let width = this.parameters.width - rightMargin - this.parameters.leftMargin;

    this.gridGeneratorFactory.setColorPicker(
      new ScaleColorPicker(
        this.minValue,
        this.effectiveMaxValue,
        this.parameters.palette,
        this.parameters.invertPalette,
        this.parameters.scaleType,
        this.parameters.discreteScale,
        this.parameters.zeroType,
        this.parameters.zeroColor
      )
    );

    let heightFactor = this.gridGeneratorFactory.getGridHeightFactor(this.numRows);

    let spacing = Math.min(
      this.parameters.spacing,
      (this.parameters.height - this.gridGeneratorFactory.getMinCellHeight() * heightFactor) / this.numGrids
    );
    let rowHeight = this.calculateRowHeight(heightFactor, spacing);

    let cellDimensions = this.gridGeneratorFactory.getDimensions(width, rowHeight, this.numColumns);
    this.computedCellDimensions = cellDimensions;

    let topLeft = new Coordinates(this.parameters.leftMargin, spacing);
    let previousGridNumRows = 0;
    let shift = 0;
    let filterName = this.parameters.filter.toString().length === 0 ? undefined : this.parameters.filter.toString();

    for (let group in this.data) {
      shift = (previousGridNumRows + shift) % 2;
      let cellAttributes = new CellAttributes(
        topLeft,
        cellDimensions,
        this.parameters.outlineColor,
        this.parameters.outlineWidth,
        this.parameters.smooth,
        this.parameters.invertColors,
        filterName
      );
      let parameters = new GridGeneratorParameters(
        group,
        this.parameters.zeroType,
        this.parameters.outlineColorType,

        cellAttributes
      );

      let generator = this.gridGeneratorFactory.getGenerator(parameters, shift, this.parameters.seed);

      generator.addAllSeries(this.data[group]);

      let gridHeight = rowHeight * this.gridGeneratorFactory.getGridHeightFactor(this.data[group].length);
      let grid = generator.generateGrid();
      grid.setGridHeight(gridHeight);
      grid.setLabelsContainerMargin(cellDimensions.getVerticalShift());
      grids.addGrid(grid);

      this.addColorPairs(grid.getColorPairs());

      topLeft = new Coordinates(topLeft.x, topLeft.y + gridHeight - cellDimensions.getVerticalShift() + spacing);
      previousGridNumRows = this.data[group].length;
    }

    return grids;
  }

  private addColorPairs(colorPairs: Record<string, Set<string>>) {
    for (let source in colorPairs) {
      if (!this.colorPairs.hasOwnProperty(source)) {
        this.colorPairs[source] = new Set();
      }
      colorPairs[source].forEach((target) => this.colorPairs[source].add(target));
    }
  }

  getColorPairs() {
    return this.colorPairs;
  }

  addSeries(series: Series) {
    let group = series.getGroup();
    group = group === undefined ? 'NA' : group;

    if (!this.data.hasOwnProperty(group)) {
      this.data[group] = [];
      this.numGrids++;
    }

    this.data[group].push(series);

    if (this.minValue === undefined || series.getMinValue() < this.minValue) {
      this.minValue = series.getMinValue();
    }
    if (this.maxValue === undefined || series.getMaxValue() > this.maxValue) {
      this.maxValue = series.getMaxValue();
    }

    this.numRows++;
    if (this.numColumns === 0) {
      this.numColumns = series.getValues().length;
    } else if (this.numColumns !== series.getValues().length) {
      throw new Error('All series must have the same number of data points');
    }
  }

  private calculateRowHeight(heightFactor: number, spacing: number) {
    return (this.parameters.height - spacing * this.numGrids) / heightFactor;
  }

  getCellDimensions() {
    return this.computedCellDimensions;
  }
}
