import { Filter } from 'color/filters/Filter';
import { CellShape, MosaicPlotOptions, OutlineColorType, propNumber, ScaleType, ZeroType } from 'types';

export class GridsGeneratorParameters {
  width: number;
  height: number;
  shape: CellShape;
  leftMargin: number;
  spacing: number;
  palette: string;
  invertPalette: boolean;
  zeroType: ZeroType;
  zeroColor: string;
  outlineWidth: number;
  outlineColorType: OutlineColorType;
  outlineColor: string;
  scaleType: ScaleType;
  seed: number;
  showScale: boolean;
  filter: Filter;
  smooth: boolean;
  compact: boolean;

  constructor(width: propNumber, height: propNumber, filter: Filter, panelOptions: MosaicPlotOptions) {
    if (typeof width !== 'number') {
      throw new Error('Width must be a number');
    }
    if (typeof height !== 'number') {
      throw new Error('Height must be a number');
    }
    this.width = width;
    this.height = height;
    this.shape = panelOptions.cellShape;
    this.leftMargin = panelOptions.compact ? 0 : panelOptions.leftMargin;
    this.spacing = panelOptions.spacing;
    this.palette = panelOptions.palette;
    this.invertPalette = panelOptions.invertPalette;
    this.zeroType = panelOptions.zeroType;
    this.zeroColor = panelOptions.zeroColor;
    this.outlineWidth = panelOptions.outlineWidth;
    this.outlineColorType = panelOptions.outlineColorType;
    this.outlineColor = panelOptions.outlineColor;
    this.scaleType = panelOptions.scaleType;
    this.seed = panelOptions.seed;
    this.showScale = panelOptions.showScale;
    this.filter = filter;
    this.smooth = panelOptions.smooth;
    this.compact = panelOptions.compact;
  }
}
