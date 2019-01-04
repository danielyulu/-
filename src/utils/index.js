export const evt = {
  // 添加事件
  add(elem, type, callback) {
    if (suports.is('addEventListener')) {
      elem.addEventListener(type, callback, false);
    }
    else {
      elem.attachEvent('on' + type, callback);
    }

    return () => {
      evt.remove(elem, type, callback);
    };
  },

  // 移除事件
  remove(elem, type, callback) {
    if (suports.is('removeEventListener')) {
      elem.removeEventListener(type, callback);
    }
    else {
      elem.detachEvent('on' + type, callback);
    }
  },

  // 修正事件
  fix(event) {
    event = event || window.event;

    if (!event.target) {
      event.target = event.srcElement;
    }

    if (!event.stopPropagation) {
      event.stopPropagation = () => {
        event.cancelBubble = true;
      };
    }

    if (!event.preventDefault) {
      event.preventDefault = () => {
        event.returnValue = false;
      };
    }

    return event;
  },

  // 事件委托
  delegate() {

  }
};


export const suports = {
  is() {
    return true;
  }
};  


// 转换条件 数据
export const toOptions = (arr, id = 'value', name = 'label', addTo = {}) => {
  let ret = [];
  arr.forEach(item => {
      ret.push({
        value: item[id],
        label: item[name],
        ...addTo
      });
  })
  return ret;
}