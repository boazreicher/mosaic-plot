import { SelectableValue, StandardEditorProps } from '@grafana/data';
import { Select } from '@grafana/ui';
import React from 'react';

export const FieldSelector: React.FC<StandardEditorProps<string>> = ({ item, value, onChange, context }) => {
  const options: Array<SelectableValue<string>> = [];

  let values: Set<string> = new Set();

  let first: string | undefined;

  if (context.data) {
    const frames = context.data;
    for (let i = 0; i < frames.length; i++) {
      let dataFrame = frames[i];
      dataFrame.fields.forEach((field) => {
        if (field.type === 'number') {
          if (first === undefined) {
            first = field.name;
          }
          values.add(field.name);
        }
      });
    }

    for (let value of values) {
      options.push({
        label: value,
        value: value,
      });
    }
  }

  if (value === undefined && first !== undefined) {
    onChange(first);
  }

  return (
    <Select
      options={options}
      value={value === undefined ? first : value}
      onChange={(selectableValue) => onChange(selectableValue.value)}
    />
  );
};
