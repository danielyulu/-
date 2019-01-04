/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content != 'string') {
		content = JSON.stringify(content);
	 }
	window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.sessionStorage.getItem(name);
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.sessionStorage.removeItem(name);
}

/**
 * 删除一组sessionStorage
 */
export const removeStores = names => {
	if (!names && names.length > 0) return;
	for(let name of names) {
		window.sessionStorage.removeItem(name);
	}
}

/**
 * 按名称前缀匹配删除sessionStorage
 */
export const removeAllStores = name => {
	for(let item in window.sessionStorage) {
		if(item.startsWith(name)) {
			window.sessionStorage.removeItem(item);
		}
	}
}

export const isExist = name => {
	if(!name) {
		return false;
	}
	return !!window.sessionStorage[name];
}

//根据type 获取sessionStorage值 json
export function getFromSession(name,type='json') {
	if( type =='string'){
		return window.sessionStorage.getItem(name) || '';
	} else if(type == 'number') {
		return Number(window.sessionStorage.getItem(name));
	} else if(type == 'array') {
		return JSON.parse(window.sessionStorage.getItem(name)) || [];
	} else if(type == 'json') {
		return JSON.parse(window.sessionStorage.getItem(name)) || null;
	} else {
		return window.sessionStorage.getItem(name);
	}
}

//清除所有clearStore缓存的数据.
export function clearStore() {
	sessionStorage.clear();
}