import React from 'react';

export class ToolTipData {
  private timestamp: number;
  private rowName: string;
  private value: number;
  private groupName?: string;

  constructor(timestamp: number, rowName: string, value: number, groupName?: string) {
    this.timestamp = timestamp;
    this.rowName = rowName;
    this.value = value;
    this.groupName = groupName;
  }

  public asToolTipContent() {
    return (
      <>
        <p>{this.formatTimestamp(this.timestamp)}</p>
        <span>{this.formatValue(this.value)}</span>
        <br></br>
        <span>{this.formatRow(this.rowName)}</span>
        <br></br>
        <span>{this.formatGroup(this.groupName)}</span>
      </>
    );
  }
  formatRow(rowName: string) {
    return `Row: ${rowName}`;
  }

  formatGroup(groupName: string | undefined) {
    if (groupName === undefined) {
      return '';
    }
    return `Group: ${groupName}`;
  }
  formatValue(value: number) {
    let formatted = Number(value.toPrecision(5));
    return `Value: ${formatted}`;
  }

  private formatTimestamp(timestamp: number) {
    return new Date(timestamp).toUTCString();
  }
}
