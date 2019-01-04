//判断传入的参数是否是json对象,是则返回true,否则返回false
export function isJson(obj){  
  var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;   
  return isjson;  
}

/**
 * 
 * @param {*} map 给map对象所有字段做初始化,如果该字段为数字则初始化为空集合([]),如果是字符串则为空字符串(""),其他则为null
 * @param {*} eliminate 为变长参数,需要跳过的字段的名称
 */
export function clearProp(map, ...eliminate) {
  let flag = isJson(map);
  if(!flag) {
    return false;
  }

  for(let key in map) {
    let mark = false;
    eliminate.forEach(e => {
      if(e == key) {
        mark = true;
      }
    });
    if(mark) {
      continue;
    }
    if(isJson(map[key])) {
      clearProp(map[key]);
    } else if(Array.isArray(map[key])) {
      map[key] = [];
    } else if(typeof(map[key]) == 'string') {
      map[key] = '';
    } else {
      map[key] = null;
    }
  }
}

/**
 * 
 * @param {*} src 必须是json对象,为要转换的源对象
 * @param {*} tag 必须是json对象,tag会转换所有跟src交集的字段的值
 * @param {*} eliminate 为变长参数,需要跳过的字段的名称
 */
export function convert(src, tag, ...eliminate) {
  let flag = isJson(src);
  if(!flag) {
    return;
  }

  for(let key in src) {
    let mark = false;
    eliminate.forEach(e => {
      if(e == key) {
        mark = true;
      }
    });
    if(mark) {
      continue;
    }
    let temp = tag[key];
    // if(temp) {
    src[key] = tag[key];
    // }
  }
}

/**
 * 
 * @param {*} arr 必须是json数组,为要转换的源数组
 * @param {*} keyName 指定一个arr元素中的一个字段名称,并作为新的json的key
 * @param {*} valueName 指定一个arr元素中的一个字段名称,并作为新的json的value
 */
export function convertArrToJSON(arr, keyName, valueName) {
  if(!Array.isArray(arr)){
    console.warn('这不是一个数组.');
    return null;
  }
  let map = {};
  if(valueName) {
    for(let i=0;i<arr.length;i++) {
      let tempKey = arr[i][keyName];
      let tempValue = arr[i][valueName];
      map[tempKey] = tempValue;
    }
  } else {
    for(let i=0;i<arr.length;i++) {
      let tempKey = arr[i][keyName];
      let tempValue = arr[i];
      map[tempKey] = tempValue;
    }
  }
  return map;
}

/**
 * 
 * @param {*} map 必须是json,为要转换的源json对象
 * @param {*} keyName 指定一个名称,会把map的key作为转换后的数组的字段.
 * @param {*} valueName 指定一个名称,会把map的value作为转换后的数组的字段.
 */
export function convertJSONToArr(map, keyName, valueName) {
  if(!isJson(map)){
    console.warn('这不是一个json.');
    return null;
  }
  let arr = [];
  for(let key in map) {
    let tempObj = {};
    tempObj[keyName] = key;
    tempObj[valueName] = map[key];
    arr.push(tempObj);
  }
  return arr;
}

/**
 * 
 * @param {*} scr 源对象
 * @param {*} tag 目标对象
 * @param {*} keyName 要转义的key的名称
 * @param {*} valueName 要转义value的名称
 */
export function join(scr, tag, keyName, valueName) {
  if(!scr || !scr.length) {
    return;
  }
  for(let i=0;i<scr.length;i++) {
    let item = scr[i];
    item[valueName] = tag[item[keyName]];
  }
}

/**
 * 该clone方法为深克隆
 * @param {*} scr 需要深克隆的源对象,必须为json对象
 * @param {*} eliminate 为变长参数,需要跳过的字段的名称
 */
export function clone(scr , ...eliminate) {
  let newScr = {};
  for(let key in scr) {
    let mark = false;
    eliminate && eliminate.forEach(e => {
      if(e == key) {
        mark = true;
      }
    });
    if(mark) {
      continue;
    }
    if(isJson(scr[key])) {
      newScr[key] = clone(scr[key] , eliminate);
    } else {
      newScr[key] = scr[key];
    }
  }
  return newScr;
}

/**
 * 该clone方法为深克隆,并不会克隆空值字段(可能新的对象会比源对象少些字段)
 * @param {*} scr 需要深克隆的源对象,必须为json对象
 * @param {*} eliminate 为变长参数,需要跳过的字段的名称
 */
export function cloneFilterEmpty(scr, ...eliminate) {
  let newScr = {};
  for(let key in scr) {
    let mark = false;
    eliminate && eliminate.forEach(e => {
      if(e == key) {
        mark = true;
      }
    });
    if(mark) {
      continue;
    }
    if(!!scr[key] || scr[key] === 0 || scr[key] === false) {
      if(isJson(scr[key])) {
        newScr[key] = cloneFilterEmpty(scr[key] , eliminate);
      } else {
        newScr[key] = scr[key];
      }
    }
  }
  return newScr;
}

/**
 * 把propName字符串的驼峰命名转换成下划线命名
 * @param {*} propName 
 */
export function convertCamelCaseToUnderscore(propName) {
  if(!propName) {
    return '';
  }
  let arr = [];
  for(let i=0;i<propName.length;i++) {
    let temp = propName.substr(i, 1);
    if(temp >= 'A' && temp <='Z') {
      temp = '_' + temp.toLocaleLowerCase();
    }
    arr.push(temp);
  }
  return arr.join('');
}

export function downloadDoc(url, param, method = 'get') {
  let id = 'temp_export_form';
  var form = document.getElementById(id);
  if(!form) {
    form = document.createElement("form");
    form.id = id;
    form.style = "display: none;";
  }
  document.body.appendChild(form);

  form.method = method;
  form.action = url;

  let html = '';
  for(let item in param) {
    if(Array.isArray(item)) {
      for(let e of item) {
        html += `<input type="hidden" name="${item}" value="${e}"><input>`;
      }
    } else {
      html += `<input type="hidden" name="${item}" value="${param[item]}"><input>`;
    }
  }
  form.innerHTML = html;
  form.submit();
}

export function jsonConvertFormData(params) {
  let param = new FormData(); //创建form对象
  for(let key in params) {
    param.append(key,params[key]);//通过append向form对象添加数据
  }
  return param;
}