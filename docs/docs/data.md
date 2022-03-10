# Data

## Requirements

The Sierra Plot panel expects <i>time series</i> data frames, meaning each series must contain at least on field with `time` type (if multiple such fields exist, the first one will be used)
<br>
The data must also contain at least one field with type `number` to be used as the [`Amplitude`](configuration_options.md#fields)
<br>
At least one field of type `string` is also required, to be used ad the [`Chart Breakdown`](configuration_options.md#fields)
<br>
<br>
For example, let's assume that we want to plot the number of requests hitting a number of different servers
<br>
Each server is located in some region
<br>
Our request count metric is calculated separately for `type=OK` and `type=ERROR`
<br>
<br>
For the above example, our data will contain a `time` field, a `number` field that represents the number of requests, and a `string` field representing the server name

The following (optional) fields can also be used:

| Use | Type | Description | Example |
| ------------ | ------------- | ------------ | ------------ |
| `Group Breakdown` | `string` | Group charts with the same group value | region |
| `Series Breakdown` | `string` | Split the charts' data according to the series values | type |
| `Weight` | `number` | Used for weighted average calculations | total requests |


## Notes

* Sierra Plot expects that each data frame has the same fields
* Sierra Plot expects that each data frame be of the same length
* Sierra Plot doesn't currently support null values