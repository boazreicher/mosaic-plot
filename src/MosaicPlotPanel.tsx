import { PanelProps } from '@grafana/data';
import { stylesFactory, useTheme2 } from '@grafana/ui';
import { getTimeRange } from 'data/SeriesUtils';
import { css, cx } from 'emotion';
import { MosaicPlot } from 'MosaicPlot';
import React from 'react';
import { MosaicPlotOptions } from 'types';

interface Props extends PanelProps<MosaicPlotOptions> {}

export const MosaicPlotPanel: React.FC<Props> = ({ options, data, width, height, onOptionsChange }) => {
  const styles = getStyles();
  const theme = useTheme2();
  options.isDark = theme.isDark;

  return (
    <div
      className={cx(
        styles.wrapper,
        css`
          width: ${width}px;
          height: ${height}px;
          float: left;
        `
      )}
    >
      <MosaicPlot
        width={width}
        height={height}
        dataFrames={data.series}
        panelOptions={options}
        timeRange={getTimeRange(data.series)}
        onOptionsChange={onOptionsChange}
      />
    </div>
  );
};

const getStyles = stylesFactory(() => {
  return {
    wrapper: css`
      position: relative;
    `,
    svg: css`
      position: absolute;
      top: 0;
      left: 0;
    `,
    textBox: css`
      position: absolute;
      bottom: 0;
      left: 0;
      padding: 10px;
    `,
  };
});
