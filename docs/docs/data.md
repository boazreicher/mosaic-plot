# Data

## Requirements

The Mosaic Plot panel expects <i>time series</i> data frames, meaning each series must contain at least one field with `time` type (if multiple such fields exist, the first one will be used)

Two data formats are supported:
### 1. Regular Data Format

This data format is applicable where each data frame has a **numeric** [`Amplitude`](configuration_options.md#fields) field and a **string** [`Breakdown`](configuration_options.md#fields) label to differentiate the different series.  It can also contain an (optional) additional **string** label for [`grouping`](configuration_options.md#fields) the different series.

For example, let's assume that we want to plot the number of requests hitting a number of different servers
<br>
Each server is located in some region
<br>
<br>
For the above example, our data will contain a `time` field, a `number` field that represents the number of requests, and a `string` label representing the server name.  It might also contain a `string` label represening the region name.
<br>
The data will be presented in multiple frames, where each frame corresponds to a specific combination of label values.  For example, each frame might look something like this:

| Time      | Host  | Region | Requests |
| ----------- | ----------- | ----------- | ------------------------------------ |
| 1647399651000       | use1-03 | us-east-1 | 234 |
| 1647399656000      | use1-03 | us-east-1 | 125 |

| Time      | Host  | Region | Requests |
| ----------- | ----------- | ----------- | ------------------------------------ |
| 1647399651000       | use1-02 | us-east-1 | 163 |
| 1647399656000      | use1-02 | us-east-1 | 14 |

| Time      | Host  | Region | Requests |
| ----------- | ----------- | ----------- | ------------------------------------ |
| 1647399651000       | usw1-01 | us-west-1 | 111 |
| 1647399656000      | usw1-01 | us-west-1 | 875 |

Currently, Mosaic Plot doesn't support the use case where all of the data is in a single data frame, like this:

| Time      | Host  | Region | Requests |
| ----------- | ----------- | ----------- | ------------------------------------ |
| 1647399651000       | use1-03 | us-east-1 | 234 |
| 1647399651000      | use1-02 | us-east-1 | 163 |
| 1647399651000      | usw1-01 | us-west-1 | 111 |
| 1647399656000      | usw1-01 | us-west-1 | 875 |
| 1647399656000       | use1-03 | us-east-1 | 125 |
| 1647399656000      | use1-02 | us-east-1 | 14 |


!!! hint inline

    Converting the above format (single data frame, no labels) to the supported one can be achieved by using the [`Prepare time series transform`](https://grafana.com/docs/grafana/next/panels/transform-data/transformation-functions/#prepare-time-series)


!!! hint inline

    When using the regular data format, rows are mapped to the  [`Breakdown`](configuration_options.md#fields) field

### 2. Heatmap Data Format

This data format is applicable where each data frame contains only a **time** field and a **numeric** value field.

For example, let's assume we want to plot a heatmap of the number of requests over time, in bins representing response time ranges.  Basically histograms over time.
<br>
For the above example, our data will contain multiple data frames, where each frame has a **time** field and a value field, whose name represents the bucket (and vertical position in the plot).

The data will contain multiple data frames that look something like this:

| Time      | 100-200  | 
| ----------- | ----------- |
| 1647399651000       | 4 | 
| 1647399656000      | 12 |
| 1647399661000      | 12 |

| Time      | 200-500  | 
| ----------- | ----------- |
| 1647399651000       | 1 | 
| 1647399656000      | 24 |
| 1647399661000      | 4 |

| Time      | 500-1000  | 
| ----------- | ----------- |
| 1647399651000       | 0 | 
| 1647399656000      | 10 |
| 1647399661000      | 9 |



!!! hint inline

    When using the heatmap data format, each row is mapped to a specific data frame

## Notes

* Mosaic Plot expects that each data frame has the same fields
* Mosaic Plot expects that each data frame be of the same length
* Mosaic Plot doesn't currently support null values