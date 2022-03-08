import { Filter } from './Filter';
import React from 'react';
import { FILTER_NAME_BEVEL } from 'Constants';

export class Bevel extends Filter {
  constructor() {
    super(FILTER_NAME_BEVEL);
  }

  toFilter() {
    return (
      <filter id={this.filterName} height="220%">
        <feFlood floodColor="black" />
        <feComposite operator="out" in2="SourceGraphic" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite operator="atop" in2="SourceGraphic" />
      </filter>
    );
  }
}
