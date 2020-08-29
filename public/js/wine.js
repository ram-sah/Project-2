am4core.ready(() => {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  const chart = am4core.create("chartdiv", am4charts.XYChart);

  chart.data = [
    { date: 1577743200000, open: 122, close: 104 },
    { date: 1577829600000, open: 121, close: 70 },
    { date: 1577916000000, open: 101, close: 55 },
    { date: 1578002400000, open: 103, close: 45 },
    { date: 1578088800000, open: 153, close: 85 },
    { date: 1578175200000, open: 150, close: 116 },
    { date: 1578261600000, open: 135, close: 153 },
    { date: 1578348000000, open: 98, close: 152 },
    { date: 1578434400000, open: 101, close: 192 },
    { date: 1578520800000, open: 110, close: 225 },
    { date: 1578607200000, open: 157, close: 233 },
    { date: 1578693600000, open: 128, close: 232 },
    { date: 1578780000000, open: 101, close: 235 },
    { date: 1578866400000, open: 109, close: 200 },
    { date: 1578952800000, open: 142, close: 214 },
    { date: 1579039200000, open: 123, close: 224 },
    { date: 1579125600000, open: 99, close: 176 },
    { date: 1579212000000, open: 100, close: 172 },
    { date: 1579298400000, open: 67, close: 138 },
    { date: 1579384800000, open: 81, close: 127 },
    { date: 1579471200000, open: 39, close: 137 },
    { date: 1579557600000, open: 73, close: 127 },
    { date: 1579644000000, open: 78, close: 154 },
    { date: 1579730400000, open: 116, close: 127 },
    { date: 1579816800000, open: 136, close: 78 },
    { date: 1579903200000, open: 139, close: 61 },
    { date: 1579989600000, open: 162, close: 13 },
    { date: 1580076000000, open: 201, close: 41 },
    { date: 1580162400000, open: 221, close: 72 },
    { date: 1580248800000, open: 257, close: 87 },
    { date: 1580335200000, open: 211, close: 114 },
    { date: 1580421600000, open: 233, close: 138 },
    { date: 1580508000000, open: 261, close: 141 },
    { date: 1580594400000, open: 279, close: 130 }
  ];

  const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.grid.template.location = 0;
  dateAxis.renderer.minGridDistance = 60;

  const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.tooltip.disabled = true;

  // only for the legend
  const iconSeries = chart.series.push(new am4charts.ColumnSeries());
  iconSeries.fill = am4core.color("#ec0800");
  iconSeries.strokeOpacity = 0;
  iconSeries.stroke = am4core.color("#ec0800");
  iconSeries.name = "Events";
  iconSeries.dataFields.dateX = "date";
  iconSeries.dataFields.valueY = "v";

  const series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.dateX = "date";
  series.dataFields.openValueY = "open";
  series.dataFields.valueY = "close";
  series.tooltipText = "open: {openValueY.value} close: {valueY.value}";
  series.sequencedInterpolation = true;
  series.stroke = am4core.color("#1b7cb3");
  series.strokeWidth = 2;
  series.name = "District Metered Usage";
  series.stroke = chart.colors.getIndex(0);
  series.fill = series.stroke;
  series.fillOpacity = 0.8;

  const bullet = series.bullets.push(new am4charts.CircleBullet());
  bullet.fill = new am4core.InterfaceColorSet().getFor("background");
  bullet.fillOpacity = 1;
  bullet.strokeWidth = 2;
  bullet.circle.radius = 4;

  const series2 = chart.series.push(new am4charts.LineSeries());
  series2.dataFields.dateX = "date";
  series2.dataFields.valueY = "open";
  series2.sequencedInterpolation = true;
  series2.strokeWidth = 2;
  series2.tooltip.getFillFromObject = false;
  series2.tooltip.getStrokeFromObject = true;
  series2.tooltip.label.fill = am4core.color("#000");
  series2.name = "SP Aggregate usage";
  series2.stroke = chart.colors.getIndex(7);
  series2.fill = series2.stroke;

  const bullet2 = series2.bullets.push(new am4charts.CircleBullet());
  bullet2.fill = bullet.fill;
  bullet2.fillOpacity = 1;
  bullet2.strokeWidth = 2;
  bullet2.circle.radius = 4;

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.xAxis = dateAxis;
  chart.scrollbarX = new am4core.Scrollbar();

  let negativeRange;

  // create ranges
  // let negativeRange;

  // create ranges
  chart.events.on("datavalidated", () => {
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
}); // end am4core.ready()
