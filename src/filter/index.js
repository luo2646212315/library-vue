/**
 * 现实最大文字全局过滤器，并填充......
 * @param {*} val 
 * @param {*} num 最大展示数量
 * 
 */
export const maxTextFillFilter = (val, num) => {
    var s = val;
    if (val && val.length > num) {
        s = val.substring(0, num) + "......"
    }
    return s;
}
/**
 * 现实最大文字全局过滤器
 * @param {*} val 
 * @param {*} num 最大展示数量
 */
export const maxTextFilter = (val, num) => {
    return val.substring(0, num);
}
/**
 *  书籍状态转化过滤器
 * @param {*} val 
 */
export const transFromBookStateFilter = (val) => {
    var s = "完结";
    if (val === "11") {
        s = "连载";
    }
    return s;
}

export const transFromNumStateFilter = (val) => {
    var s = val;
    if (val >= 10000) {
        var l = val / 10000;
        s = parseFloat(l).toFixed(2)+"万"
    }
    return s;
}