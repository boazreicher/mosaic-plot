export class Series {
  private name: string;
  private group?: string;
  private values: number[] = [];
  private timestamps: number[] = [];
  private minValue?: number;
  private maxValue?: number;
  private sum = 0;
  private groupMax = 0;
  private groupSum = 0;

  constructor(name: string, group?: string) {
    this.name = name;
    this.group = group;
  }

  addValue(timestamp: number, value: number) {
    this.values.push(value);
    this.timestamps.push(timestamp);
    if (this.maxValue === undefined || value > this.maxValue) {
      this.maxValue = value;
    }
    if (this.minValue === undefined) {
      this.minValue = value;
    } else if (value < this.minValue && value > 0) {
      this.minValue = value;
    }
    this.sum += value;
  }

  updateGroupSum(value: number, group?: string) {
    if (group === this.group) {
      this.groupSum += value;
    }
  }

  updateGroupMax(value: number, group?: string) {
    if (group === this.group) {
      if (value > this.groupMax) {
        this.groupMax = value;
      }
    }
  }

  getValues() {
    return this.values;
  }

  getTimestamps() {
    return this.timestamps;
  }

  getName() {
    return this.name;
  }

  getGroup() {
    return this.group;
  }

  getSum() {
    return this.sum;
  }

  getGroupSum() {
    return this.groupSum;
  }

  getGroupMax() {
    return this.groupMax;
  }

  getMaxValue(): number {
    if (this.maxValue === undefined) {
      throw new Error('Max value is undefined');
    }
    return this.maxValue;
  }

  getMinValue(): number {
    if (this.minValue === undefined) {
      throw new Error('Min value is undefined');
    }
    return this.minValue;
  }
}
