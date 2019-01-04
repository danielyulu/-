import {
    getFromSession
} from '@/utils/globalSession';

export default{
    install(Vue,options) {
        Vue.prototype.isPermission = function (value) {
            console.log(value)
            if(!value) {
                return false;
            }
            let permissionPage = getFromSession('permission-page', 'json') || {};
            return !!permissionPage[value];
        }
        Vue.prototype.getGroupAll = function (val, reg, group) {
            let tempArr = [];
            if(reg.test(val)) {
                for(let item of group) {
                    tempArr.push(RegExp['$' + item]);
                }
            }
            return tempArr;
        }
    }
}