function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var r = document.getElementById(e).getAttribute("data-colors");
    return (r = JSON.parse(r)).map(function (e) {
      var r = e.replace(" ", "");
      if (!r.startsWith("rgba(var(")) {
        var t = e.split(",");
        if (2 == t.length) {
          var o = getComputedStyle(document.documentElement).getPropertyValue(
            t[0],
          );
          return (o = "rgba(" + o + "," + t[1] + ")");
        }
        return r;
      }
      var a = r.match(/rgba\(var\(([^)]+)\),([\d.]+)\)/);
      if (a) {
        var s = a[1],
          i = a[2];
        return (
          "rgba(" +
          getComputedStyle(document.documentElement)
            .getPropertyValue(s)
            .trim() +
          "," +
          i +
          ")"
        );
      }
    });
  }
}
initAvatarProgress();
var weeklyOrdersChartColors = getChartColorsArray("weeklyOrdersChart");
if (weeklyOrdersChartColors) {
  var options = {
    series: [{ name: "Orders", data: [120, 150, 90, 160, 110, 130, 170] }],
    chart: { type: "bar", height: 97, sparkline: { enabled: !0 } },
    plotOptions: {
      bar: { columnWidth: "35%", borderRadius: 5, distributed: !0 },
    },
    colors: weeklyOrdersChartColors,
    fill: { opacity: 0.3 },
    dataLabels: { enabled: !1 },
    grid: { show: !1 },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { show: !1 },
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
    },
    yaxis: { show: !1 },
    tooltip: {
      enabled: !0,
      y: {
        formatter: function (e) {
          return e + " orders";
        },
      },
    },
  };
  (chart = new ApexCharts(
    document.querySelector("#weeklyOrdersChart"),
    options,
  )).render();
}
var monthlyEarningsChartColors = getChartColorsArray("monthlyEarningsChart");
if (monthlyEarningsChartColors) {
  options = {
    series: [74],
    chart: { height: 300, type: "radialBar", offsetY: 0 },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: { show: !1 },
          value: {
            offsetY: 10,
            fontSize: "22px",
            color: void 0,
            formatter: function (e) {
              return e + "%";
            },
          },
        },
      },
    },
    colors: monthlyEarningsChartColors,
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.1,
        inverseColors: !1,
        opacityFrom: 1,
        opacityTo: 1,
        gradientToColors: monthlyEarningsChartColors,
        stops: [0, 50, 65, 91],
      },
    },
    grid: { padding: { top: -20, bottom: -10, left: 10, right: 10 } },
    stroke: { dashArray: 4 },
    labels: ["Median Ratio"],
  };
  (chart = new ApexCharts(
    document.querySelector("#monthlyEarningsChart"),
    options,
  )).render();
}
var revenueChartColors = getChartColorsArray("teamProductivityChart");
if (revenueChartColors) {
  options = {
    chart: {
      height: 310,
      toolbar: { show: !1 },
      zoom: { enabled: !1 },
      dropShadow: {
        enabled: !0,
        top: 10,
        left: 2,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    series: [
      {
        name: "Total Revenue",
        type: "line",
        data: [
          2e4, 28500, 18e3, 19800, 15500, 22200, 29e3, 21200, 18800, 28600,
          18e3, 28e3,
        ],
      },
      {
        name: "Total Refunds",
        type: "area",
        data: [
          1e4, 18500, 9e3, 25e3, 12e3, 14e3, 6e3, 22e3, 12e3, 17e3, 1e4, 18e3,
        ],
      },
    ],
    stroke: { curve: "smooth", width: [2, 2] },
    fill: {
      type: ["solid", "gradient"],
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: [revenueChartColors[1]],
        inverseColors: !0,
        opacityFrom: 0.2,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: [revenueChartColors[0], revenueChartColors[1]],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: { min: 0, labels: { formatter: (e) => e / 1e3 + "k" } },
    markers: { size: 0 },
    tooltip: {
      shared: !0,
      intersect: !1,
      y: { formatter: (e) => e / 1e3 + "k" },
    },
    grid: {
      borderColor: "#f1f1f1",
      row: { opacity: 0 },
      strokeDashArray: 4,
      padding: { top: -15, bottom: -3 },
    },
    legend: { show: !1 },
  };
  var revenueChart = new ApexCharts(
    document.querySelector("#teamProductivityChart"),
    options,
  );
  revenueChart.render();
}
var salesChartColors = getChartColorsArray("salesSummaryChart");
if (salesChartColors) {
  options = {
    series: [
      {
        name: "Sales",
        data: [
          3400, 5200, 8e3, 11100, 7e3, 5700, 4300, 3400, 2500, 1500, 1e3, 700,
        ],
      },
    ],
    chart: {
      height: 200,
      type: "bar",
      parentHeightOffset: 0,
      toolbar: { show: !1 },
      dropShadow: {
        enabled: !0,
        top: 10,
        left: 2,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: { position: "top" },
        columnWidth: "30%",
      },
    },
    fill: { opacity: 0.8 },
    dataLabels: {
      enabled: !0,
      formatter: function (e) {
        return "$" + (e / 1e3).toFixed(1) + "k";
      },
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#304758"] },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "top",
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      tooltip: { enabled: !0 },
    },
    grid: {
      strokeDashArray: 4,
      padding: { top: -20, left: 0, right: 0, bottom: -20 },
    },
    yaxis: {
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      labels: {
        show: !0,
        offsetX: -10,
        formatter: function (e) {
          return "$" + e / 1e3 + "k";
        },
      },
    },
    colors: [salesChartColors[0]],
  };
  (chart = new ApexCharts(
    document.querySelector("#salesSummaryChart"),
    options,
  )).render();
}
var orderStatisticsColors = getChartColorsArray("orderStatistics");
if (orderStatisticsColors) {
  var chart;
  options = {
    chart: {
      type: "area",
      height: 215,
      toolbar: { show: !1 },
      sparkline: { enabled: !0 },
    },
    series: [{ name: "Revenue", data: [1e4, 16e3, 8e3, 21e3, 4e3, 15e3] }],
    stroke: { curve: "smooth", width: 1 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        gradientToColors: orderStatisticsColors,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },
    colors: orderStatisticsColors,
    tooltip: {
      y: {
        formatter: function (e) {
          return "$" + e;
        },
      },
    },
    xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] },
    grid: {
      show: !0,
      strokeDashArray: 5,
      xaxis: { lines: { show: !0 } },
      yaxis: { lines: { show: !0 } },
    },
  };
  (chart = new ApexCharts(
    document.querySelector("#orderStatistics"),
    options,
  )).render();
}
$(function () {
  var e = "rtl" === $("html").attr("dir") ? "rtl" : "ltr";
  $("#transferClient").select2({
    dir: e,
    dropdownAutoWidth: !0,
    minimumResultsForSearch: 1 / 0,
  });
});
