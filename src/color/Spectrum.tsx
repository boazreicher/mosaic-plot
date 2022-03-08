import * as d3 from 'd3';

type Interpolator = (t: number) => string;

interface ColorScaleLookup {
  [name: string]: Interpolator;
}

const interpolators: ColorScaleLookup = {
  // Diverging
  interpolateSpectral: d3.interpolateSpectral,
  interpolateRdYlGn: d3.interpolateRdYlGn,
  interpolateRdYlBu: d3.interpolateRdYlBu,

  // Single hue
  interpolateBlues: d3.interpolateBlues,
  interpolateGreens: d3.interpolateGreens,
  interpolateGreys: d3.interpolateGreys,
  interpolateOranges: d3.interpolateOranges,
  interpolatePurples: d3.interpolatePurples,
  interpolateReds: d3.interpolateReds,

  // Multi-hue
  interpolatePlasma: d3.interpolatePlasma,
  interpolateViridis: d3.interpolateViridis,
  interpolateWarm: d3.interpolateWarm,
  interpolateCool: d3.interpolateCool,
  interpolateBuGn: d3.interpolateBuGn,
  interpolateBuPu: d3.interpolateBuPu,
  interpolateGnBu: d3.interpolateGnBu,
  interpolateOrRd: d3.interpolateOrRd,
  interpolatePuBuGn: d3.interpolatePuBuGn,
  interpolatePuBu: d3.interpolatePuBu,
  interpolatePuRd: d3.interpolatePuRd,
  interpolateRdPu: d3.interpolateRdPu,
  interpolateYlGnBu: d3.interpolateYlGnBu,
  interpolateYlGn: d3.interpolateYlGn,
  interpolateYlOrBr: d3.interpolateYlOrBr,
  interpolateYlOrRd: d3.interpolateYlOrRd,
  interpolatePuOr: d3.interpolatePuOr,
  interpolateBrBG: d3.interpolateBrBG,
};

export const makeSpectrumColorScale = (
  palette: string,
  min: number,
  max: number,
  invertPalette: boolean
): d3.ScaleSequential<string> => {
  if (invertPalette) {
    return d3.scaleSequential(interpolators[palette]).domain([max, min]);
  } else {
    return d3.scaleSequential(interpolators[palette]).domain([min, max]);
  }
};
