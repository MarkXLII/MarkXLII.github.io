google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

var series_1 = {
    0: { color: '#43459d' },
    1: { color: '#e7711b' },
    2: { color: '#f1ca3a' },
    3: { color: '#6f9654' },
    4: { color: '#1c91c0' },
    5: { color: '#e2431e' },
}

var series_2 = {
    0: { color: '#e2431e' },
    1: { color: '#e7711b' },
    2: { color: '#f1ca3a' },
    3: { color: '#6f9654' },
    4: { color: '#1c91c0' },
    5: { color: '#43459d' },
}

var chart_options = {
    curveType: 'function',
    legend: {
        position: 'top'
    },
    width: '100%',
    height: 300,
    hAxis: {
        format: 'dd MMM',
        viewWindow: '100%'
    },
    vAxis: {
        format: 'short',
        viewWindow: {
            min: 0
        }
    }
};

function drawCharts() {
    drawChart(document.getElementById('chart_div_1'), 'B5:C', 'INDIA', series_1)
    drawChart(document.getElementById('chart_div_2'), 'B5:B,D5:D', 'INDIA', series_1)
    drawChart(document.getElementById('chart_div_3'), 'B5:B,E5:E', 'INDIA', series_2)
    drawChart(document.getElementById('chart_div_4'), 'B5:B,F5:F', 'INDIA', series_2)

    drawChart(document.getElementById('chart_div_5'), 'B5:C', 'USA', series_1)
    drawChart(document.getElementById('chart_div_6'), 'B5:B,D5:D', 'USA', series_1)
    drawChart(document.getElementById('chart_div_7'), 'B5:B,E5:E', 'USA', series_2)
    drawChart(document.getElementById('chart_div_8'), 'B5:B,F5:F', 'USA', series_2)
}

function drawChart(chart_div, range, sheet, series) {
    var URL = 'https://docs.google.com/spreadsheets/d/16jZt8lJkWMKYtPbfaWvgTEDeb2eR8NmppMVpN1UxQeY/gviz/tq?range=' + range + '&sheet=' + sheet;
    var query = new google.visualization.Query(URL);
    var handleQueryResponse = function (response) {
        var data = response.getDataTable();
        var chart = new google.visualization.LineChart(chart_div);
        chart_options.series = series
        chart.draw(data, chart_options);
    }
    query.send(handleQueryResponse);
}

$(window).resize(function () {
    drawCharts()
});