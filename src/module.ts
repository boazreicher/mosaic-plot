import { PanelPlugin } from '@grafana/data';
import { FieldSelector } from 'inputs/FieldSelector';
import { LabelSelector } from 'inputs/LabelSelector';
import { LabelSelectorAutoFill } from 'inputs/LabelSelectorAutoFill';
import { PaletteSelector } from 'inputs/PaletteSelector';
import { MosaicPlotPanel } from './MosaicPlotPanel';
import { MosaicPlotOptions } from './types';

export const plugin = new PanelPlugin<MosaicPlotOptions>(MosaicPlotPanel).setNoPadding().setPanelOptions((builder) => {
  return builder
    .addRadio({
      path: 'dataFormat',
      name: 'Data Format',
      defaultValue: 'regular',
      category: ['Fields'],
      settings: {
        options: [
          {
            value: 'regular',
            label: 'Multi Frame',
          },
          {
            value: 'heatmap',
            label: 'Heatmap',
          },
          {
            value: 'singleFrame',
            label: 'Single Frame',
          },
        ],
      },
    })
    .addCustomEditor({
      id: 'amplitudeField',
      path: 'amplitudeField',
      name: 'Amplitude',
      category: ['Fields'],
      description: 'Field for series values',
      editor: FieldSelector,
    })
    .addCustomEditor({
      id: 'rowField',
      path: 'rowField',
      name: 'Breakdown',
      category: ['Fields'],
      description: 'Field for row breakdown',
      editor: LabelSelectorAutoFill,
    })
    .addCustomEditor({
      id: 'groupField',
      path: 'groupField',
      name: 'Group',
      category: ['Fields'],
      description: 'Field for grouping rows',
      editor: LabelSelector,
    })

    .addRadio({
      path: 'cellShape',
      name: 'Shape',
      category: ['Grid Properties'],
      defaultValue: 'rect',
      settings: {
        options: [
          {
            value: 'rect',
            label: '⬜',
          },
          {
            value: 'hex',
            label: '⬣',
          },
          {
            value: 'jigsaw',
            label: '🧩',
          },
          {
            value: 'circle',
            label: '⬤',
          },
          { value: 'circleStacked', label: '🔿' },
        ],
      },
    })
    .addSliderInput({
      path: 'spacing',
      name: 'Group Spacing',
      category: ['Grid Properties'],
      defaultValue: 0,
      settings: {
        min: 0,
        max: 20,
        step: 1,
      },
    })

    .addRadio({
      path: 'sortType',
      name: 'Sort Type',
      category: ['Grid Properties'],
      defaultValue: 'lex',
      settings: {
        options: [
          {
            value: 'lex',
            label: 'Lex',
          },
          {
            value: 'max',
            label: 'Max',
          },
          {
            value: 'sum',
            label: 'Sum',
          },
        ],
      },
    })
    .addRadio({
      path: 'sortMode',
      name: 'Sort Mode',
      category: ['Grid Properties'],
      defaultValue: 'asc',
      settings: {
        options: [
          {
            value: 'asc',
            label: 'Ascending',
          },
          {
            value: 'desc',
            label: 'Descending',
          },
        ],
      },
    })
    .addSliderInput({
      path: 'minColumns',
      name: 'Min Columns',
      category: ['Grid Properties'],
      defaultValue: 20,
      settings: {
        min: 1,
        max: 1000,
        step: 1,
      },
    })
    .addSliderInput({
      path: 'maxColumns',
      name: 'Max Columns',
      category: ['Grid Properties'],
      defaultValue: 1000,
      settings: {
        min: 1,
        max: 1000,
        step: 1,
      },
    })
    .addRadio({
      path: 'binType',
      name: 'Aggregation',
      defaultValue: 'sum',
      category: ['Grid Properties'],
      settings: {
        options: [
          {
            value: 'sum',
            label: 'Sum',
          },
          {
            value: 'avg',
            label: 'Average',
          },
        ],
      },
    })
    .addRadio({
      path: 'scaleType',
      name: 'Scale Type',
      defaultValue: 'log',
      category: ['Grid Properties'],
      settings: {
        options: [
          {
            value: 'squared',
            label: 'Squared',
          },
          {
            value: 'linear',
            label: 'Linear',
          },
          {
            value: 'sqrt',
            label: 'Square Root',
          },
          {
            value: 'log',
            label: 'Log',
          },
        ],
      },
    })
    .addRadio({
      path: 'maxType',
      name: 'Max Type',
      defaultValue: 'fromData',
      category: ['Grid Properties'],
      settings: {
        options: [
          {
            value: 'fromData',
            label: 'From Data',
          },
          {
            value: 'explicit',
            label: 'Explicit',
          },
          {
            value: 'softMax',
            label: 'Soft Max',
          },
        ],
      },
    })
    .addTextInput({
      path: 'maxValue',
      name: 'Max',
      category: ['Grid Properties'],
    })
    .addSliderInput({
      path: 'maxRows',
      name: 'Max Rows',
      defaultValue: 1000,
      category: ['Grid Properties'],
      settings: {
        min: 1,
        max: 1000,
        step: 1,
      },
    })

    .addRadio({
      path: 'labelType',
      name: 'Show Labels',
      category: ['Labels'],
      defaultValue: 'series',
      settings: {
        options: [
          {
            value: 'series',
            label: 'Series',
          },
          {
            value: 'group',
            label: 'Groups',
          },
          {
            value: 'buckets',
            label: 'Buckets',
          },
          {
            value: 'none',
            label: 'None',
          },
        ],
      },
    })
    .addRadio({
      path: 'labelPositionType',
      name: 'Label Positions',
      category: ['Labels'],
      defaultValue: 'horizontal',
      settings: {
        options: [
          {
            value: 'horizontal',
            label: 'Horizontal',
          },
          {
            value: 'vertical',
            label: 'Vertical',
          },
          {
            value: 'angle',
            label: 'Angle',
          },
        ],
      },
    })
    .addSliderInput({
      path: 'leftMargin',
      name: 'Left Margin',
      category: ['Labels'],
      defaultValue: 50,
      settings: {
        min: 0,
        max: 100,
        step: 1,
      },
    })
    .addBooleanSwitch({
      path: 'showXAxis',
      name: 'Show X Axis',
      category: ['Labels'],
      defaultValue: true,
    })
    .addBooleanSwitch({
      path: 'showScale',
      name: 'Show Scale',
      category: ['Labels'],
      defaultValue: true,
    })
    .addSliderInput({
      path: 'scaleWidth',
      name: 'Scale Width',
      category: ['Labels'],
      defaultValue: 50,
      settings: {
        min: 0,
        max: 100,
        step: 1,
      },
    })
    .addBooleanSwitch({
      path: 'discreteScale',
      name: 'Discrete Scale',
      category: ['Labels'],
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'compact',
      name: 'Compact Mode',
      defaultValue: false,
      category: ['Labels'],
    })
    .addCustomEditor({
      id: 'palette',
      path: 'palette',
      name: 'Color Palette',
      category: ['Style'],
      editor: PaletteSelector,
      defaultValue: 'interpolateRdYlGn',
    })
    .addBooleanSwitch({
      path: 'invertPalette',
      name: 'Invert Palette',
      category: ['Style'],
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'invertColors',
      name: 'Invert Colors',
      category: ['Style'],
      defaultValue: false,
    })

    .addRadio({
      path: 'zeroType',
      name: 'Zero Values',
      category: ['Style'],
      defaultValue: 'regular',
      settings: {
        options: [
          {
            value: 'regular',
            label: 'Regular',
          },
          {
            value: 'empty',
            label: 'Empty',
          },
          {
            value: 'color',
            label: 'Custom',
          },
        ],
      },
    })
    .addColorPicker({
      path: 'zeroColor',
      name: 'Zero Color',
      category: ['Style'],
      defaultValue: '#000000',
    })

    .addRadio({
      path: 'outlineColorType',
      name: 'Outline Color Type',
      category: ['Style'],
      defaultValue: 'same',
      settings: {
        options: [
          {
            value: 'same',
            label: 'Same as Cell',
          },
          {
            value: 'custom',
            label: 'Custom',
          },
        ],
      },
    })
    .addColorPicker({
      path: 'outlineColor',
      name: 'Outline Color',
      category: ['Style'],
      defaultValue: '#000000',
    })
    .addSliderInput({
      path: 'outlineWidth',
      name: 'Outline Width',
      category: ['Style'],
      defaultValue: 2,
      settings: {
        min: 0,
        max: 10,
        step: 0.1,
      },
    })
    .addBooleanSwitch({
      path: 'bevel',
      name: 'Bevel',
      category: ['Style'],
      defaultValue: false,
    })
    .addBooleanSwitch({
      path: 'smooth',
      name: 'Smoothing',
      category: ['Style'],
      defaultValue: false,
    })

    .addBooleanSwitch({
      path: 'enableFocus',
      name: 'Enable Focus',
      category: ['Style'],
      defaultValue: false,
    })
    .addSliderInput({
      path: 'seed',
      name: 'Random Seed',
      defaultValue: 0,
      category: ['Style'],
      settings: {
        min: 0,
        max: 100,
        step: 1,
      },
    });
});
