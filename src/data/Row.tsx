import React from 'react';
import { Cell } from 'shapes/Cell';

export class Row {
  private name: string;
  private cells: Cell[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addCell(cell: Cell) {
    this.cells.push(cell);
  }

  numCells() {
    return this.cells.length;
  }

  toSvg(): JSX.Element {
    return <>{this.cells.map((cell) => cell.toSvg())}</>;
  }

  getName() {
    return this.name;
  }

  getTopLeft() {
    // Assuming topLeft is determined by the first cell
    return this.cells[0].getTopLeft();
  }
}
