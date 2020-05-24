import axios from 'axios'
import router from "../router"
//跳转登录页面
const toLogin = () => {
    router.replace({
        path: "/loginRegisterForget/login",
        query: { "redirect": router.currentRoute.fullPath }
    })
}
//错误信息处理
const handel = (res) => {
    var code = res.data.code;
    var message = res.data.message;
    switch (code) {
        case 401:
            //去登陆
            console.log("认证失败");
            break;
        case 402:
            //去登陆
            toLogin();
            break;
        case 403:
            break;
        case 404:
            console.log(message);
            break;
    }
}

//创建axios实例
var instance = axios.create({ timeout: 5000 });
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('library-token');
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    //请求成功
    res => {
        handel(res);
        return res;
    },
    //请求失败
    error => {
        return error;
    }
);

export default instance