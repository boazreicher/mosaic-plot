# Configuration Options

## Fields

| Name | Description | Required | Example |
| ------------ | ------------- | ------------ | ------------ |
| `Data Format` | Structure of the data source (See [Data](data.md)) | **Required** | |
| `Amplitude` | Value field that determines the amplitude (color) of each cell | **Required** | Request Count, Error Count |
| `Breakdown` | String field (dimension) on which to split the data into different rows | **Required** | Host Name |
| `Group` | String field (dimension) used to group different rows based on common values | *Optional* | Cluster Name |


## Grid Properties

| Name | Description |
| ------------ | ------------- |
| `Shape` | Shape of each cell.  Possible values are: <ul><li>⬜ Rectangle</li><li>⬣ Hexagon</li><li>🧩 Jigsaw</li><li>⬤ Circle</li><li>🔿 Stacked Circle</li></ul> |
| `Group Spacing` | Vertical separation between groups |
| `Sort Type` | Defines how rows should be sorted |
| `Sort Mode` | Sort ascending or descending |
| `Min Columns` | The minimum number of columns to display.  If `Focus` is disabled, this property determines the number of columns to show |
| `Max Columns` | The maximum number of columns to display when focusing |
| `Aggregation` | Aggregate function to apply when there are more data points than coloumns.  Possible values are: <ul><li>Sum</li><li>Average</li></ul> |
| `Scale Type` | Scaling function for determining a cell's color.  Possible values are: <ul><li>Squared</li><li>Linear</li><li>Square Root</li><li>Log</li></ul> |
| `Max Rows` | The maximum number of rows to show (after sorting) |


## Labels

| Name | Description |
| ------------ | ------------- |
| `Show Labels` | Controls the row labels.  Possible values are: <ul><li>Series</li><li>Group</li><li>None</li></ul> |
| `Label Positions` | Controls the position of the labels.  Possible values are: <ul><li>Horizontal</li><li>Vertical</li><li>Angle</li></ul> |
| `Left Margin` | Size of the labels margin |
| `Show X Axis` | Show or hide the horizontal axis |
| `Show Scale` | Show or hide the color scale |
| `Scale Width` | Horizontal width for the color scale |
| `Compact Mode` | If selected, hides everything except the grid itself |

## Style

| Name | Description |
| ------------ | ------------- |
| `Color Palette` | The color palette to use for coloring cells |
| `Invert Palette` | Invert the color palette's order |
| `Invert Colors` | Invert all colors used in the panel |
| `Zero Values` | Determines how empty (zero) cells should be treated.  Possible values are: <ul><li>Regular: Using the lowest color in the selected palette</li><li>Empty: No cell is created</li><li>Customer: Use a custom color</li></ul> |
| `Zero Color` | Custom color to use for empty cells |
| `Outline Color Type` | Determines how cell outlines should be colored.  Possible values are: <ul><li>Same as cell</li><li>Custom</li></ul> |
| `Outline Color` | Custom color to use for cell outlines |
| `Outline Width` | The width of cells' outline |
| `Bevel` | Add a bevel effect to each cell (might degrade performance when the grid contains a large number of cells) |
| `Smoothing` | Create smooth color transitions between adjacent cells (might degrade performance when the grid contains a large number of cells) |
| `Enable Focus` | When focus is enabled, clicking on any part of the grid causes it to transition between `Min Columns` and `Max Columns` |
| `Random Seed` | Random seed for generating Jigsaw puzzle grids |
