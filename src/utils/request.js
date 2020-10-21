import axios from 'axios';

const requset = axios.create({
    // baseURL: '/dev-api',
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000 //请求超时，5000毫秒

})

//请求拦截器
requset.interceptors.request.use(config => {
    //请求拦截
    return config
}, error => {
    //出现异常
    return Promise.reject(error);
})

//响应拦截器
requset.interceptors.request.use(response => {
    return response
}, error => {
    return Promise.reject(error);
})

export default requset //导出自定义创建的axios 对象