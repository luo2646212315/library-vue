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
/**
 * 数字过滤转万
 * @param {*} val 
 */
export const transFromNumStateFilter = (val) => {
    var s = val;
    if (val >= 10000) {
        var l = val / 10000;
        s = parseFloat(l).toFixed(2) + "万"
    }
    return s;
}
/**
 * 书籍大类别过滤
 * @param {*} val 
 */
export const transFromBookBigTypeFilter = (val) => {
    var s = "休闲娱乐";
    if (val === "01") {
        s = "美文名著";
    }
    return s;
}
/**
 * 审核过滤器，是否通过
 * @param {*} val 
 */
export const transFromCheckFilter = (val) => {
    var s = "未审核";
    if (val === "00") {
        s = "未通过";
    } else if (val === "11") {
        s = "通过";
    }
    return s;
}
/**
 * 账号是否冻结过滤器
 * @param {*} val 
 */
export const transFromEnableFilter = (val) => {
    var s = "否";
    if (val === "00") {
        s = "是";
    }
    return s;
}
/**
 * 书籍是否上架
 * @param {*} val 
 */
export const transFromPutOnFilter = (val) => {
    var s = "是";
    if (val === "00") {
        s = "否";
    }
    return s;
}