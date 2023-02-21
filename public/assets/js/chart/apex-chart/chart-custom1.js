let monthWiseRevenue = [];
let categoryRevenue = [];



$(document).ready(async function () {
    let response = await fetch('/admin/revenue/report', {
        method: 'get',
    });
    res = await response.json();
    monthWiseRevenue = res.monthWiseRevenue
    categoryRevenue = res.categoryRevenue
    //bar chart

    const revenueData = []
    monthWiseRevenue.forEach((item) => {
        revenueData.push(item.total)
    })
    //Revenue report
    const options = {
        series: [{
            name: 'revenue',
            data: revenueData
        }],
        chart: {
            height: 320,
            type: 'area',
            dropShadow: {
                enabled: true,
                top: 10,
                left: 0,
                blur: 3,
                color: '#999999',
                opacity: 0.15
            },
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            },
        },
        markers: {
            strokeWidth: 4,
            strokeColors: "#ffffff",
            hover: {
                size: 9,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            lineCap: 'butt',
            width: 4,
        },
        legend: {
            show: false
        },
        colors: ["#252426"],
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.6,
                stops: [0, 90, 100]
            }
        },
        grid: {
            xaxis: {
                lines: {
                    borderColor: 'transparent',
                    show: true
                }
            },
            yaxis: {
                lines: {
                    borderColor: 'transparent',
                    show: false,
                }

            },
            padding: {
                right: -112,
                bottom: 0,
                left: 15
            }
        },
        responsive: [{
            breakpoint: 1200,
            options: {
                grid: {
                    padding: {
                        right: -95,
                    }
                },
            },
        },
        {
            breakpoint: 992,
            options: {
                grid: {
                    padding: {
                        right: -69,
                    }
                },
            },
        },
        {
            breakpoint: 767,
            options: {
                chart: {
                    height: 200,
                }
            },
        },
        {
            breakpoint: 576,
            options: {
                yaxis: {
                    labels: {
                        show: false,
                    },
                },
            },
        }
        ],
        yaxis: {
            labels: {
                formatter: function (value) {
                    return "₹" + value;
                }
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#b6b6b6',
                    width: 1,
                    dashArray: 5,
                },
            },
            tooltip: {
                enabled: true,
            },
        },
        xaxis: {
            categories: ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec",],
            range: undefined,
            axisBorder: {
                low: 0,
                offsetX: 0,
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
    };

    const chart = new ApexCharts(document.querySelector("#report-chart"), options);
    chart.render();

    //Category report
    const categoryData = []
    const categoryReportData = []
    const categoryReport = categoryRevenue
    categoryReport.forEach((item) => {
        categoryData.push(item.name)
        categoryReportData.push(item.total)
    })
    //pie chart for visitors
    const options2 = {
        series: categoryReportData,
        labels: categoryData,
        chart: {
            width: "100%",
            height: 275,
            type: 'donut',
        },

        legend: {
            fontSize: '12px',
            position: 'bottom',
            offsetX: 1,
            offsetY: -1,

            markers: {
                width: 10,
                height: 10,
            },

            itemMargin: {
                vertical: 2
            },
        },

        colors: ['#28c870', '#ffa044', '#ee4a21', '#9e65c2', '#6670bd', '#FF9800'],

        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 270
            }
        },

        dataLabels: {
            enabled: false
        },

        responsive: [{
            breakpoint: 1835,
            options2: {
                chart: {
                    height: 245,
                },

                legend: {
                    position: 'bottom',

                    itemMargin: {
                        horizontal: 5,
                        vertical: 1
                    },
                },
            },
        },

        {
            breakpoint: 1388,
            options2: {
                chart: {
                    height: 330,
                },

                legend: {
                    position: 'bottom',
                },
            },
        },

        {
            breakpoint: 1275,
            options2: {
                chart: {
                    height: 300,
                },

                legend: {
                    position: 'bottom',
                },
            },
        },

        {
            breakpoint: 1158,
            options2: {
                chart: {
                    height: 280,
                },

                legend: {
                    fontSize: '10px',
                    position: 'bottom',
                    offsetY: 10,
                },
            },
        },

        {
            theme: {
                mode: 'dark',
                palette: 'palette1',
                monochrome: {
                    enabled: true,
                    color: '#255aee',
                    shadeTo: 'dark',
                    shadeIntensity: 0.65
                },
            },
        },

        {
            breakpoint: 598,
            options2: {
                chart: {
                    height: 280,
                },

                legend: {
                    fontSize: '12px',
                    position: 'bottom',
                    offsetX: 5,
                    offsetY: -5,

                    markers: {
                        width: 10,
                        height: 10,
                    },

                    itemMargin: {
                        vertical: 1
                    },
                },
            },
        },
        ],
    };

    const chart2 = new ApexCharts(document.querySelector("#pie-chart-visitors"), options2);
    chart2.render();


    // const optionsLine = {
    //     chart: {
    //         height: 350,
    //         type: "line",
    //         stacked: true,
    //         animations: {
    //             enabled: true,
    //             easing: "linear",
    //             dynamicAnimation: {
    //                 speed: 1000
    //             }
    //         },
    //         dropShadow: {
    //             enabled: true,
    //             opacity: 0.3,
    //             blur: 5,
    //             left: -7,
    //             top: 22
    //         },
    //         events: {
    //             animationEnd: function (chartCtx) {
    //                 const newData1 = chartCtx.w.config.series[0].data.slice();
    //                 newData1.shift();
    //                 const newData2 = chartCtx.w.config.series[1].data.slice();
    //                 newData2.shift();
    //                 window.setTimeout(function () {
    //                     chartCtx.updateOptions({
    //                         series: [{
    //                             data: newData1
    //                         },
    //                         {
    //                             data: newData2
    //                         }
    //                         ],
    //                         subtitle: {
    //                             text: parseInt(getRandom() * Math.random()).toString()
    //                         }
    //                     },
    //                         false,
    //                         false
    //                     );
    //                 }, 300);
    //             }
    //         },
    //         toolbar: {
    //             show: false
    //         },
    //         zoom: {
    //             enabled: false
    //         }
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     stroke: {
    //         curve: "straight",
    //         width: 5
    //     },
    //     grid: {
    //         padding: {
    //             left: 0,
    //             right: 0
    //         }
    //     },
    //     markers: {
    //         size: 0,
    //         hover: {
    //             size: 0
    //         }
    //     },
    //     series: [{
    //         name: "Running",
    //         data: generateMinuteWiseTimeSeries(
    //             new Date("12/12/2016 00:20:00").getTime(),
    //             12, {
    //             min: 30,
    //             max: 110
    //         }
    //         )
    //     },
    //     {
    //         name: "Waiting",
    //         data: generateMinuteWiseTimeSeries(
    //             new Date("12/12/2016 00:20:00").getTime(),
    //             12, {
    //             min: 30,
    //             max: 110
    //         }
    //         )
    //     }
    //     ],
    //     xaxis: {
    //         type: "datetime",
    //         range: 2700000
    //     },
    //     title: {
    //         text: "Processes",
    //         align: "left",
    //         style: {
    //             fontSize: "12px"
    //         }
    //     },
    //     subtitle: {
    //         text: "20",
    //         floating: true,
    //         align: "right",
    //         offsetY: 0,
    //         style: {
    //             fontSize: "22px"
    //         }
    //     },
    //     legend: {
    //         show: true,
    //         floating: true,
    //         horizontalAlign: "left",
    //         onItemClick: {
    //             toggleDataSeries: false
    //         },
    //         position: "top",
    //         offsetY: -33,
    //         offsetX: 60
    //     }
    // };

    // var chartLine = new ApexCharts(
    //     document.querySelector("#linechart"),
    //     optionsLine
    // );
    // chartLine.render();


    // window.Apex = {
    //     chart: {
    //         foreColor: "#fff",
    //         toolbar: {
    //             show: false
    //         }
    //     },
    //     colors: ["#FCCF31", "#17ead9", "#f02fc2"],
    //     stroke: {
    //         width: 3
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     grid: {
    //         borderColor: "#40475D"
    //     },
    //     xaxis: {
    //         axisTicks: {
    //             color: "#333"
    //         },
    //         axisBorder: {
    //             color: "#333"
    //         }
    //     },
    //     fill: {
    //         type: "gradient",
    //         gradient: {
    //             gradientToColors: ["#F55555", "#6078ea", "#6094ea"]
    //         }
    //     },
    //     tooltip: {
    //         theme: "dark",
    //         x: {
    //             formatter: function (val) {
    //                 return moment(new Date(val)).format("HH:mm:ss");
    //             }
    //         }
    //     },
    //     yaxis: {
    //         decimalsInFloat: 2,
    //         opposite: true,
    //         labels: {
    //             offsetX: -10
    //         }
    //     }
    // };

    // var trigoStrength = 3;
    // var iteration = 11;

    // function getRandom() {
    //     var i = iteration;
    //     return (
    //         (Math.sin(i / trigoStrength) * (i / trigoStrength) +
    //             i / trigoStrength +
    //             1) *
    //         (trigoStrength * 2)
    //     );
    // }

    // function getRangeRandom(yrange) {
    //     return Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    // }

    // function generateMinuteWiseTimeSeries(baseval, count, yrange) {
    //     var i = 0;
    //     var series = [];
    //     while (i < count) {
    //         var x = baseval;
    //         var y =
    //             (Math.sin(i / trigoStrength) * (i / trigoStrength) +
    //                 i / trigoStrength +
    //                 1) *
    //             (trigoStrength * 2);

    //         series.push([x, y]);
    //         baseval += 300000;
    //         i++;
    //     }
    //     return series;
    // }

    // function getNewData(baseval, yrange) {
    //     var newTime = baseval + 300000;
    //     return {
    //         x: newTime,
    //         y: Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    //     };
    // }



    // const optionsLine2 = {
    //     chart: {
    //         height: 350,
    //         type: "line",
    //         stacked: true,
    //         animations: {
    //             enabled: true,
    //             easing: "linear",
    //             dynamicAnimation: {
    //                 speed: 1000
    //             }
    //         },
    //         dropShadow: {
    //             enabled: true,
    //             opacity: 0.3,
    //             blur: 5,
    //             left: -7,
    //             top: 22
    //         },
    //         events: {
    //             animationEnd: function (chartCtx) {
    //                 const newData1 = chartCtx.w.config.series[0].data.slice();
    //                 newData1.shift();
    //                 const newData2 = chartCtx.w.config.series[1].data.slice();
    //                 newData2.shift();
    //                 window.setTimeout(function () {
    //                     chartCtx.updateOptions({
    //                         series: [{
    //                             data: newData1
    //                         },
    //                         {
    //                             data: newData2
    //                         }
    //                         ],
    //                         subtitle: {
    //                             text: parseInt(getRandom() * Math.random()).toString()
    //                         }
    //                     },
    //                         false,
    //                         false
    //                     );
    //                 }, 300);
    //             }
    //         },
    //         toolbar: {
    //             show: false
    //         },
    //         zoom: {
    //             enabled: false
    //         }
    //     },
    //     dataLabels: {
    //         enabled: false
    //     },
    //     stroke: {
    //         curve: "straight",
    //         width: 5
    //     },
    //     grid: {
    //         padding: {
    //             left: 0,
    //             right: 0
    //         }
    //     },
    //     markers: {
    //         size: 0,
    //         hover: {
    //             size: 0
    //         }
    //     },
    //     series: [{
    //         name: "Running",
    //         data: generateMinuteWiseTimeSeries(
    //             new Date("12/12/2016 00:20:00").getTime(),
    //             12, {
    //             min: 30,
    //             max: 110
    //         }
    //         )
    //     },
    //     {
    //         name: "Waiting",
    //         data: generateMinuteWiseTimeSeries(
    //             new Date("12/12/2016 00:20:00").getTime(),
    //             12, {
    //             min: 30,
    //             max: 110
    //         }
    //         )
    //     }
    //     ],
    //     xaxis: {
    //         type: "datetime",
    //         range: 2700000
    //     },
    //     title: {
    //         text: "Processes",
    //         align: "left",
    //         style: {
    //             fontSize: "12px"
    //         }
    //     },
    //     subtitle: {
    //         text: "20",
    //         floating: true,
    //         align: "right",
    //         offsetY: 0,
    //         style: {
    //             fontSize: "22px"
    //         }
    //     },
    //     legend: {
    //         show: true,
    //         floating: true,
    //         horizontalAlign: "left",
    //         onItemClick: {
    //             toggleDataSeries: false
    //         },
    //         position: "top",
    //         offsetY: -33,
    //         offsetX: 60
    //     }
    // };

    // const chartLine = new ApexCharts(
    //     document.querySelector("#linechart1"),
    //     optionsLine2
    // );
    // chartLine.render();

});

// window.setInterval(function () {
//     iteration++;


//     chartLine.updateSeries([
//         {
//             data: [
//                 ...chartLine.w.config.series[0].data,
//                 [chartLine.w.globals.maxX + 300000, getRandom()]
//             ]
//         },
//         {
//             data: [
//                 ...chartLine.w.config.series[1].data,
//                 [chartLine.w.globals.maxX + 300000, getRandom()]
//             ]
//         }
//     ]);

// }, 3000);