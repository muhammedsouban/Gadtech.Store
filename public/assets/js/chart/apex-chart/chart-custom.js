// employ salery chart
var options = {
    series: [{
        name: 'Sales',
        data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19]
    }],

    colors: ['#0da487'],

    chart: {
        type: 'area',
        // stacked: false,
        height: 285,
    },

    stroke: {
        width: 3,
        curve: 'smooth'
    },
};

var chart = new ApexCharts(document.querySelector("#employ-salary"), options);
chart.render();

// salery summary chart
var options = {
    series: [{
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],

    chart: {
        type: 'bar',
        height: 290,
    },

    plotOptions: {
        bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
        },
    },

    dataLabels: {
        enabled: false
    },

    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },

    colors: ['#0da487', '#2483e2', '#3d3d3d'],

    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
    },

    yaxis: {
        title: {
            show: false,
        }
    },

    fill: {
        opacity: 1
    },

    tooltip: {
        y: {
            formatter: function (val) {
                return "$ " + val + " thousands"
            }
        }
    },
    legend: {
        show: false,
        // position: 'bottom',

        // itemMargin: {
        //     horizontal: 5,
        //     vertical: 1
        // },
    },

    responsive: [{
        breakpoint: 991,

        options: {
            // series: [{
            //         // data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            //     },
            //     {
            //         data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
            //     },
            //     {
            //         data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
            //     }
            // ],
            chart: {
                height: 300,
            },
        },
    }, ],
};

var chart = new ApexCharts(document.querySelector("#saler-summary"), options);
chart.render();

// sales purchase chart
var options = {
    series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30, 12, 20]
    }],
    chart: {
        height: 300,
        type: 'bar',
    },
    colors: ['#0da487', '#2483e2', '#3d3d3d'],
    plotOptions: {
        bar: {
            columnWidth: '45%',
            distributed: true,
        }
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false
    },
    xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        labels: {
            style: {
                colors: ['#0da487', '#2483e2', '#3d3d3d'],
                fontSize: '12px'
            }
        }
    }
};

var chart = new ApexCharts(document.querySelector("#sales-purchase-chart"), options);
chart.render();

//sales purchase return cart
var options = {
    series: [{
        // name: 'series1',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
    }, {
        // name: 'series2',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
    }],
    chart: {
        height: 350,
        type: 'area'
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'straight',
        width: [3, 3]
    },

    colors: ['#0da487', '#2483e2', '#e2c924'],

    xaxis: {
        type: 'time',
        categories: [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14],
    },

    legend: {
        show: false,
    },

    tooltip: {
        show: false,
    },
};

var chart = new ApexCharts(document.querySelector("#sales-purchase-return-cart"), options);
chart.render();

// expenses-cart Start
var options = {
    series: [{
            name: "Page Views",
            data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        // {
        //     name: 'Total Visits',
        //     data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        // }
    ],
    theme: {
        monochrome: {
            enabled: true,
            color: '#255aee',
            shadeTo: 'light',
            shadeIntensity: 0.65
        }
    },
    chart: {
        height: 310,
        type: 'line',
        zoom: {
            enabled: true
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        width: [3, 7, 5],
        curve: 'straight',
        dashArray: [0, 8, 5]
    },
    markers: {
        size: 0,
        hover: {
            sizeOffset: 6
        }
    },
    xaxis: {
        categories: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    },
    grid: {
        borderColor: '#ddd',
    },
    responsive: [{
        breakpoint: 992,
        options: {
            chart: {
                height: 300,
            },
        },
    }, ],
};

var chart = new ApexCharts(document.querySelector("#expenses-cart"), options);
chart.render();

// Pie Chart
var options = {
    series: [44, 55, 13, 43, 22],
    chart: {
        width: 380,
        type: 'pie',
    },
    legend: {
        show: false,
    },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

// total-earnings-chart
var options = {
    series: [{
        name: "STOCK ABC",
        data: series.monthDataSeries1.prices
    }],

    chart: {
        type: 'area',
        height: 90,
        width: 90,
        zoom: {
            enabled: false
        }
    },

    dataLabels: {
        enabled: false
    },

    stroke: {
        curve: 'straight'
    },

    labels: series.monthDataSeries1.dates,
    xaxis: {
        labels: {
            show: false,

        },

        type: 'datetime',
        axisBorder: {
            show: false,
        },

        axisTicks: {
            show: false,
        },
    },

    yaxis: {
        opposite: true,

        labels: {
            show: false,
        },
    },
    grid: {
        xaxis: {
            lines: {
                borderColor: 'transparent',
                show: false
            }
        },

        yaxis: {
            lines: {
                borderColor: 'transparent',
                show: false,
            }
        },

        padding: {
            right: 0,
            bottom: 0,
            left: 0,
            top: 0
        }
    },

    legend: {
        horizontalAlign: 'left'
    },
};

var chart = new ApexCharts(document.querySelector("#total-earnings-chart"), options);
chart.render();

//traffic chart

var generateDayWiseTimeSeries = function (baseval, count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
        var x = baseval;
        var y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

        series.push([x, y]);
        baseval += 88400000;
        i++;
    }
    return series;
}

var options = {
    series: [{
        name: 'Referral Traffic',
        data: [45, 40, 140, 70, 150, 260, 240, 380, 110, 180, 270, 115, 70, 65, 50]
    }, ],
    chart: {
        type: 'area',
        height: 370,
        stacked: true,
        events: {
            selection: function (chart, e) {
                console.log(new Date(e.xaxis.min))
            }
        },
    },

    stroke: {
        show: true,
        curve: 'smooth',
        lineCap: 'butt',
        colors: undefined,
        dashArray: 0,
    },

    markers: {
        size: 6,
        colors: '#fff',
        strokeColors: '#747dc6',
        strokeWidth: 4,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        shape: "circle",
        radius: 2,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        onDblClick: undefined,
        showNullDataPoints: true,

        hover: {
            size: undefined,
            sizeOffset: 3
        }
    },

    colors: ['#747dc6'],
    dataLabels: {
        enabled: false
    },

    grid: {
        padding: {
            right: 0,
            bottom: 0,
            left: 0,
            top: 0
        }
    },

    fill: {
        type: 'gradient',
        gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.2,
            shade: 'light',
            type: "vertical",
            // optional, if not defined - uses the shades of same color in series
        }
    },

    legend: {
        position: 'top',
        horizontalAlign: 'left'
    },

    xaxis: {
        categories: [ 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Feb', 'mar'],
    },

    responsive: [{
            breakpoint: 1400,
            options: {
                chart: {
                    height: 210,
                    width: "120%",
                    offsetX: -45,

                },

                legend: {
                    position: 'bottom',
                },

                dataLabels: {
                    textAnchor: 'left',

                    style: {
                        fontSize: '10px',
                    },
                }
            },
        },

        {
            breakpoint: 992,
            options: {
                chart: {
                    height: 210,
                    width: "100%",
                    offsetX: 0,
                },
            },
        },

        {
            breakpoint: 578,
            options: {
                chart: {
                    height: 200,
                    width: "105%",
                    offsetX: -20,
                    offsetY: 10,
                },
            },
        },

        {
            breakpoint: 430,
            options: {
                chart: {
                    width: "108%",
                },
            },
        },

        {
            breakpoint: 330,
            options: {
                chart: {
                    width: "112%",
                },
            },
        },
    ],
};

var chart = new ApexCharts(document.querySelector("#traffic-chart"), options);
chart.render();