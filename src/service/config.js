import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';  //消息提示
import { Loading } from 'element-ui';
import router from '../router/index';
import { setStore } from "@/utils/globalSession";

//全局设置 Global axios defaults
axios.defaults.timeout = 300000;         //超时设置

// let loadingOptions=null;
// let loadingOptions={
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//   customClass:'loading',
// }
// let loadingInstance = null;
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前  loading
//   console.info(config)
//   loadingInstance=Loading.service(loadingOptions);
//   return config;
// }, function (error) {
//   //请求错误
//   return Promise.reject(error);
// });

// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     //响应后  去loading
//     console.info(response)
//     setTimeout( ()=>{
//       loadingInstance.close();
//     });
//     return response;
//   }, function (error) {
//     // 响应错误
//     return Promise.reject(error);
// });


//Promise请求
/*
  url:请求地址(后缀)
  params:参数
  successCallback:成功请求时的回调函数.(第一个参数只会是data数据, 第二个为result数据)
  callback:无论请求成功失败都会调用的回调函数(第一个为result数据)
  type:为请求方式post和get2种
  contentType:如果需要使用json传参则type必须为post请求.
  defalutValue:为后端返回业务异常或系统异常时给data数据的默认值.(减少非空判断时使用的)
*/
export default async(url, params={},successCallback, callback,type='post', cacheName = null, contentType = null) =>{
  // params['loading'] = false;
  let defalutValue = null;
   return new Promise((resolve, reject) => {
    //公共请求参数
    // let defaultParams = {
    //   "userId": getFromSession("userId") ? getFromSession("chainId") : undefined,
    // };
    // Object.assign(defaultParams, params);   
      
    // 前端请求设置，不发后台接口
    const $config = params.$config || {};
    delete params.$config;
    
    let finalPath = '';
    if (type == 'get') {
        finalPath=url+'?' + qs.stringify(params);
        params = null;
    } else {
      if(contentType) {
        finalPath=url;
      } else {
        // finalPath=url+'?' + qs.stringify(params);
        finalPath=url;
      }
    }
    // params.loading = true;
		axios({
      baseURL:'', //请求基本路径
		  method: type,
		  url:finalPath,
      data:JSON.stringify(params),
      headers: {
        // 'Content-Type': (contentType == 'json' ? 'application/json' : 'text/plain') + ';charset=UTF-8'
        'Content-Type': (type == 'post' ? 'application/json' : 'text/plain') + ';charset=UTF-8'
      }
		})
		.then(response => {
          /**请求响应后处理**/
          // loadingOptions = params.loading = false;
          callback && callback(response.data);   //回调
          if(response.data.Result || $config.noop || response.data.code == 'SUCCESS' || response.data.FindCrmDictKeyValueResult) {
            if(cacheName) {
              setStore(cacheName, JSON.parse(JSON.stringify(response.data.Data))); //深克隆,避免缓存的数据的和使用的数据指向同一块内存而影响缓存的数据.
            }
            if(response.data.Result) {
              successCallback && successCallback(response.data.Data, response.data);   //回调
            }else if(response.data.FindCrmDictKeyValueResult) {
              successCallback && successCallback(response.data.FindCrmDictKeyValueResult, response.data);   //回调
            }else {
              successCallback && successCallback(response.data.data, response.data);   //回调
            }
            
          } else if(response.data.Result=='AUTH') {
              //返回状态码 标表示没有登录 跳到登录页面
              router.push({name: 'login'});
          } else if(response.data.Result=='BIZ') {
              Message({
                  message: (response.data.message || '未知错误!'),
                  type: 'warning',
                  dangerouslyUseHTMLString:true,
                  showClose: true
              });
              console.warn(`url：${url}.`);
              console.warn(`msg：${response.data.message}.`);
              successCallback && successCallback(defalutValue, response.data);   //回调
              // callback && callback(response.data.data, response.data);
          } else if(!response.data.Result) {
            Message({
              message: response.data.ErrorMsg,
              type: 'error',
              dangerouslyUseHTMLString:true,
              showClose: true
            });
            successCallback && successCallback(defalutValue, response.data);   //回调
            console.error(`url：${url}.`);
            console.error(`msg：${response.data.message}.`);
            // callback && callback(response.data.data, response.data);
          } else {
             if(response.data.message){
                Message({
                    message: response.data.message,
                    type: 'error',
                    showClose: true
                });
             }
             successCallback && successCallback(defalutValue, response.data);   //回调
            //  callback && callback(response.data.data, response.data);
          }
          /**请求响应后处理 end**/
        }, err => {
          // callback && callback(err);   //回调
          console.error('err', err);
          // loadingOptions = params.loading = false;
          // loadingInstance.close();
          Message({
            message: `url：${url}.<br/>err message：${err}.`,
            type: 'error',
            dangerouslyUseHTMLString:true,
            showClose: true
          });       
          reject(err);
        })
        .catch((error) => {
          // loadingOptions = params.loading = false;
          // callback && callback(error);   //回调
          console.error('error', error);
          // loadingInstance.close();
          // Message({
          //   message: `url：${url}.<br/>error message：${error}.`,
          //   type: 'error',
          //   dangerouslyUseHTMLString:true,
          //   showClose: true
          // });
          reject(error)       
        });
   });
}



