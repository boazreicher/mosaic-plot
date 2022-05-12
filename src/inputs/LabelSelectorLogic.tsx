import { DataFrame, SelectableValue } from '@grafana/data';

export function getLabelSelectorData(data: DataFrame[], value?: string, autoFill = false): LabelSelectorData {
  const options: Array<SelectableValue<string>> = [];

  options.push({ label: 'None', value: undefined });

  let first: string | undefined;

  if (data) {
    var labels: Set<string> = new Set();
    for (let i = 0; i < data.length; i++) {
      for (let fieldIndex = 0; fieldIndex < data[i].fields.length; fieldIndex++) {
        if (data[i].fields[fieldIndex].type !== 'time') {
          labels.add(data[i].fields[fieldIndex].name);
        }

        for (let label in data[i].fields[fieldIndex].labels) {
          if (first === undefined) {
            first = label;
          }
          labels.add(label);
        }
      }
    }

    for (let label of labels) {
      options.push({
        label: label,
        value: label,
      });
    }
  }

  return new LabelSelectorData(options, value, autoFill ? first : undefined);
}

export class LabelSelectorData {
  options: Array<SelectableValue<string>> = [];
  value?: string;
  first?: string;

  constructor(options: Array<SelectableValue<string>>, value?: string, first?: string) {
    this.options = options;
    this.value = value;
    this.first = first;
  }
}
