export default{
  install(Vue,options) {
    //校验身份证号码的主调用
    Vue.prototype.validIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

    //验证手机
    Vue.prototype.verifyPhone = /^1[3-9]{1}[0-9]{9}$/;


    //校验  数字最多带2位小数点
    Vue.prototype.verifyMoney = /^\d+\.{0,1}(\d{1,2})?$/;

    //校验 邮箱
    Vue.prototype.verifyEmail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;

    //验证是否是数字
    Vue.prototype.verifyNum = /^\d+$/;

    // Vue.prototype.verifyIdentificationNo = function (idNo) {
    //   //校验 纳税人识别号 只能是15位、18位、20位字母或者数字
    //   const reg15= /^[0-9a-zA-Z]{15}$/g;
    //   const reg18= /^[0-9a-zA-Z]{18}$/g;
    //   const reg20= /^[0-9a-zA-Z]{20}$/g;


    //   if(idNo && !reg15.test(idNo) && !reg18.test(idNo) && !reg20.test(idNo)) {
    //     return false
    // 　}else{
    //     return true;
    //   }
    // };

  }
}

// function validId18(_id) {
//   return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(_id);

//   // debugger
//   _id = _id + "";
//   var _num = _id.substr(0, 17);
//   var _parityBit = _id.substr(17);
//   var _power = 0;
//   for (var i = 0; i < 17; i++) {
//     //校验每一位的合法性
//     if (_num.charAt(i) < 0 || _num.charAt(i) > 9) {
//       return false;
//       break;
//     } else {
//       //加权
//       _power += parseInt(_num.charAt(i)) * parseInt(powers[i]);
//       //设置性别
//       if (i == 16 && parseInt(_num.charAt(i)) % 2 == 0) {
//         sex = "female";
//       } else {
//         sex = "male";
//       }
//     }
//   }
//   //取模
//   var mod = parseInt(_power) % 11;
//   if (parityBit[mod].toUpperCase() == _parityBit.toUpperCase()) {
//     return true;
//   }
//   return false;
// }
// //校验15位的身份证号码
// function validId15(_id) {

//   return /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/.test(_id);

//   _id = _id + "";
//   for (var i = 0; i < _id.length; i++) {
//     //校验每一位的合法性
//     if (_id.charAt(i) < '0' || _id.charAt(i) > '9') {
//       return false;
//       break;
//     }
//   }
//   var year = _id.substr(6, 2);
//   var month = _id.substr(8, 2);
//   var day = _id.substr(10, 2);
//   var sexBit = _id.substr(14);
//   //校验年份位
//   if (year < '01' || year > '90') return false;
//   //校验月份
//   if (month < '01' || month > '12') return false;
//   //校验日
//   if (day < '01' || day > '31') return false;
//   //设置性别
//   if (sexBit % 2 == 0) {
//     sex = "female";
//   } else {
//     sex = "male";
//   }
//   return true;
// }

