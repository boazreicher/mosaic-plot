export interface MosaicPlotOptions {
  amplitudeField: string;
  rowField: string;
  groupField: string;
  sortMode: SortMode;
  sortType: SortType;
  cellShape: CellShape;
  spacing: number;
  labelType: LabelType;
  labelPositionType: LabelPositionType;
  leftMargin: number;
  palette: string;
  invertPalette: boolean;
  zeroType: ZeroType;
  zeroColor: string;
  outlineWidth: number;
  outlineColorType: OutlineColorType;
  outlineColor: string;
  scaleType: ScaleType;
  seed: number;
  minColumns: number;
  maxColumns: number;
  numColumns: number;
  showScale: boolean;
  dataFormat: DataFormat;
  showXAxis: boolean;
  bevel: boolean;
  smooth: boolean;
  compact: boolean;
  maxRows: number;
  enableFocus: boolean;
  animate: boolean;
  binType: BinType;
}

export type CellShape = 'hex' | 'rect' | 'jigsaw' | 'circle' | 'circleStacked';
export type SortType = 'lex' | 'max' | 'sum';
export type SortMode = 'asc' | 'desc';
export type LabelType = 'series' | 'group' | 'none';
export type LabelPositionType = 'horizontal' | 'vertical' | 'angle';
export type ZeroType = 'regular' | 'empty' | 'color';
export type OutlineColorType = 'same' | 'custom';
export type ScaleType = 'linear' | 'log' | 'squared' | 'sqrt';
export type DataFormat = 'heatmap' | 'regular';
export type BinType = 'sum' | 'avg';

export type propNumber = number | string | undefined;
export type optionsChangeCallback = (options: MosaicPlotOptions) => void;
