function getChartColorsArray(e) {
  if (null !== document.getElementById(e)) {
    var t = document.getElementById(e).getAttribute("data-colors");
    return (t = JSON.parse(t)).map(function (e) {
      var t = e.replace(" ", "");
      if (-1 === t.indexOf(",")) {
        var r = getComputedStyle(document.documentElement).getPropertyValue(t);
        return r || t;
      }
      var o = e.split(",");
      if (2 == o.length) {
        var a = getComputedStyle(document.documentElement).getPropertyValue(
          o[0],
        );
        return (a = "rgba(" + a + "," + o[1] + ")");
      }
      return t;
    });
  }
}
var chartScatterImagesColors = getChartColorsArray("images_scatter2");
if (chartScatterImagesColors) {
  var options = {
    series: [
      {
        name: "User A",
        data: [
          [16.4, 5.4],
          [21.7, 4],
          [25.4, 3],
          [19, 8],
          [33.9, 1],
          [13.6, 14],
          [25.9, 7],
          [28.9, 8.2],
          [16.4, 2],
          [42.6, 4.3],
          [5.6, 12],
          [29.9, 3],
          [25.9, 5.2],
          [6, 8],
          [36.9, 8],
          [24.5, 7.1],
          [28, 11],
          [8.1, 4.7],
        ],
      },
      {
        name: "User B",
        data: [
          [6.4, 5.4],
          [30, 4],
          [37.4, 3],
          [9, 2],
          [20.9, 11],
          [35.9, 7],
          [25.9, 8.2],
          [6.4, 14],
          [11.6, 12],
          [15.6, 3],
          [10.9, 8],
          [6.4, 5.4],
          [35, 13],
          [37.4, 3],
          [9, 2],
          [20.9, 11],
        ],
      },
    ],
    chart: {
      height: 367,
      type: "scatter",
      animations: { enabled: !1 },
      zoom: { enabled: !1 },
      toolbar: { show: !1 },
    },
    colors: chartScatterImagesColors,
    xaxis: { tickAmount: 10, min: 0, max: 40 },
    yaxis: { tickAmount: 7 },
    markers: { size: 20 },
    fill: {
      type: "image",
      opacity: 1,
      image: {
        src: [
          "./images/medicine.png",
          "./images/doctor.png",
        ],
        width: 40,
        height: 40,
      },
    },
    legend: { show: !1 },
  };
  (chart = new ApexCharts(
    document.querySelector("#images_scatter2"),
    options,
  )).render();
}
var invoiceStatusColors = getChartColorsArray("invoiceStatus");
if (invoiceStatusColors) {
  function renderCharts() {
    var e = {
      series: [
        {
          name: "Domestic Revenue",
          data: [3.5, 4.5, 2.1, 3.5, 1.8, 5, 2, 3, 4.1, 2, 4.5, 3.6],
        },
        {
          name: "International Revenue",
          data: [-3, -2, -2, -3, -1.9, -2.6, -2.2, -1.7, -1, -2.5, -3, -2],
        },
      ],
      chart: { type: "bar", height: 318, stacked: !0, toolbar: { show: !1 } },
      colors: invoiceStatusColors,
      plotOptions: {
        bar: { borderRadius: 4, columnWidth: "16%", horizontal: !1 },
      },
      legend: { show: !1 },
      dataLabels: { enabled: !1 },
      stroke: { width: 1, colors: ["#fff"] },
      grid: { yaxis: { lines: { show: !1 } } },
      yaxis: {
        min: -4,
        max: 5,
        tickAmount: 9,
        labels: {
          formatter: function (e) {
            return e + "%";
          },
        },
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
      },
      tooltip: {
        shared: !1,
        y: {
          formatter: function (e) {
            return Math.abs(e) + "%";
          },
        },
      },
      title: { show: !1 },
    };
    ((invoiceStatus = new ApexCharts(
      document.querySelector("#invoiceStatus"),
      e,
    )),
      invoiceStatus.render());
  }
  window.addEventListener("DOMContentLoaded", renderCharts);
}
var patientsStatusColors = getChartColorsArray("patientsStatus");
if (patientsStatusColors) {
  options = {
    chart: {
      type: "line",
      height: 130,
      toolbar: { show: !1 },
      zoom: { enabled: !1 },
      dropShadow: {
        enabled: !0,
        top: 3,
        left: 2,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    series: [
      { name: "Admissions", data: [20, 54, 7, 75, 25, 60, 15] },
      { name: "Discharges", data: [10, 36, 15, 50, 12, 35, 5] },
    ],
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      labels: { show: !1 },
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
    },
    yaxis: { min: 0, show: !1 },
    stroke: { curve: "smooth", width: 2 },
    markers: { show: !1 },
    tooltip: { shared: !0, y: { formatter: (e) => `${e} Patients` } },
    colors: patientsStatusColors,
    grid: {
      borderColor: "#f1f1f1",
      row: { opacity: 0 },
      strokeDashArray: 4,
      padding: { top: -25, bottom: -10, left: 10, right: 10 },
    },
    legend: { show: !1 },
  };
  (teamProductivityChart = new ApexCharts(
    document.querySelector("#patientsStatus"),
    options,
  )).render();
}
var weeklyOrdersChartColors = getChartColorsArray("weeklyOrdersChart");
if (weeklyOrdersChartColors) {
  options = {
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
var patientByAgeColors = getChartColorsArray("patientByAge");
if (patientByAgeColors) {
  options = {
    series: [18, 20, 21, 19, 21],
    chart: { type: "polarArea", height: 320 },
    stroke: { show: !0, width: 2, colors: ["#000"] },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: patientByAgeColors,
        inverseColors: !1,
        opacityFrom: 0.3,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    labels: ["0-10 yrs", "11-20 yrs", "21-30 yrs", "31-40 yrs", "41+ yrs"],
    legend: { show: !1 },
    yaxis: { show: !1 },
    grid: { padding: { top: -15, bottom: -10 } },
    colors: patientByAgeColors,
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 }, legend: { show: !1 } },
      },
    ],
  };
  (chart = new ApexCharts(
    document.querySelector("#patientByAge"),
    options,
  )).render();
}
var teamProductivityChartColors = getChartColorsArray("teamProductivityChart");
if (teamProductivityChartColors) {
  var teamProductivityChart;
  options = {
    chart: {
      type: "line",
      height: 339,
      toolbar: { show: !1 },
      zoom: { enabled: !1 },
      dropShadow: {
        enabled: !0,
        top: 3,
        left: 2,
        blur: 4,
        color: "#000",
        opacity: 0.2,
      },
    },
    series: [
      { name: "Team", data: [12, 12, 25, 25, 37, 37, 20, 20, 40, 40, 22, 22] },
      {
        name: "Productivity",
        data: [52, 52, 30, 30, 20, 20, 40, 40, 55, 55, 35, 35],
      },
    ],
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
    yaxis: { min: 0 },
    stroke: { curve: "smooth", width: 2 },
    markers: { show: !1 },
    tooltip: { shared: !0, y: { formatter: (e) => `${e} activities` } },
    colors: teamProductivityChartColors,
    grid: { borderColor: "#f1f1f1", row: { opacity: 0 }, strokeDashArray: 4 },
    legend: { show: !0, position: "bottom", horizontalAlign: "center" },
  };
  (teamProductivityChart = new ApexCharts(
    document.querySelector("#teamProductivityChart"),
    options,
  )).render();
}
var monthlySalesChartColors = getChartColorsArray("monthlySalesChart");
if (monthlySalesChartColors) {
  options = {
    series: [
      {
        name: "Servings",
        data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 65],
      },
    ],
    chart: { height: 319, type: "bar", toolbar: { show: !1 } },
    plotOptions: {
      bar: {
        borderRadius: 5,
        columnWidth: "40%",
        dataLabels: { position: "top" },
        colors: {
          backgroundBarColors: ["#f2f2f2"],
          backgroundBarOpacity: 0.2,
          backgroundBarRadius: 5,
        },
      },
    },
    dataLabels: { enabled: !1 },
    stroke: { width: 0 },
    grid: { strokeDashArray: 6, padding: { bottom: -10, right: -3 } },
    xaxis: {
      labels: { rotate: -45 },
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
    yaxis: { show: !1 },
    colors: monthlySalesChartColors,
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.25,
        gradientToColors: monthlySalesChartColors,
        inverseColors: !0,
        opacityFrom: 0.25,
        opacityTo: 0.85,
        stops: [50, 0, 100],
      },
    },
  };
  var monthlySalesChart = new ApexCharts(
    document.querySelector("#monthlySalesChart"),
    options,
  );
  monthlySalesChart.render();
}
var salesDealsChartColors = getChartColorsArray("salesDealsChart");
if (salesDealsChartColors) {
  options = {
    series: [
      { name: "Open Deals", data: [80, 50, 30, 40, 100, 20] },
      { name: "Won Deals", data: [20, 30, 40, 80, 20, 80] },
      { name: "Lost Deals", data: [44, 76, 78, 13, 43, 10] },
    ],
    chart: {
      height: 200,
      type: "radar",
      dropShadow: { enabled: !0, blur: 4, left: 2, top: 2 },
      toolbar: { show: !1 },
    },
    colors: salesDealsChartColors,
    stroke: { width: 2, curve: "smooth" },
    fill: {
      opacity: 0.2,
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.4,
        gradientToColors: [
          [
            salesDealsChartColors[0],
            salesDealsChartColors[1],
            salesDealsChartColors[2],
          ],
        ],
        opacityFrom: 0.2,
        opacityTo: 0,
      },
    },
    markers: { size: 0, hover: { size: 0 } },
    tooltip: {
      y: {
        formatter: function (e) {
          return e + " deals";
        },
      },
    },
    xaxis: {
      categories: [
        "Prospect",
        "Qualified",
        "Proposal",
        "Negotiation",
        "Closed Won",
        "Closed Lost",
      ],
      labels: {
        style: {
          colors: [
            "#6c757d",
            "#6c757d",
            "#6c757d",
            "#6c757d",
            "#6c757d",
            "#6c757d",
          ],
          fontSize: "12px",
        },
      },
    },
    grid: { padding: { top: -50, bottom: -40, left: -20, right: -50 } },
    yaxis: { show: !0, min: 0, max: 100, tickAmount: 5 },
    legend: { show: !1 },
  };
  (chart = new ApexCharts(
    document.querySelector("#salesDealsChart"),
    options,
  )).render();
}
var maleChartColors = getChartColorsArray("maleChart");
if (maleChartColors) {
  options = {
    chart: {
      type: "area",
      height: 125,
      toolbar: { show: !1 },
      sparkline: { enabled: !0 },
    },
    series: [
      { name: "Male", data: [12e3, 15e3, 14e3, 17e3, 16e3, 19e3, 15e3, 17e3] },
    ],
    stroke: { curve: "smooth", width: 1 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 0.3,
        opacityTo: 0,
        gradientToColors: maleChartColors,
        stops: [0, 90, 100],
      },
    },
    colors: maleChartColors,
    tooltip: {
      y: {
        formatter: function (e) {
          return "$" + e;
        },
      },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    grid: {
      show: !0,
      strokeDashArray: 5,
      xaxis: { lines: { show: !0 } },
      yaxis: { lines: { show: !1 } },
      padding: { top: 30 },
    },
    legend: { show: !0, position: "bottom", offsetX: 0, offsetY: 36 },
  };
  (chart = new ApexCharts(
    document.querySelector("#maleChart"),
    options,
  )).render();
}
var patientOverviewChartColors = getChartColorsArray("patient-overview-chart");
if (patientOverviewChartColors) {
  options = {
    series: [38, 25, 44, 35, 25],
    chart: { width: 225, type: "donut" },
    plotOptions: { pie: { startAngle: -90, endAngle: 270 } },
    colors: patientOverviewChartColors,
    dataLabels: { enabled: !1 },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: patientOverviewChartColors,
        inverseColors: !0,
        opacityFrom: 0,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    legend: { show: !1 },
    tooltip: {
      enabled: !0,
      x: { show: !1 },
      y: {
        formatter: function (e, t) {
          return (
            ["Health", "Nutrition", "Exercise", "Mental Wellbeing", "Sleep"][
              t.seriesIndex
            ] +
            ": " +
            e +
            "%"
          );
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 200 }, legend: { position: "bottom" } },
      },
    ],
  };
  (chart = new ApexCharts(
    document.querySelector("#patient-overview-chart"),
    options,
  )).render();
}
var chart,
  leadRadialChartColors = getChartColorsArray("leadRadialChart"),
  targetValue = 70;
options = {
  series: [0],
  chart: {
    height: 329,
    type: "radialBar",
    sparkline: { enabled: !0 },
    animations: { enabled: !1 },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: { margin: 10, size: "77%" },
      track: { background: "#e7e7e7", strokeWidth: "97%", margin: 5 },
      dataLabels: {
        name: {
          show: !0,
          fontSize: "14px",
          color: "#888",
          offsetY: 4,
          fontWeight: 400,
        },
        value: {
          offsetY: -40,
          fontSize: "22px",
          formatter: function (e) {
            return e + "%";
          },
        },
      },
    },
  },
  stroke: { lineCap: "round" },
  colors: leadRadialChartColors,
  labels: ["Lead Management"],
};
function animateRadialWithMarker() {
  const e = document.querySelector(".lead-management-value"),
    t = document.querySelector("#leadRadialChart").getBoundingClientRect(),
    r = t.width / 2,
    o = t.height / 2 + 70,
    a = t.width / 2 - 50;
  let s = 0;
  const i = setInterval(() => {
    (s >= targetValue && (clearInterval(i), (s = targetValue)),
      chart.updateSeries([s]));
    const t = ((s / 100) * 165 - 180) * (Math.PI / 180),
      n = r + a * Math.cos(t),
      l = o + a * Math.sin(t);
    ((e.style.left = n + "px"),
      (e.style.top = l + "px"),
      (e.textContent = Math.round(s) + "%"),
      (s += 1));
  }, 15);
}
(chart = new ApexCharts(
  document.querySelector("#leadRadialChart"),
  options,
)).render();
const observer = new IntersectionObserver(
  (e, t) => {
    e.forEach((e) => {
      e.isIntersecting && (animateRadialWithMarker(), t.disconnect());
    });
  },
  { threshold: 0.5 },
);
observer.observe(document.querySelector("#leadRadialChart"));
