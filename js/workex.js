function pluralize(count, noun, suffix = 's') {
    return `${count} ${noun}${count !== 1 ? suffix : ''}`;
}

function workExStr(startDate, endDate) {
    var start = moment(startDate)
    var end = moment(endDate)
    var duration = moment.duration(end.diff(start))
    var result = ""
    if (duration.years() > 0) {
        result += pluralize(duration.years(), 'Year')
    }
    if (duration.months() > 0) {
        result += " " + pluralize(duration.months(), 'Month')
    }
    document.write(result.trim())
}