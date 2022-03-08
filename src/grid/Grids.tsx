import { CLICKABLE_CLASS } from 'Constants';
import React from 'react';
import { MosaicPlotOptions, optionsChangeCallback } from 'types';
import { Grid } from './Grid';

export class Grids {
  private grids: Grid[] = [];
  private panelOptions: MosaicPlotOptions;
  private onOptionsChange: optionsChangeCallback;

  constructor(panelOptions: MosaicPlotOptions, onOptionsChange: optionsChangeCallback) {
    this.panelOptions = panelOptions;
    this.onOptionsChange = onOptionsChange;
  }

  public addGrid(grid: Grid) {
    this.grids.push(grid);
  }

  public getGrids() {
    return this.grids;
  }

  public toSvg(): JSX.Element {
    return (
      <g onClick={this.getOnClickHandler(this.panelOptions, this.onOptionsChange)} className={CLICKABLE_CLASS}>
        {this.grids.map((grid) => grid.toSvg())}
      </g>
    );
  }

  private getOnClickHandler(
    panelOptions: MosaicPlotOptions,
    onOptionsChange: optionsChangeCallback
  ): React.MouseEventHandler<SVGGElement> | undefined {
    let clickEventHandler: React.MouseEventHandler = (event) => {
      if (panelOptions.enableFocus && !panelOptions.animate) {
        panelOptions.animate = true;
        event.preventDefault();
        event.stopPropagation();
        onOptionsChange(panelOptions);
      }
    };
    return clickEventHandler;
  }
}
