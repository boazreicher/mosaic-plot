import { CellAttributes } from 'shapes/CellAttributes';
import { OutlineColorType, ZeroType } from 'types';

export class GridGeneratorParameters {
  name: string;
  zeroType: ZeroType;
  outlineColorType: OutlineColorType;
  cellAttributes: CellAttributes;

  constructor(name: string, zeroType: ZeroType, outlineColorType: OutlineColorType, cellAttributes: CellAttributes) {
    this.name = name;
    this.zeroType = zeroType;
    this.outlineColorType = outlineColorType;
    this.cellAttributes = cellAttributes;
  }
}
