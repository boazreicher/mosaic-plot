# Examples

## I.  Server Stats
The following example showcases how a Mosaic Plot can be used to effectively visualize servers stats for a large number of servers<br>
We have 50 different servers in 4 different regions, and are interested in seeing for each server, the number of requests, error rate, CPU utilization and memory utilization<br>
Normally, it wouldn't be feasible to plot all 4 metrics over time for each of the 50 servers, so we would have to settle for summary stats<br>

We would have something like this:
![stats_noheatmap](/img/examples/stats_noheatmap.png)

While this dashboard gives us a pretty good summary of the performance in each region, it is lacking in several aspects:
<ol>
<li>There's not enough room in the dashboard to add requests and error rate stats over time</li>
<li>The data that is shown over time is only per region.  We have no way to see the behavior of specific servers</li>
</ol>

By using Mosaic Plot panels, we can construct something like this:
![stats_heatmap](/img/examples/stats_heatmap.png)

First, for each region, we've added two heatmaps<br>
One that shows the number of requests **per server** over time (white to blue) and one that shows the average error rate **per server** over time (green to red)<br>

By using [`Compact Mode`](configuration_options.md#labels) we achieve an incredibly high data resolution.  The top left heatmap for example (showing the number of requests per server in us-east-1), contains 2880 different cells/data points, while taking up the space that would normally fit only a sparkline or two, let alone trying to fit a line/area chart in that space

Next, we've added two larger heatmaps<br>
The first shows the average CPU utilization of every server<br>
The second shows the average memory utilization of every server<br>

We've used the [`Grouping`](features.md#grouping) feature to clearly differentiate between each group of servers<br>
This type of visualization allows us to get a clear picture of both the individual performance of each server, as well as the overall trends for each region 

## II.  Basic Heatmaps
The following example shows 3 basic heatmaps, visualized as Mosaic Plots with different styling parameters:
![demo1](/img/examples/demo1.png)

## III.  Variations
The following example shows the same data plotted plotted in 12 different styling variations<br>

Each column shows a different [`Shape`](configuration_options.md#grid-properties): `Rectangle`, `Hexagon`, `Stacked Circle` and `Circle`<br>
The top row is the basic style<br>
The second row adds a [`Bevel`](configuration_options.md#style) effect
The bottom row gets rid of the [`Outline`](configuration_options.md#style) and adds a [`Smoothing`](features.md#smoothing) effect
![variations](/img/examples/variations.png)

!!! hint inline

    <a href="/img/examples/variations.png" target="_blank">Open the image in a separate tab (full size) to clearly see the subtle differences between the first and second row</a>

## IV.  More Variations
The following example shows the same data plotted plotted in 6 different styling variations<br>

The middle and right plots on the bottom show the use of the [`Discrete Scale`](configuration_options.md#labels) option.  It can be very useful when the values can be categorized, such as assigning different value ranges to categories such as `GREAT`, `GOOD`, `AVERAGE`, `BAD` and `TERRIBLE`
![variations2](/img/examples/variations2.png)

!!! hint inline

    <a href="/img/examples/variations2.png" target="_blank">Open the image in a separate tab (full size) to clearly see the styling features in each plot</a>

## V.  Mandelbrot Set
Just for fun, let's plot the Mandelbrot set using Mosaic Plots:<br>
![mandelbrot](/img/examples/mandelbrot.png)