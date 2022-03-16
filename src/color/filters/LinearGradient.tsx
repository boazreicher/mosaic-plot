import React from 'react';
import { ColorStep } from './ColorStep';
import { Filter } from './Filter';

export class LinearGradient extends Filter {
  colors: ColorStep[];
  vertical: boolean;

  constructor(name: string, colors: ColorStep[], vertical = true) {
    super(name);
    this.colors = colors;
    this.vertical = vertical;
  }

  toFilter() {
    return (
      <linearGradient
        key={this.filterName}
        id={this.filterName}
        x1="0%"
        y1="0%"
        x2={this.getXEnd()}
        y2={this.getYEnd()}
      >
        {this.colors.map((colorStep) => {
          return (
            <stop
              key={this.filterName + '_stop'}
              offset={colorStep.getStep() + '%'}
              stopColor={colorStep.getColor().toString()}
              stopOpacity="1"
            ></stop>
          );
        })}
      </linearGradient>
    );
  }

  private getXEnd(): string {
    return this.vertical ? '0%' : '100%';
  }

  private getYEnd(): string {
    return this.vertical ? '100%' : '0%';
  }
}
