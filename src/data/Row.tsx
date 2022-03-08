import React from 'react';
import { Cell } from 'shapes/Cell';

export class Row {
  private name: string;
  private cells: Cell[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addCell(cell: Cell) {
    this.cells.push(cell);
  }

  public numCells() {
    return this.cells.length;
  }

  public toSvg(): JSX.Element {
    return <>{this.cells.map((cell) => cell.toSvg())}</>;
  }

  public getName() {
    return this.name;
  }

  public getTopLeft() {
    // Assuming topLeft is determined by the first cell
    return this.cells[0].getTopLeft();
  }
}
