import router from "../router"
export default {
    install(Vue) {
        var user = localStorage.getItem("user");
        var isLogin = false;
        var isAdmin = false;
        var userInfo;
        if (user) {
            isLogin = true;
            userInfo = JSON.parse(user)
            if (userInfo.userRole === "00") {
                isAdmin = true;
            }
        }
        Vue.prototype.$userInfo = userInfo;
        Vue.prototype.$isLogin = isLogin;
        Vue.prototype.$isAdmin = isAdmin;
        Vue.prototype.$loginOut = function () {
            localStorage.clear();
            router.push({
                path: '/loginRegisterForget'
            })
        }
        Vue.prototype.$logi = function () {
            console.log('Plugin Test11')
        }

    }
}