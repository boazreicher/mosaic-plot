import { SelectableValue, StandardEditorProps } from '@grafana/data';
import { Select } from '@grafana/ui';
import { predefinedColorPalettes } from 'color/PredefinedColorPalettes';
import React from 'react';

export const PaletteSelector: React.FC<StandardEditorProps<string>> = ({ item, value, onChange, context }) => {
  const options: Array<SelectableValue<string>> = predefinedColorPalettes;

  return (
    <Select
      options={options}
      prefix={getPrefix(value)}
      value={value}
      onChange={(selectableValue) => onChange(selectableValue.value)}
    />
  );
};

function getPrefix(value: string): JSX.Element {
  return (
    <svg width="200px" height="15px">
      <rect width="100%" height="100%" fill={getColorScaleFilter(value)} />
    </svg>
  );
}

function getColorScaleFilter(paletteName: string): string {
  return "url('#palette_" + paletteName + "')";
}
