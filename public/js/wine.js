$(document).ready(() => {
  let currentRange = $(location)
    .attr("pathname")
    .replace("/", "");
  getChartData().then(resp => {
    const chartRange = am4core.create("chartdiv", am4charts.XYChart);
    chartRange.data = resp;
    const dateAxis = chartRange.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;

    const valueAxis = chartRange.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    // only for the legend
    const iconSeries = chartRange.series.push(new am4charts.ColumnSeries());
    iconSeries.fill = am4core.color("#ec0800");
    iconSeries.strokeOpacity = 0;
    iconSeries.stroke = am4core.color("#ec0800");
    iconSeries.name = "Events";
    iconSeries.dataFields.dateX = "date";
    iconSeries.dataFields.valueY = "v";

    const series = chartRange.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.openValueY = "open";
    series.dataFields.valueY = "close";
    series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
    series.sequencedInterpolation = true;
    series.stroke = am4core.color("#1b7cb3");
    series.strokeWidth = 2;
    series.name = "District Metered Usage";
    series.stroke = chartRange.colors.getIndex(0);
    series.fill = series.stroke;
    series.fillOpacity = 0.8;

    const bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.fill = new am4core.InterfaceColorSet().getFor("background");
    bullet.fillOpacity = 1;
    bullet.strokeWidth = 2;
    bullet.circle.radius = 4;

    const series2 = chartRange.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "open";
    series2.sequencedInterpolation = true;
    series2.strokeWidth = 2;
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.label.fill = am4core.color("#000");
    series2.name = "SP Aggregate usage";
    series2.stroke = chartRange.colors.getIndex(7);
    series2.fill = series2.stroke;

    const bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.fill = bullet.fill;
    bullet2.fillOpacity = 1;
    bullet2.strokeWidth = 2;
    bullet2.circle.radius = 4;

    chartRange.cursor = new am4charts.XYCursor();
    chartRange.cursor.xAxis = dateAxis;
    Range.scrollbarX = new am4core.Scrollbar();

    let negativeRange;

    // create ranges
    // let negativeRange;

    // create ranges
    chartRange.events.on("datavalidated", () => {
      series.dataItems.each(s1DataItem => {
        let s1PreviousDataItem;
        let s2PreviousDataItem;

        const s2DataItem = series2.dataItems.getIndex(s1DataItem.index);

        if (s1DataItem.index > 0) {
          s1PreviousDataItem = series.dataItems.getIndex(s1DataItem.index - 1);
          s2PreviousDataItem = series2.dataItems.getIndex(s1DataItem.index - 1);
        }

        let startTime = am4core.time
          .round(
            new Date(s1DataItem.dateX.getTime()),
            dateAxis.baseInterval.timeUnit,
            dateAxis.baseInterval.count
          )
          .getTime();

        // intersections
        if (s1PreviousDataItem && s2PreviousDataItem) {
          const x0 =
            am4core.time
              .round(
                new Date(s1PreviousDataItem.dateX.getTime()),
                dateAxis.baseInterval.timeUnit,
                dateAxis.baseInterval.count
              )
              .getTime() +
            dateAxis.baseDuration / 2;
          const y01 = s1PreviousDataItem.valueY;
          const y02 = s2PreviousDataItem.valueY;

          const x1 = startTime + dateAxis.baseDuration / 2;
          const y11 = s1DataItem.valueY;
          const y12 = s2DataItem.valueY;

          const intersection = am4core.math.getLineIntersection(
            { x: x0, y: y01 },
            { x: x1, y: y11 },
            { x: x0, y: y02 },
            { x: x1, y: y12 }
          );

          startTime = Math.round(intersection.x);
        }

        // start range here
        if (s2DataItem.valueY > s1DataItem.valueY) {
          if (!negativeRange) {
            negativeRange = dateAxis.createSeriesRange(series);
            negativeRange.date = new Date(startTime);
            negativeRange.contents.fill = series2.fill;
            negativeRange.contents.fillOpacity = 0.8;
          }
        } else {
          // if negative range started
          if (negativeRange) {
            negativeRange.endDate = new Date(startTime);
          }
          negativeRange = undefined;
        }
        // end if last
        if (s1DataItem.index === series.dataItems.length - 1) {
          if (negativeRange) {
            negativeRange.endDate = new Date(
              s1DataItem.dateX.getTime() + dateAxis.baseDuration / 2
            );
            negativeRange = undefined;
          }
        }
      });
    });
  });
  getMoveData().then(data => {
    const chartup = am4core.create("moveup", am4charts.XYChart);
    //chart.data = data;
    chartup.data = data[1];
    const categoryAxis1 = chartup.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis1.dataFields.category = "name";
    categoryAxis1.renderer.grid.template.location = 0;
    categoryAxis1.renderer.minGridDistance = 30;

    categoryAxis1.renderer.labels.template.adapter.add("dy", (dy, target) => {
      if (target.dataItem && target.dataItem.index & (2 === 2)) {
        return dy + 25;
      }
      return dy;
    });

    const valueAxis1 = chartup.yAxes.push(new am4charts.ValueAxis());
    console.log(valueAxis1);

    // Create series
    const series1 = chartup.series.push(new am4charts.ColumnSeries());
    series1.dataFields.valueY = "value";
    series1.dataFields.categoryX = "name";
    series1.name = "Wine";
    series1.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series1.columns.template.fillOpacity = 0.8;

    const columnTemplate1 = series1.columns.template;
    columnTemplate1.strokeWidth = 2;
    columnTemplate1.strokeOpacity = 1;

    //-------------//

    const chartdn = am4core.create("movedn", am4charts.XYChart);
    //chart.data = data;
    chartdn.data = data[0];
    const categoryAxis2 = chartdn.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis2.dataFields.category = "name";
    categoryAxis2.renderer.grid.template.location = 0;
    categoryAxis2.renderer.minGridDistance = 30;
    categoryAxis2.renderer.labels.template.adapter.add("dy", (dy, target) => {
      if (target.dataItem && target.dataItem.index & (2 === 2)) {
        return dy + 25;
      }
      return dy;
    });

    const valueAxis2 = chartdn.yAxes.push(new am4charts.ValueAxis());
    console.log(valueAxis2);

    // Create series
    const series2 = chartdn.series.push(new am4charts.ColumnSeries());
    series2.dataFields.valueY = "value";
    series2.dataFields.categoryX = "name";
    series2.name = "Wine";
    series2.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series2.columns.template.fillOpacity = 0.8;

    const columnTemplate2 = series2.columns.template;
    columnTemplate2.strokeWidth = 2;
    columnTemplate2.strokeOpacity = 1;
    // get stats functions
  });
  async function getChartData() {
    //const query = `http://localhost:8080/getchart/${currentRange}`; 
    const query = `https://project-2-group1.herokuapp.com/getchart/${currentRange}`;
    const response = await fetch(query, {
      method: "GET"
    });
    return response.json();
  }
  async function getMoveData() {
    //const query = `http://localhost:8080/getmove/${currentRange}`;
    const query = `https://project-2-group1.herokuapp.com/getmove/${currentRange}`;
    const response = await fetch(query, {
      method: "GET"
    });
    return response.json();
  }

  function showDateRange() {
    currentRange = $("#daterangedisplay").text(
      $(location)
        .attr("pathname")
        .replace("/", "")
    );
  }
  showDateRange();
  $(".dropdown-item").on("click", () => {
    chartRange.clear();
  });
});
