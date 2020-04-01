google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawCharts);

// Chart vertical axis scales
var scaleType = 'linear';
var scaleTypes = ['linear', 'log'];

// Sheets
var country = 'INDIA';
var countries = ['INDIA', 'USA'];
var countryNames = {
    'INDIA': 'India',
    'USA': 'USA'
}

// Cache data from sheet to avoid too many requests
// Expiry: 1hr
var data_cache_expiry = 60 * 60 * 1000;
var data_cache = {}

// Set window width, avoid redraw on height change (collapsing toolbar on mobiles)
var lastWidth = 0;

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

var loading_html = '<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>';

function drawCharts() {
    console.log('drawCharts');
    $('#chart_div_1').html(loading_html);
    $('#chart_div_2').html(loading_html);
    $('#chart_div_3').html(loading_html);
    $('#chart_div_4').html(loading_html);
    drawChart(document.getElementById('chart_div_1'), 'B5:C', country, series_1)
    drawChart(document.getElementById('chart_div_2'), 'B5:B,D5:D', country, series_1)
    drawChart(document.getElementById('chart_div_3'), 'B5:B,E5:E', country, series_2)
    drawChart(document.getElementById('chart_div_4'), 'B5:B,F5:F', country, series_2)
}

function drawChart(chart_div, range, sheet, series) {
    getData(sheet, range, function (data) {
        var chart = new google.visualization.LineChart(chart_div);
        chart_options.series = series;
        chart_options.vAxis.scaleType = scaleType;
        chart.draw(data, chart_options);
    });
}

function getData(sheet, range, callback) {
    var key = sheet + ":" + range;
    var data_from_cache = getFromCache(key);
    if (data_from_cache) {
        callback(data_from_cache);
    } else {
        var URL = 'https://docs.google.com/spreadsheets/d/16jZt8lJkWMKYtPbfaWvgTEDeb2eR8NmppMVpN1UxQeY/gviz/tq?range=' + range + '&sheet=' + sheet;
        var query = new google.visualization.Query(URL);
        var handleQueryResponse = function (response) {
            var data = response.getDataTable();
            setInCache(key, data);
            callback(data);
        }
        query.send(handleQueryResponse);
    }
}

$(window).on('load', function () {
    console.log('load: W:' + window.innerWidth + ' H:' + window.innerHeight);
    lastWidth = window.innerWidth;
});

$(window).on('resize', function () {
    // Re-draw only when width is changed
    var newWidth = window.innerWidth;
    if (lastWidth != newWidth) {
        lastWidth = newWidth;
        drawCharts();
    }
});

$(document).ready(function () {
    $('input[name=scale]').click(function () {
        var newValue = this.value;
        if (scaleTypes.includes(newValue) && newValue != scaleType) {
            scaleType = this.value;
            drawCharts();
        }
    });
    $('input[name=country]').click(function () {
        var newValue = this.value;
        if (countries.includes(newValue) && newValue != country) {
            country = this.value;
            $('#country_name').text(countryNames[country]);
            drawCharts();
        }
    });
});

function setInCache(key, value) {
    var d = new Date();
    data_cache[key] = {
        data: value,
        expiry: d.getTime() + data_cache_expiry
    }
}

function getFromCache(key) {
    var value = data_cache[key];
    if (value) {
        var d = new Date();
        var newTime = d.getTime();
        if (newTime <= value.expiry) {
            return value.data;
        } else {
            data_cache[key] = undefined;
            return undefined;
        }
    } else {
        return undefined;
    }
}