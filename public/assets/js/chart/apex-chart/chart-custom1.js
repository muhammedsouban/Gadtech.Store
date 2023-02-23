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

    console.log(categoryData)
    console.log(categoryReportData)

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


});