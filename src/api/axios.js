import axios from 'axios'
axios.defaults.timeout = 20000;//设置超时时间
axios.defaults.withCredentials = true// 允许跨域设置
// 设置反向代理之后axios.defaults.baseURL会与之冲突，所以不能设置它
// axios.defaults.baseURL = 'http://127.0.0.1:3000'



// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(localStorage.getItem('mytoken')){
      config.headers.token = localStorage.getItem('mytoken');
    }
    console.log(config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default axios
