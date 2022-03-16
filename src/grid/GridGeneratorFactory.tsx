import { ScaleColorPicker } from 'color/ScaleColorPicker';
import { GridGenerator } from 'grid/GridGenerator';
import { HexagonGridGenerator } from 'grid/HexagonGridGenerator';
import { RectangleGridGenerator } from 'grid/RectangleGridGenerator';
import { CircleDimensions } from 'shapes/CircleDimensions';
import { JigSawDimensions } from 'shapes/JigSawDimensions';
import { CellShape } from 'types';
import { HexagonDimensions } from '../shapes/HexagonDimensions';
import { RectangleDimensions } from '../shapes/RectangleDimensions';
import { CircleGridGenerator } from './CircleGridGenerator';
import { GridGeneratorParameters } from './GridGeneratorParameters';
import { JigSawGridGenerator } from './JigSawGridGenerator';

export class GridGeneratorFactory {
  private shape: CellShape;
  private colorPicker: ScaleColorPicker = ScaleColorPicker.DefaultScaleColorPicker();

  constructor(shape: CellShape) {
    this.shape = shape;
  }

  public setColorPicker(colorPicker: ScaleColorPicker) {
    this.colorPicker = colorPicker;
  }

  public getGenerator(parameters: GridGeneratorParameters, shift: number, seed: number): GridGenerator {
    switch (this.shape) {
      case 'hex':
        return new HexagonGridGenerator(parameters, this.colorPicker, shift);
      case 'rect':
        return new RectangleGridGenerator(parameters, this.colorPicker);
      case 'jigsaw':
        return new JigSawGridGenerator(parameters, this.colorPicker, seed);
      case 'circle':
        return new CircleGridGenerator(parameters, this.colorPicker, false);
      case 'circleStacked':
        return new CircleGridGenerator(parameters, this.colorPicker, true);
    }
  }

  public getMinCellHeight() {
    switch (this.shape) {
      case 'hex':
        return HexagonDimensions.getMinCellHeight();
      case 'rect':
        return RectangleDimensions.getMinCellHeight();
      case 'jigsaw':
        return JigSawDimensions.getMinCellHeight();
      case 'circle':
      case 'circleStacked':
        return CircleDimensions.getMinCellHeight();
    }
  }

  public getGridHeightFactor(numRows: number) {
    switch (this.shape) {
      case 'hex':
        return HexagonDimensions.getGridHeightFactor(numRows);
      case 'rect':
        return RectangleDimensions.getGridHeightFactor(numRows);
      case 'jigsaw':
        return JigSawDimensions.getGridHeightFactor(numRows);
      case 'circle':
      case 'circleStacked':
        return CircleDimensions.getGridHeightFactor(numRows);
    }
  }

  public getDimensions(width: number, height: number, numColumns: number) {
    switch (this.shape) {
      case 'hex':
        return new HexagonDimensions(width, height, numColumns);
      case 'rect':
        return new RectangleDimensions(width, height, numColumns);
      case 'jigsaw':
        return new JigSawDimensions(width, height, numColumns);
      case 'circle':
      case 'circleStacked':
        return new CircleDimensions(width, height, numColumns);
    }
  }
}
