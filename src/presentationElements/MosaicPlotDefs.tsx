import { fromString } from 'color/ColorUtils';
import { Bevel } from 'color/filters/Bevel';
import { ColorStep } from 'color/filters/ColorStep';
import { Filter } from 'color/filters/Filter';
import { LinearGradient } from 'color/filters/LinearGradient';
import { predefinedColorPalettes } from 'color/PredefinedColorPalettes';
import { RGB } from 'color/RGB';
import { makeSpectrumColorScale } from 'color/Spectrum';
import { ScaleSequential } from 'd3';
import React from 'react';
import { CellDimensions } from 'shapes/CellDimensions';
import { CellShape } from 'types';
import { PathDefs } from './PathDefs';

export const MosaicPlotOptions = ({
  ...props
}: React.SVGProps<SVGElement> & { filters: Set<Filter> } & { cellDimensions: CellDimensions } & { shape: CellShape }) =>
  generateDefs(props.filters, props.cellDimensions, props.shape);

function generateDefs(filters: Set<Filter>, cellDimensions: CellDimensions, shape: CellShape) {
  return (
    <defs>
      {Array.from(filters.values()).map((filter) => filter.toFilter())}
      {shape === 'jigsaw' ? PathDefs.getPaths(cellDimensions).map((path) => path.toPathDef()) : <></>}
    </defs>
  );
}

export function buildDefs(
  palette: string,
  invertPalette: boolean,
  discreteScale: boolean,
  invertColors: boolean,
  shape: CellShape,
  cellDimensions: CellDimensions,
  colorPairs: Record<string, Set<string>>
) {
  let filters: Set<Filter> = new Set();

  let scaler = makeSpectrumColorScale(palette, 0, 100, invertPalette);

  let colors: ColorStep[] = getColorSteps(scaler, discreteScale, invertColors);

  let filter = new LinearGradient(`scale_${palette}_${invertPalette}_${discreteScale}_${invertColors}`, colors);

  filters.add(filter);
  filters.add(new Bevel());

  addColorPairFilters(filters, colorPairs);

  addPaletteSelectionFilters(filters);

  return <MosaicPlotOptions filters={filters} cellDimensions={cellDimensions} shape={shape} />;
}

function addPaletteSelectionFilters(filters: Set<Filter>) {
  predefinedColorPalettes.forEach((palette) => {
    let scaler = makeSpectrumColorScale(palette.value, 0, 100, false);
    let colors: ColorStep[] = [];

    for (let step = 0; step <= 100; step += 10) {
      let color = fromString(scaler(step));
      colors.push(new ColorStep(color, step));
    }
    filters.add(new LinearGradient('palette_' + palette.value, colors, false));
  });
}

function buildColorPairName(fill: string, prevFill: string) {
  if (fill.startsWith('rgb(')) {
    return fill.slice(4, fill.length - 1) + '_' + prevFill.slice(4, prevFill.length - 1);
  } else {
    let start = fill.startsWith('#') ? 1 : 0;
    return fill.slice(start) + '_' + prevFill.slice(start);
  }
}

function addColorPairFilters(filters: Set<Filter>, colorPairs: Record<string, Set<string>>) {
  for (let source in colorPairs) {
    colorPairs[source].forEach((target) => {
      let sourceColor = new ColorStep(fromString(source), 0);
      let targetColor = new ColorStep(fromString(target), 100);
      filters.add(new LinearGradient(buildColorPairName(source, target), [sourceColor, targetColor], false));
    });
  }
}

function getColorSteps(
  scaler: ScaleSequential<string, never>,
  discreteScale: boolean,
  invertColors: boolean
): ColorStep[] {
  let colors: ColorStep[] = [];
  if (discreteScale) {
    colors = getDiscreteColors(scaler);
    // Discrete scale doesn't look right
    colors = getContinuousColors(scaler);
  } else {
    colors = getContinuousColors(scaler);
  }

  if (invertColors) {
    let invertedColors: ColorStep[] = [];
    colors.forEach((colorStep) => {
      let color = colorStep.getColor().toRGB();
      invertedColors.push(
        new ColorStep(new RGB(255 - color.red, 255 - color.green, 255 - color.blue), colorStep.getStep())
      );
    });
    return invertedColors;
  }
  return colors;
}

function getContinuousColors(scaler: ScaleSequential<string, never>): ColorStep[] {
  let colors: ColorStep[] = [];
  for (let i = 0; i < 11; i++) {
    let factor = i * 10;
    colors.push(new ColorStep(fromString(scaler(100 - factor)), factor));
  }
  return colors;
}

function getDiscreteColors(scaler: ScaleSequential<string, never>): ColorStep[] {
  let colors: ColorStep[] = [];
  for (let i = 0; i < 5; i++) {
    let factor = i * 20;
    let factorNext = (i + 1) * 20 - 1;
    if (factorNext === 99) {
      factorNext = 100;
    }
    colors.push(new ColorStep(fromString(scaler(100 - factor)), factor));
    colors.push(new ColorStep(fromString(scaler(100 - factor)), factorNext));
  }
  return colors;
}
