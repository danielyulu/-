import moment from 'moment';
import {
  pinyin_dict_notone
} from '@/utils/pinyin/dict/pinyin_dict_notone';
import {
  pinyin_dict_withtone
} from '@/utils/pinyin/dict/pinyin_dict_withtone';
/**
 * 汉字与拼音互转工具，根据导入的字典文件的不同支持不同
 * 对于多音字目前只是将所有可能的组合输出，准确识别多音字需要完善的词库，而词库文件往往比字库还要大，所以不太适合web环境。
 * @start 2016-09-26
 * @last 2016-09-29
 */
var dict = {}; // 存储所有字典数据

function removeTone(pinyin) {
  var toneMap = {
    "ā": "a1",
    "á": "a2",
    "ǎ": "a3",
    "à": "a4",
    "ō": "o1",
    "ó": "o2",
    "ǒ": "o3",
    "ò": "o4",
    "ē": "e1",
    "é": "e2",
    "ě": "e3",
    "è": "e4",
    "ī": "i1",
    "í": "i2",
    "ǐ": "i3",
    "ì": "i4",
    "ū": "u1",
    "ú": "u2",
    "ǔ": "u3",
    "ù": "u4",
    "ü": "v0",
    "ǖ": "v1",
    "ǘ": "v2",
    "ǚ": "v3",
    "ǜ": "v4",
    "ń": "n2",
    "ň": "n3",
    "": "m2"
  };
  return pinyin.replace(/[āáǎàōóǒòēéěèīíǐìūúǔùüǖǘǚǜńň]/g, function (m) {
    return toneMap[m][0];
  });
}

// function handlePolyphone(array, splitter, joinChar) {
//   splitter = splitter || '';
//   var result = [''],
//     temp = [];
//   for (var i = 0; i < array.length; i++) {
//     temp = [];
//     var t = array[i].split(splitter);
//     for (var j = 0; j < t.length; j++) {
//       for (var k = 0; k < result.length; k++)
//         temp.push(result[k] + (result[k] ? joinChar : '') + t[j]);
//     }
//     result = temp;
//   }
//   return simpleUnique(result);
// }

// function simpleUnique(array) {
//   var result = [];
//   var hash = {};
//   for (var i = 0; i < array.length; i++) {
//     var key = (typeof array[i]) + array[i];
//     if (!hash[key]) {
//       result.push(array[i]);
//       hash[key] = true;
//     }
//   }
//   return result;
// }

;(function parseDict() {
  // 如果导入了 pinyin_dict_firstletter.js
  // 如果导入了 pinyin_dict_notone.js
  if (pinyin_dict_notone) {
    dict.notone = {};
    dict.py2hz = pinyin_dict_notone; // 拼音转汉字
    for (var i in pinyin_dict_notone) {
      var temp = pinyin_dict_notone[i];
      for (var j = 0, len = temp.length; j < len; j++) {
        dict.notone[temp[j]] = i; // 不考虑多音字
      }
    }
  }
  // 如果导入了 pinyin_dict_withtone.js
  if (pinyin_dict_withtone) {
    dict.withtone = {};
    var temp = pinyin_dict_withtone.split(',');
    for (var i = 0, len = temp.length; i < len; i++) {
      // 这段代码耗时28毫秒左右，对性能影响不大，所以一次性处理完毕
      dict.withtone[String.fromCharCode(i + 19968)] = temp[i]; // 这里先不进行split(' ')，因为一次性循环2万次split比较消耗性能
    }

    // 拼音 -> 汉字
    if (pinyin_dict_notone) {
      // 对于拼音转汉字，我们优先使用pinyin_dict_notone字典文件
      // 因为这个字典文件不包含生僻字，且已按照汉字使用频率排序
      dict.py2hz = pinyin_dict_notone; // 拼音转汉字
    } else {
      // 将字典文件解析成拼音->汉字的结构
      // 与先分割后逐个去掉声调相比，先一次性全部去掉声调然后再分割速度至少快了3倍，前者大约需要120毫秒，后者大约只需要30毫秒（Chrome下）
      var notone = removeTone(pinyin_dict_withtone).split(',');
      var py2hz = {},
        py, hz;
      for (var i = 0, len = notone.length; i < len; i++) {
        hz = String.fromCharCode(i + 19968); // 汉字
        // = aaa[i];
        py = notone[i].split(' '); // 去掉了声调的拼音数组
        for (var j = 0; j < py.length; j++) {
          py2hz[py[j]] = (py2hz[py[j]] || '') + hz;
        }
      }
      dict.py2hz = py2hz;
    }
  }
})();

export function getPinyin(chinese, splitter = ' ', withtone = false, polyphone = true) {
  if (!chinese || /^ +$/g.test(chinese)) return '';
  splitter = splitter == undefined ? ' ' : splitter;
  withtone = withtone == undefined ? true : withtone;
  polyphone = polyphone == undefined ? false : polyphone;
  var result = [];
  if (dict.withtone) {// 优先使用带声调的字典文件
    for (var i = 0, len = chinese.length; i < len; i++) {
      var pinyin = dict.withtone[chinese[i]];
      if (pinyin) {
        if (!polyphone) {
          pinyin = pinyin.replace(/ .*$/g, ''); // 如果不需要多音字
        }
        if (!withtone) {
          pinyin = removeTone(pinyin); // 如果不需要声调
        }

      }

      if(pinyin) {
        result.push(pinyin.split(splitter));
      } else {
        result.push(chinese[i]);
      }
    }
  } else if (dict.notone) {// 使用没有声调的字典文件
    if (withtone) console.warn('pinyin_dict_notone 字典文件不支持声调！');
    if (polyphone) console.warn('pinyin_dict_notone 字典文件不支持多音字！');
    for (var i = 0, len = chinese.length; i < len; i++) {
      var temp = chinese.charAt(i);
      result.push(dict.notone[temp] || temp);
    }
  } else {
    throw '抱歉，未找到合适的拼音字典文件！';
  }

  for(let i=0;i<result.length;i++) {
    result[i] = simpleUnique(result[i]);
  }
  return result;
}
function simpleUnique(array) {
  var result = [];
  var hash = {};
  for (var i = 0; i < array.length; i++) {
    var key = (typeof array[i]) + array[i];
    if (!hash[key]) {
      result.push(array[i]);
      hash[key] = true;
    }
  }
  return result;
}



export function capitalize(value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
}

/**
 * 
 * @param {*} dyadicArray 2维数组
 * @param {*} index 默认为0,不需要传入参数
 * @param {*} src 默认为空数组,不需要传入参数
 * @param {*} map 默认为空数组,不需要传入参数
 */
function getSpellAllGroup(dyadicArray, index = 0, src = [], map=[]) {
  if(dyadicArray.length <= index) {
    let arr = [];
    for(let item of map) {
      for(let key in item) {
        arr.push(dyadicArray[key][item[key]]);
      }
    }
    src.push(arr.join(""));
    return;
  }
  for(let i=0;i<dyadicArray[index].length;i++) {
    map.push({[index]:i});
    getSpellAllGroup(dyadicArray, index + 1, src, map);
    map.splice(map.length - 1, 1)
  }
  return src;
}

function getMaxStartsWith(src, tag) {
  for(let i = src.length;i > 0;i--) {
    for(let k = tag.length;k > 0;k--) {
      if(src.substring(0, i) == tag.substring(0, k)) {
        return src.substring(0, i);
      }
    }
  }
  return null;
}
/**
 * 
 * @param {*} val 
 * @param {*} item 
 */
export function filterSpell(val, item) {
  let tempVal = val.toLowerCase();
  let count = 0;
  let completeSpellCount = 0;
  let len = item.completeSpell.length;
  let index = 0;

  m:for(let i=0;i<len;i++) {
    tempVal = tempVal.substr(index);
    let completeSpellArr = item.completeSpell[i];
    let simpleSpellArr = item.simpleSpell[i];
    let flag = false;
    for(let e of completeSpellArr) {
      if(tempVal.startsWith(e)) {
        flag = true;
        count ++;
        index = e.length;
        continue m;
      }
    }
    if(!flag) {
      for(let e of simpleSpellArr) {
        if(tempVal.startsWith(e)) {
          flag = true;
          count ++;
          index = e.length;
          continue m;
        }
      }
    }
    
  }
  if(count == len) {
    // console.info("简拼或全拼")
    return true;
  }

  tempVal = val.toLowerCase();
  index = 0;
  count = 0;
  m:for(let i=0;i<len;i++) {
    tempVal = tempVal.substr(index);
    let completeSpellArr = item.completeSpell[i];
    for(let e of completeSpellArr) {
      let maxStartsWithStr = getMaxStartsWith(tempVal, e);
      if(maxStartsWithStr) {
        count ++;
        index = maxStartsWithStr.length;
        continue m;
      }
    }
  }
  if(count == len) {
    // console.info("混拼")
    return true;
  }

  tempVal = val.toLowerCase();
  let completeSpells = getSpellAllGroup(item.completeSpell);
  for(let item of completeSpells) {
    if(~item.indexOf(tempVal)) {
      // console.info("completeSpells")
      return true;
    }
  }
  let simpleSpells = getSpellAllGroup(item.simpleSpell);
  for(let item of simpleSpells) {
    if(~item.indexOf(tempVal)) {
      // console.info("simpleSpells")
      return true;
    }
  }
  return false;
}

/**
 * 获取传入的中文参数的拼音,并给入参增加
 * completeSpell (二维数组每个字的为一维数组,一维数组考虑有多音字所以也为一个数组)
 * ,simpleSpell (二维数组,同上,该字段为汉字的首字母)
 * ,spell (为一个字符串,每个字首字母大写,用于显示,看到显示的拼音不一定对,因为多音字的原因)
 * 三个参数
 * @param {*} val 
 */
export function getSpell(val) {
  let completeSpellArr = getPinyin(val);
  let simpleSpellArr = [];
  let spell = '';
  for(let item of completeSpellArr) {
    
    let tempArr = [];
    for(let e of item) {
      let tempStr = e.substr(0,1);
      if(tempArr.filter(t => t == tempStr).length == 0) {
        tempArr.push(tempStr);
      }
    }
    simpleSpellArr.push(tempArr);
    spell += capitalize(item[0]);//只获取第一个拼音,多音字可能拼写错误
  }
  return {
    'completeSpell':completeSpellArr,
    'simpleSpell':simpleSpellArr,
    'spell':spell,
  }
}