import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const getLogin = () => {
    let user = localStorage.getItem('user') || '';
    if (user !== "") {
        return true;
    }
    return false;
}
const getUser = () => {
    let user = localStorage.getItem('user') || '';
    if (user !== "") {
        let userInfo = JSON.parse(user);
        return userInfo;
    }
    return {};
}
const getAdmin = () => {
    let user = localStorage.getItem('user') || '';
    if (user !== "") {
        let userInfo = JSON.parse(user);
        if (userInfo.userRole === "00") {
            return true;
        }
    }
    return false;
}
const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        isLogin: getLogin(),
        isAdmin: getAdmin(),
        userInfo: getUser()
    },
    mutations: {
        update(state, userInfo) {
            if (JSON.stringify(userInfo) !== '{}') {
                state.isLogin = true;
                state.userInfo = userInfo;
                if (userInfo.userRole === "00") {
                    state.isAdmin = true;
                }
                localStorage.setItem("user", JSON.stringify(userInfo));
            } else {
                state.isLogin = false;
                state.isAdmin = false;
                state.userInfo = {};
            }
        }
    },
    getters: {

    }
})

export default store