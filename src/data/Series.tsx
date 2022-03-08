export class Series {
  private name: string;
  private group?: string;
  private values: number[] = [];
  private timestamps: number[] = [];
  private minValue?: number;
  private maxValue?: number;
  private sum: number = 0;
  private groupMax: number = 0;
  private groupSum: number = 0;

  constructor(name: string, group?: string) {
    this.name = name;
    this.group = group;
  }

  public addValue(timestamp: number, value: number) {
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

  public updateGroupSum(value: number, group?: string) {
    if (group === this.group) {
      this.groupSum += value;
    }
  }

  public updateGroupMax(value: number, group?: string) {
    if (group === this.group) {
      if (value > this.groupMax) {
        this.groupMax = value;
      }
    }
  }

  public getValues() {
    return this.values;
  }

  public getTimestamps() {
    return this.timestamps;
  }

  public getName() {
    return this.name;
  }

  public getGroup() {
    return this.group;
  }

  public getSum() {
    return this.sum;
  }

  public getGroupSum() {
    return this.groupSum;
  }

  public getGroupMax() {
    return this.groupMax;
  }

  public getMaxValue(): number {
    if (this.maxValue === undefined) {
      throw new Error('Max value is undefined');
    }
    return this.maxValue;
  }

  public getMinValue(): number {
    if (this.minValue === undefined) {
      throw new Error('Min value is undefined');
    }
    return this.minValue;
  }
}
