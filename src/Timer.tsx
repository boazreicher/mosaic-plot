import { MosaicPlotOptions, optionsChangeCallback } from 'types';

export class Timer {
  private active = false;
  private forward = true;
  private stepSizeMs = 10;
  private lengthSeconds = 1;
  private incrementMultiple = 1.03;
  private lastMaxIncrement = 0;

  private actualMaxNumColumns: number;

  private panelOptions?: MosaicPlotOptions;
  private onOptionsChange?: optionsChangeCallback;

  private static instance: Timer;

  private intervalId?: NodeJS.Timeout;

  static getInstance(
    panelOptions: MosaicPlotOptions,
    actualNumColumns: number,
    onOptionsChange: optionsChangeCallback
  ): Timer {
    if (!Timer.instance) {
      Timer.instance = new Timer(actualNumColumns);
    }
    this.setInstance(panelOptions, onOptionsChange);
    return Timer.instance;
  }

  setMaxNumColumns(actualNumColumns: number) {
    this.actualMaxNumColumns = actualNumColumns;
  }

  private static setInstance(panelOptions: MosaicPlotOptions, onOptionsChange: optionsChangeCallback): void {
    Timer.instance.panelOptions = panelOptions;
    Timer.instance.onOptionsChange = onOptionsChange;
  }

  private constructor(actualNumColumns: number) {
    this.actualMaxNumColumns = actualNumColumns;
  }

  start(): void {
    if (this.panelOptions === undefined) {
      throw new Error('No panel options');
    }

    if (this.active) {
      return;
    }

    this.active = true;

    let current =
      this.panelOptions?.numColumns === undefined ? this.panelOptions.minColumns : this.panelOptions.numColumns;

    let increment: number;
    if (this.forward) {
      increment = (this.actualMaxNumColumns - current) / ((this.lengthSeconds * 1000) / this.stepSizeMs);
    } else {
      if (this.lastMaxIncrement > 0) {
        increment = this.lastMaxIncrement;
      } else {
        increment = (current - this.panelOptions.minColumns) / ((this.lengthSeconds * 1000) / this.stepSizeMs);
      }
    }
    increment = Math.ceil(increment);

    this.intervalId = setInterval(() => {
      if (this.active && this.panelOptions !== undefined && this.onOptionsChange !== undefined) {
        if (this.forward) {
          if (this.panelOptions.numColumns >= this.actualMaxNumColumns) {
            this.stop();
            this.forward = !this.forward;
            this.panelOptions.animate = false;
            this.onOptionsChange(this.panelOptions);
          } else {
            if (this.panelOptions.numColumns === undefined) {
              this.panelOptions.numColumns = this.panelOptions.minColumns;
            }

            this.panelOptions.numColumns = this.panelOptions.numColumns + Math.round(increment);
            this.onOptionsChange(this.panelOptions);

            increment = increment * this.incrementMultiple;
            this.lastMaxIncrement = increment;
          }
        } else {
          if (this.panelOptions.numColumns <= this.panelOptions.minColumns) {
            this.stop();
            this.forward = !this.forward;
            this.panelOptions.animate = false;
            this.onOptionsChange(this.panelOptions);
          } else {
            if (this.panelOptions.numColumns === undefined) {
              this.panelOptions.numColumns = this.actualMaxNumColumns;
            }
            this.panelOptions.numColumns = this.panelOptions.numColumns - Math.round(increment);
            this.onOptionsChange(this.panelOptions);

            increment = increment / this.incrementMultiple;
          }
        }
      }
    }, this.stepSizeMs);
  }

  stop(): void {
    if (this.intervalId) {
      this.active = false;
      clearInterval(this.intervalId);
    }
  }
}
