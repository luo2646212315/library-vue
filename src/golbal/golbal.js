import router from "../router"
import api from '../api/index'
export default {
    install(Vue) {

        Vue.prototype.$loginOut = function (userId) {
            api.loginOut(userId).then(() => {
                router.push({
                    path: '/loginRegisterForget/login'
                })
                localStorage.clear();
                this.$store.commit("update", {});
            });
        }
        Vue.prototype.$logi = function () {
            console.log('Plugin Test11')
        }

    }
}