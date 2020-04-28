/**
 * 现实最大文字全局过滤器
 * @param {*} val 
 * @param {*} num 最大展示数量
 */
export const maxTextFilter = (val, num) => {
    return val.substring(0, num) + "...";
}