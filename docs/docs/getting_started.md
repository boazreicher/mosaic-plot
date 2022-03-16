# Getting Started

## Plugin Test Environment

The simplest way to play around with Mosaic Plot is to use the docker-compose [plugin test environment](https://github.com/boazreicher/mosaic-plot/tree/main/plugin-test-environment)

Docker compose will run a container with a Grafana instance (on port 3000) that has the Mosaic Plot plugin installed, along with a number of sample dashboards

## Example Dashboards

If Mosaic Plot is already installed in your Grafana instance, you can play around with it by using the following dashboards (create a new dashboard and then just copy the JSON contents into the JSON Model)


!!! hint inline

    The dashboards are self contained (no external data required).  They all use the standard TestData DB datasource with static content

[Heatmaps Demo (Source)](https://raw.githubusercontent.com/boazreicher/mosaic-plot/main/plugin-test-environment/provisioning/dashboards/dashboards/mosaic_demo_heatmaps.json)
<p align="left">
  <img width="460" height="300" src="https://boazreicher.github.io/mosaic-plot/img/examples/demo1.png">
</p>

[Mandelbrot Set (Source)](https://raw.githubusercontent.com/boazreicher/mosaic-plot/main/plugin-test-environment/provisioning/dashboards/dashboards/mosaic_demo_mandelbrot.json)
<p align="left">
  <img width="460" height="300" src="https://boazreicher.github.io/mosaic-plot/img/examples/mandelbrot.png">
</p>

[Variations Demo (Source)](https://raw.githubusercontent.com/boazreicher/mosaic-plot/main/plugin-test-environment/provisioning/dashboards/dashboards/mosaic_demo_variations.json)
<p align="left">
  <img width="460" height="300" src="https://boazreicher.github.io/mosaic-plot/img/examples/variations.png">
</p>

[Variations 2 Demo (Source)](https://raw.githubusercontent.com/boazreicher/mosaic-plot/main/plugin-test-environment/provisioning/dashboards/dashboards/mosaic_demo_variations2.json)
<p align="left">
  <img width="460" height="300" src="https://boazreicher.github.io/mosaic-plot/img/examples/variations2.png">
</p>