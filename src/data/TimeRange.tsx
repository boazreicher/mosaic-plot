export class TimeRange {
  start: number;
  end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  toString(): string {
    return '[' + this.start + ', ' + this.end + ']';
  }
}
