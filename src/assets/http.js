import axios from 'axios'
import router from "../router"

//跳转登录页面
const toLogin = () => {
    router.push({
        path: '/loginRegisterForget'
    })
}

//错误信息处理
const errorHandel = (status, other) => {
    switch (status) {
        case 400:
            console.log("信息校验失败");
            break;
        case 401:
            //去登陆
            toLogin();
            console.log("认证失败");
            break;
        case 404:
            console.log("请求的资源不存在");
            break;
        default:
            console.log(other);
            break;
    }
}
//创建axios实例
var instance = axios.create({ timeout: 5000 });
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(function (config) {
    console.log(config);
    config.headers.Authorization = localStorage.getItem('library-token');
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    //请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    //请求失败
    error => {
        const { response } = error;
        if (response) {
            errorHandel(response.status, response.data.messsage);
            return Promise.reject(response);
        } else {
            console.log("断网了");
        }
    }
);

export default instance