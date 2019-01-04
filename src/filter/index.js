/***
   自定义全局过滤器
***/

import Vue from 'vue';

import {
  dateFormat
} from '@/utils/dateUtil';


Vue.filter('join', function (value, map, defaltValue) {
  if(!value || !map[value]) {
    return defaltValue;
  }
  return map[value];
});

Vue.filter('joinMulti', function (values, map, separator=",", defaltValue) {
  if(!values || values.length == 0) {
    return defaltValue;
  }
  let tempArr = [];
  for(let item of values) {
    let tempVal = map[item];
    if(tempVal) {
      tempArr.push(tempVal);
    }
  }
  return tempArr.join(separator);
});

Vue.filter('dateFormat', function (value,fmt) {
  return dateFormat(value, fmt);
});

Vue.filter('moneyFormat', function (value, fmt = "￥") {
  if(!value) {
    return '';
  }
  return fmt + value;
});

Vue.filter('substr', function (value, len) {
  if(!value) {
    return value;
  }
  return value.length > len ? value.substr(0, len) + '...' : value
});

Vue.filter('newline', function (value, splitter = '，') {
  if(!value) {
    return value;
  }
  return value.split(splitter);
  // return value.replace(new RegExp(splitter,"gm"), '<br/>');
});