/**
 * Created by zonesion on 2017/2/25.
 */
$(function () {
        $('#container').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
                month: '%e. %b',
                year: '%b'
            },
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            title: {
                text: 'Snow depth (m)'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        },
        //series: [{
        //    name: '温度历史记录',
        //    // Define the data points. All series have a dummy year
        //    // of 1970/71 in order to be compared on the same x axis. Note
        //    // that in JavaScript, months start at 0 for January, 1 for February etc.
        //    data: [
        //        [Date.UTC(1970,  9, 27), 0   ],
        //        [Date.UTC(1970, 10, 10), 0.6 ],
        //        [Date.UTC(1970, 10, 18), 0.7 ],
        //        [Date.UTC(1970, 11,  2), 0.8 ],
        //        [Date.UTC(1970, 11,  9), 0.6 ],
        //        [Date.UTC(1970, 11, 16), 0.6 ],
        //        [Date.UTC(1970, 11, 28), 0.67],
        //        [Date.UTC(1971,  0,  1), 0.81],
        //        [Date.UTC(1971,  0,  8), 0.78],
        //        [Date.UTC(1971,  0, 12), 0.98],
        //        [Date.UTC(1971,  0, 27), 1.84],
        //        [Date.UTC(1971,  1, 10), 1.80],
        //        [Date.UTC(1971,  1, 18), 1.80],
        //        [Date.UTC(1971,  1, 24), 1.92],
        //        [Date.UTC(1971,  2,  4), 2.49],
        //        [Date.UTC(1971,  2, 11), 2.79],
        //        [Date.UTC(1971,  2, 15), 2.73],
        //        [Date.UTC(1971,  2, 25), 2.61],
        //        [Date.UTC(1971,  3,  2), 2.76],
        //        [Date.UTC(1971,  3,  6), 2.82],
        //        [Date.UTC(1971,  3, 13), 2.8 ],
        //        [Date.UTC(1971,  4,  3), 2.1 ],
        //        [Date.UTC(1971,  4, 26), 1.1 ],
        //        [Date.UTC(1971,  5,  9), 0.25],
        //        [Date.UTC(1971,  5, 12), 0   ]
        //    ]
        //}
        ////    {
        ////    name: '湿度历史记录',
        ////    data: [
        ////        [Date.UTC(1970,  9, 18), 0.6  ],
        ////        [Date.UTC(1970,  9, 26), 0.52 ],
        ////        [Date.UTC(1970, 11,  1), 0.47],
        ////        [Date.UTC(1970, 11, 11), 0.55],
        ////        [Date.UTC(1970, 11, 25), 1.38],
        ////        //[Date.UTC(1971,  0,  8), 1.38],
        ////        //[Date.UTC(1971,  0, 15), 1.38],
        ////        //[Date.UTC(1971,  1,  1), 1.38],
        ////        //[Date.UTC(1971,  1,  8), 1.48],
        ////        //[Date.UTC(1971,  1, 21), 1.5 ],
        ////        //[Date.UTC(1971,  2, 12), 1.89],
        ////        //[Date.UTC(1971,  2, 25), 2.0 ],
        ////        //[Date.UTC(1971,  3,  4), 1.94],
        ////        //[Date.UTC(1971,  3,  9), 1.91],
        ////        //[Date.UTC(1971,  3, 13), 1.75],
        ////        //[Date.UTC(1971,  3, 19), 1.6 ],
        ////        //[Date.UTC(1971,  4, 25), 0.6 ],
        ////        //[Date.UTC(1971,  4, 31), 0.35],
        ////        //[Date.UTC(1971,  5,  7), 0   ]
        ////    ]
        ////}
        //    , {
        //    name: '土壤温度历史记录',
        //    data: [
        //        [Date.UTC(1970,  9,  9), 0   ],
        //        [Date.UTC(1970,  9, 14), 0.15],
        //        [Date.UTC(1970, 10, 28), 0.35],
        //        [Date.UTC(1970, 11, 12), 0.26],
        //        [Date.UTC(1971,  0,  1), 0.39],
        //        [Date.UTC(1971,  0, 24), 0.28],
        //        [Date.UTC(1971,  1,  1), 0.42],
        //        [Date.UTC(1971,  1,  7), 0.55],
        //        [Date.UTC(1971,  1, 23), 0.17],
        //        [Date.UTC(1971,  2,  8), 0.07],
        //        [Date.UTC(1971,  2, 14), 0.29],
        //        [Date.UTC(1971,  2, 24), 0.36],
        //        [Date.UTC(1971,  3,  4), 0.48 ],
        //        [Date.UTC(1971,  3, 18), 0.54],
        //        [Date.UTC(1971,  3, 24), 0.69 ],
        //        [Date.UTC(1971,  4, 16), 0.79],
        //        [Date.UTC(1971,  4, 21), 0   ]
        //    ]
        //}, {
        //    name: '土壤湿度度历史记录',
        //    data: [
        //        [Date.UTC(1970,  9,  9),1.00   ],
        //        [Date.UTC(1970,  9, 14), 1.06],
        //        [Date.UTC(1970, 10, 28), 1.2],
        //        [Date.UTC(1970, 11, 12), 1],
        //        [Date.UTC(1971,  0,  1), 0.50],
        //        [Date.UTC(1971,  0, 24), 0.56],
        //        [Date.UTC(1971,  1,  1), 0.9],
        //        [Date.UTC(1971,  1,  7), 0.97],
        //        [Date.UTC(1971,  1, 23), 0.77],
        //        [Date.UTC(1971,  2,  8), 0.77],
        //        [Date.UTC(1971,  2, 14), 0.89],
        //        [Date.UTC(1971,  2, 24), 0.86],
        //        [Date.UTC(1971,  3,  4), 0.8 ],
        //        [Date.UTC(1971,  3, 18), 0.94],
        //        [Date.UTC(1971,  3, 24), 0.9 ],
        //        [Date.UTC(1971,  4, 16), 0.39],
        //        [Date.UTC(1971,  4, 21), 0   ]
        //    ]
        //}, {
        //    name: 'CO2浓度历史记录',
        //    data: [
        //        [Date.UTC(1970,  9,  9), 0   ],
        //        [Date.UTC(1970,  9, 14), 0.15],
        //        [Date.UTC(1970, 10, 28), 0.35],
        //        [Date.UTC(1970, 11, 12), 0.46],
        //        [Date.UTC(1971,  0,  1), 0.59],
        //        [Date.UTC(1971,  0, 24), 0.58],
        //        [Date.UTC(1971,  1,  1), 0.62],
        //        [Date.UTC(1971,  1,  7), 0.65],
        //        [Date.UTC(1971,  1, 23), 0.77],
        //        [Date.UTC(1971,  2,  8), 0.77],
        //        [Date.UTC(1971,  2, 14), 0.79],
        //        [Date.UTC(1971,  2, 24), 0.86],
        //        [Date.UTC(1971,  3,  4), 0.8 ],
        //        [Date.UTC(1971,  3, 18), 0.94],
        //        [Date.UTC(1971,  3, 24), 0.9 ],
        //        [Date.UTC(1971,  4, 16), 0.39],
        //        [Date.UTC(1971,  4, 21), 0   ]
        //    ]
        //}, {
        //    name: '光照度历史记录',
        //    data: [
        //        [Date.UTC(1970,  9,  9), 0   ],
        //        [Date.UTC(1970,  9, 14), 0.25],
        //        [Date.UTC(1970, 10, 28), 0.15],
        //        [Date.UTC(1970, 11, 12), 0.26],
        //        [Date.UTC(1971,  0,  1), 0.49],
        //        [Date.UTC(1971,  0, 24), 0.68],
        //        [Date.UTC(1971,  1,  1), 0.72],
        //        [Date.UTC(1971,  1,  7), 0.85],
        //        [Date.UTC(1971,  1, 23), 0.77],
        //        [Date.UTC(1971,  2,  8), 0.67],
        //        [Date.UTC(1971,  2, 14), 0.59],
        //        [Date.UTC(1971,  2, 24), 0.46],
        //        [Date.UTC(1971,  3,  4), 0.38 ],
        //        [Date.UTC(1971,  3, 18), 0.24],
        //        [Date.UTC(1971,  3, 24), 0.9 ],
        //        [Date.UTC(1971,  4, 16), 0.19],
        //        [Date.UTC(1971,  4, 21), 0   ]
        //    ]
        //}
        //
        //]
    });
});