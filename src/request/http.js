import axios from "axios";
// import QS from 'qs';
import { Loading } from 'element-ui';
axios.defaults.baseURL = 'http://118.31.236.49:7901/export'
axios.defaults.timeout =  10 * 1000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
// axios.defaults.withCredentials = true;

const ajax = axios.create({
    baseURL: "http://118.31.236.49:7901/export", //这里引入后端接口地址
    headers: { "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"}
  });


//http request 拦截器
ajax.interceptors.request.use(config => {
    // Loading.service("加载中...");
    return config;
  },
  error => {
    return Promise.reject(error);
  });

  ajax.interceptors.response.use(resp => {
    // Loading.close();
    // console.log(resp)
    if (resp.code == 200) {
      return resp;
    } else {
      this.$message({
        message: resp.message, //这是后端返回的一个错误信息或者根据后端返回的错误码生成一个错误信息
        type: 'error'
      });
    }
  });

  /**
 * 封装get方法
 * @param url 请求的url地址
 * @param data 请求时携带的参数
 * @returns {Promise}
 */

export function get(url,params={}){
  let loadingInstance = Loading.service({
    text: '请稍等',
    target: document.querySelector('.el-container')
});
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:encodeURIComponent(params)
    })
    .then(response => {
      loadingInstance.close();
      resolve(response.data);
    })
    .catch(err => {
      loadingInstance.close();
      reject(err)
    })
  })
}


/**
 * 封装post请求
 * @param url 请求的url地址
 * @param data 请求时携带的参数
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
            resolve(response.data);
          },err => {
            reject(err)
          })
   })
 }

/**
 * 封装delete请求
 * @param url 请求的url地址
 * @param data 请求时携带的参数
 * @returns {Promise}
 */

 export function deleteInfo(url,data={}){
  return new Promise((resolve,reject) => {
    axios.delete(url,data)
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err);
    })
  })
}

/**
 * 封装put请求
 * @param url 请求的url地址
 * @param data 请求时携带的参数
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

  