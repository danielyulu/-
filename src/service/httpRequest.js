import fetch from './config'
import { getFromSession } from "@/utils/globalSession";
import { clone } from "@/utils/objectUtil";


// 用户登陆		http://localhost:8889/callcenter/auth/login?username=admin&password=123456
export const login = function (params,successCallback,callback) {
	fetch('/ReportIndexSvc/ReportIndex/ReportUserLogin', params,successCallback, callback, 'post');
};

// 用户退出		http://localhost:8889/callcenter/auth/logout
export const logout = function (params,successCallback,callback) {
	fetch('callcenter/auth/logout', params,successCallback, callback, 'get');
};

function cache(cacheName,successCallback,callback) {
	let tempData = getFromSession(cacheName);
	if(tempData) {
		callback && callback(null);
		successCallback && successCallback(JSON.parse(JSON.stringify(tempData)), null);
		return true;
	}
	return false;
}
