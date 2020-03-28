google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

var chart_options = {
    curveType: 'function',
    legend: { position: 'top' },
    width: '100%',
    height: 300,
    chartArea: {
        width: '80%'
    },
    vAxis: {
        viewWindow: {
            min: 0
        }
    }
};

function drawCharts() {
    drawChart(document.getElementById('chart_div_1'), 'B5:C', 'INDIA')
    drawChart(document.getElementById('chart_div_2'), 'B5:B,D5:D', 'INDIA')
    drawChart(document.getElementById('chart_div_3'), 'B5:B,E5:E', 'INDIA')
    drawChart(document.getElementById('chart_div_4'), 'B5:B,F5:F', 'INDIA')

    drawChart(document.getElementById('chart_div_5'), 'B5:C', 'USA')
    drawChart(document.getElementById('chart_div_6'), 'B5:B,D5:D', 'USA')
    drawChart(document.getElementById('chart_div_7'), 'B5:B,E5:E', 'USA')
    drawChart(document.getElementById('chart_div_8'), 'B5:B,F5:F', 'USA')
}

function drawChart(chart_div, range, sheet) {
    var URL = 'https://docs.google.com/spreadsheets/d/16jZt8lJkWMKYtPbfaWvgTEDeb2eR8NmppMVpN1UxQeY/gviz/tq?range=' + range + '&sheet=' + sheet;
    var query = new google.visualization.Query(URL);
    var handleQueryResponse = function (response) {
        var data = response.getDataTable();
        var chart = new google.visualization.LineChart(chart_div);
        chart.draw(data, chart_options);
    }
    query.send(handleQueryResponse);
}

$(window).resize(function () {
    drawCharts()
});