import moment from 'moment';

export const dateFormat = (date, format) => {
  if(!isNaN(date) && !(date instanceof Date)) {
    date = new Date(parseInt(date));
  }
  if(!date) {
    return '';
  }
  let tempDate = moment(date).format(format);
  return tempDate == "Invalid date" ? null:tempDate;
};

export function dateArrConvertJson(date, startDateName, endDateName, format = "YYYY-MM-DD HH:mm:ss") {
  if(!date || date.length != 2) {
    return {};
  }
  let obj = {};
  obj[startDateName] = dateFormat(date[0], format);
  obj[endDateName] = dateFormat(date[1], format);
  return obj;
}

export function setDayAfter(nowDate, count) {
  let nextDate = new Date(nowDate);
  const now = new Date(nowDate);
  nextDate.setDate(now.getDate() + parseInt(count));
  const month = (nextDate.getMonth() + 1) < 10 ? '0' + (nextDate.getMonth() + 1) : (nextDate.getMonth() + 1);
  const date = nextDate.getDate() < 10 ? '0' + nextDate.getDate() : nextDate.getDate();
  return nextDate.getFullYear() + '-' + month + '-' + date;
}

export function countDays(prev, next) {
  if (!prev || !next) {
    return false;
  }
  return (+new Date(next) - (+new Date(prev))) / (24 * 60 * 60 * 1000)
}

/**
  dateFormatting([2017,9,8],'-') 返回结果  2017-09-08
**/
export function parseDate(date) {
  if(!date) {
    return null;
  }
  let tempDate = null;
  if (!isNaN(date) && !(date instanceof Date)) {
    var time = date;
    tempDate = new Date(Number(time));
  } else {
    date = date && date.length == 10? date + " 00:00:00":date;
    if (new Date(date) != 'Invalid Date') {
      tempDate = new Date(date);
    } else if (new Date(date.replace(/-/g, "/")) != 'Invalid Date') {
      tempDate = new Date(date.replace(/-/g, "/"));
    } else {
      return null;
    }
  }
  
  // if(isUtc) {
  //   let localOffset = tempDate.getTimezoneOffset() * 60000;
  //   let utc = new Date(tempDate.getTime() + localOffset);
  //   return utc;
  // }
  
  return tempDate;
}

// 传入2个年份，月份，日期数组（或者String参数，默认为string）,返回2个日期之间的所有String日期
export function dateStringBetweenTwoDate(startDate, endDate) {

  let begin = '';
  let end = '';

  if (typeof (startDate) == 'object') {
    begin = dateFormatting(startDate, '-');
    end = dateFormatting(endDate, '-');
  } else {
    begin = startDate;
    end = endDate;
  }

  let count = countDays(startDate, endDate);
  let data = [];

  for (var i = 0; i < count + 1; i++) {
    data.push(setDayAfter(begin, i));
  }
  return data;
}

//根据日期返回星期
export function getWeekByDate(date) {
  if (date == null || date == '' || !date) {
    return;
  }
  if (!(date instanceof Date)) {
    date = new Date(date)
  }
  return date.getDay();
}

//根据当前日期nowDatedate计算第距离第count天的日期
export function getBeforeDate(nowDate, count) {
  return setDayAfter(nowDate, -count);
  // let prevDate = new Date(nowDate);
  // const now = new Date(nowDate);
  // prevDate.setDate(now.getDate() - parseInt(count));
  // const month = (prevDate.getMonth() + 1) < 10 ? '0' + (prevDate.getMonth() + 1) : (prevDate.getMonth() + 1);
  // const date = prevDate.getDate() < 10 ? '0' + prevDate.getDate() : prevDate.getDate();
  // return prevDate.getFullYear() + '-' + month + '-' + date;
}