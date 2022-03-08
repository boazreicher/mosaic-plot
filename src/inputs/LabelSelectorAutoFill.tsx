import { StandardEditorProps } from '@grafana/data';
import { Select } from '@grafana/ui';
import React from 'react';
import { getLabelSelectorData } from './LabelSelectorLogic';

export const LabelSelectorAutoFill: React.FC<StandardEditorProps<string>> = ({ item, value, onChange, context }) => {
  let labelSelectorData = getLabelSelectorData(context.data, value, true);

  if (labelSelectorData.value === undefined && labelSelectorData.first !== undefined) {
    onChange(labelSelectorData.first);
  }

  return (
    <Select
      options={labelSelectorData.options}
      value={value === undefined ? labelSelectorData.first : value}
      onChange={(selectableValue) => onChange(selectableValue.value)}
    />
  );
};
