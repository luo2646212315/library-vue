import router from "../router"
import api from '../api/index'
export default {
    install(Vue) {
        Vue.prototype.$imagePath = "/api/library-core/auth/getImage/"
        //检查书籍是否再书架中
        Vue.prototype.$loginCheck = async function () {
            let ss;
            await api.loginCheck().then(res => {
                ss = res;
            });
            return ss;
        }
        //去登陆
        Vue.prototype.$toLogin = () => {
            router.replace({
                path: "/loginRegisterForget/login",
                query: { "redirect": router.currentRoute.fullPath }
            })
        }
        //退出登录
        Vue.prototype.$loginOut = function (userId) {
            api.loginOut(userId).then(() => {
                router.push({
                    path: '/loginRegisterForget/login'
                })
                localStorage.clear();
                this.$store.commit("update", {});
            });
        }
        //检查书籍是否再书架中
        Vue.prototype.$isInBookshelf = async function (userId, bigType, bookName) {
            let ss;
            await api.isInBookshelf(userId, bigType, bookName).then(res => {
                ss = res;
            });
            return ss;
        }
        //添加书籍到书架
        Vue.prototype.$addBookInShelf = async function (bookshelf) {
            var flag = false;
            await api.addBookToBookshelf(bookshelf).then(res => {
                if (res.data[0] === 1) {
                    this.$message({
                        message: res.message,
                        type: "success"
                    });
                    flag = true;
                } else {
                    this.$message.error(res.message);
                }
            });
            return flag;
        }
        Vue.prototype.$NumberMul = function (arg1, arg2) {
            var m = 0;
            var s1 = arg1.toString();
            var s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) {
                //
            }
            try {
                m += s2.split(".")[1].length;
            } catch (e) {
                //
            }
            return (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)).toFixed(2);
        }
        //浮点乘法，保留2位
        Vue.prototype.$NumberAdd = function (arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length
            } catch (e) {
                r1 = 0
            }
            try {
                r2 = arg2.toString().split(".")[1].length
            } catch (e) {
                r2 = 0
            }
            m = Math.pow(10, Math.max(r1, r2))
            return ((arg1 * m + arg2 * m) / m).toFixed(2);
        }
        Vue.prototype.$NumberSub = function (arg1, arg2) {
            var re1, re2, m;
            try {
                re1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                re1 = 0;
            }
            try {
                re2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                re2 = 0;
            }
            m = Math.pow(10, Math.max(re1, re2));
            return ((arg1 * m - arg2 * m) / m).toFixed(2);
        }

    }
}