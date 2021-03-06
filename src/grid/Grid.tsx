import React from 'react';
import { Coordinates } from 'shapes/Coordinates';
import { Row } from '../data/Row';
import { LabelsContainer } from './LabelsContainer';

export class Grid {
  private id: string;
  private rows: Row[] = [];
  private rowLength = -1;
  private gridHeight = -1;
  private labelsContainerMargin = -1;
  private colorPairs: Record<string, Set<string>> = {};

  constructor(id: string) {
    this.id = id;
  }

  addRow(row: Row) {
    this.rows.push(row);
    if (this.rowLength === -1) {
      this.rowLength = row.numCells();
    }
    if (this.rowLength !== row.numCells()) {
      throw new Error('All rows must have the same number of cells');
    }
  }

  toSvg(): JSX.Element {
    return (
      <>
        <g id={this.id}>{this.rows.map((row) => row.toSvg())}</g>
      </>
    );
  }

  addColorPair(source: string, target: string) {
    if (!this.colorPairs.hasOwnProperty(source)) {
      this.colorPairs[source] = new Set();
    }
    this.colorPairs[source].add(target);
  }

  getColorPairs() {
    return this.colorPairs;
  }

  getRowNames() {
    let result: string[] = [];

    this.rows.forEach((row) => {
      result.push(row.getName());
    });

    return result;
  }

  setLabelsContainerMargin(margin: number) {
    this.labelsContainerMargin = margin;
  }

  setGridHeight(height: number) {
    this.gridHeight = height;
  }

  getTopLeft() {
    // Assuming topLeft is determined by the first cell in the first row
    return this.rows[0].getTopLeft();
  }

  getHeight() {
    return this.gridHeight;
  }

  getLabelsContainer() {
    let topLeft = this.getTopLeft();
    return new LabelsContainer(
      new Coordinates(topLeft.x, topLeft.y + this.labelsContainerMargin),
      this.getHeight() - this.labelsContainerMargin
    );
  }

  getId() {
    return this.id;
  }
}
