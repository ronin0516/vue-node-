
export const formatDate = function(date = Date.now()) {
    let d = new Date(date),
        year = d.getFullYear(),
        month = addZero(d.getMonth() + 1),
        _date = addZero(d.getDate()),
        hour = addZero(d.getHours()),
        min = addZero(d.getMinutes()),
        sec = addZero(d.getSeconds());

    return `${year}-${month}-${_date} ${hour}:${min}:${sec}`
}

export const addZero = function(target) {
    target = Number(target);
    if(target > 9) {
        return target
    } else {
        return `0${target}`
    }
}





