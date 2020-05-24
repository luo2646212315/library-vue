import axios from "../assets/axiosX"

const base = {
    //baseUrl: 'http://localhost:9010/api/library-core/'
    baseUrl: '/api/library-core'
}
//登录校验
export const loginCheck = () => {
    return axios.get(base.baseUrl + "/userInfo/loginCheck")
}
//用户本系统登录
export const loginByLocal = (userName, userPassword) => {
    return axios.postFrom(base.baseUrl + "/userInfo/auth/loginByLocal", { userName: userName, userPassword: userPassword })
}
//三方qq登录
export const qqLogin = () => {
    return axios.get(base.baseUrl + "/userInfo/auth/loginByQQ")
}
//退出登录
export const loginOut = (userId) => {
    return axios.get(base.baseUrl + "/userInfo/auth/loginOut", { userId })
}
//检查邮箱是否已经被注册
export const checkEmailExist = params => {
    return axios.get(base.baseUrl + "/userInfo/auth/checkEmailExist", params)
}
//检查昵称是否已经被注册
export const checkUserNickNameExist = params => {
    return axios.get(base.baseUrl + "/userInfo/auth/checkUserNickNameExist", params)
}
//检查手机号是否已经被注册
export const checkUserPhoneNameExist = params => {
    return axios.get(base.baseUrl + "/userInfo/checkUserPhoneNameExist", params)
}
//注册发送邮箱验证码
export const sendEmailCode = email => {
    return axios.postFrom(base.baseUrl + "/userInfo/auth/register/sendEmail", { email: email })
}
//新增用户
export const insertUser = params => {
    return axios.postJson(base.baseUrl + "/userInfo/auth/register/insertUser", params)
}
//修改用户
export const updateUser = params => {
    return axios.put(base.baseUrl + "/userInfo/updateUser", params)
}
//删除用户
export const deleteUser = userId => {
    return axios.delete(base.baseUrl + "/userInfo/deleteUser", { id: userId })
}
//获取书籍类别
export const getBookType = bigType => {
    return axios.get(base.baseUrl + "/book/auth/getBookType", { bigType: bigType })
}
//获取一些娱乐书籍
export const getSomeRecreationBook = num => {
    return axios.get(base.baseUrl + "/book/auth/getSomeRecreationBook", { num: num })
}
//通过书籍名获取娱乐书籍
export const getRecreationBookByName = bookName => {
    return axios.get(base.baseUrl + "/book/auth/getRecreationBookByName", { bookName: bookName })
}
//通过书籍类型获取娱乐列表
export const getRecreationBookByType = (type, pageNo, pageSize) => {
    return axios.get(base.baseUrl + "/book/auth/getRecreationBookByType", { type, pageNo, pageSize })
}
//通过书籍名或者作者获取书籍
export const getBookByNameOrAuthor = (input, pageNo, pageSize) => {
    return axios.get(base.baseUrl + "/book/auth/getBookByNameOrAuthor", { input, pageNo, pageSize })
}
//通过书籍类型获取名著列表
export const getStandardBookByType = (type, pageNo, pageSize) => {
    return axios.get(base.baseUrl + "/book/auth/getStandardBookByType", { type, pageNo, pageSize })
}
//通过书籍名获取名著书籍
export const getStandardBookByName = bookName => {
    return axios.get(base.baseUrl + "/book/auth/getStandardBookByName", { bookName: bookName })
}
//获取名著书籍章节列表
export const getStandardBookChapterByUrl = bookUrl => {
    return axios.get(base.baseUrl + "/book/auth/getStandardBookChapterByUrl", { bookUrl: bookUrl })
}
//获取章节内容
export const getChapterCon = (type, bookUrl, chapterNo) => {
    return axios.get(base.baseUrl + "/book/getChapterCon", { type, bookUrl, chapterNo })
}
//获取名著书籍章节列表
export const getRecreationBookChapterByUrl = bookUrl => {
    return axios.get(base.baseUrl + "/book/auth/getRecreationBookChapterByUrl", { bookUrl: bookUrl })
}
//判断书籍是否在书架
export const isInBookshelf = (userId, bigType, bookName) => {
    return axios.get(base.baseUrl + "/bookshelf/auth/isInBookshelf", { userId, bigType, bookName })
}
//添加书籍到书架
export const addBookToBookshelf = params => {
    return axios.postJson(base.baseUrl + "/bookshelf/addBookToBookshelf", params)
}
//获取章节评论集合
export const getBookCommentList = (bookName, level, chapterNo, parentId) => {
    return axios.get(base.baseUrl + "/bookComment/auth/getBookCommentList", { bookName, level, chapterNo, parentId })
}
//添加新评论
export const addNewBookComment = params => {
    return axios.postJson(base.baseUrl + "/bookComment/addNewBookComment", params)
}
//获取用户娱乐书架
export const getUserRecreationBookshelf = (userId, pageNo, pageSize) => {
    return axios.get(base.baseUrl + "/bookshelf/getUserRecreationBookshelf", { userId, pageNo, pageSize })
}
//获取用户名著书架
export const getUserStandardBookShelf = (userId, pageNo, pageSize) => {
    return axios.get(base.baseUrl + "/bookshelf/getUserStandardBookShelf", { userId, pageNo, pageSize })
}
//校验书籍是否存在,返回书籍类型
export const checkBookExist = (bigType, bookName) => {
    return axios.get(base.baseUrl + "/book/auth/checkBookExist", { bigType, bookName })
}
//上传名著书籍
export const uploadStandardBook = params => {
    return axios.postMultipart(base.baseUrl + "/uploadStandardBook", params)
}
//上传名著书籍
export const uploadRecreationBook = params => {
    return axios.postMultipart(base.baseUrl + "/uploadRecreationBook", params)
}
//获取用户上传信息
export const selectUploadByOther = params => {
    return axios.postFrom(base.baseUrl + "/userBook/selectUploadByOther", params)
}
//获取用户列表
export const getUserInfoList = (userName, isEnable, pageNo, pageSize) => {
    return axios.get(base.baseUrl + "/userInfo/getUserInfoList", { userName, isEnable, pageNo, pageSize })
}
//多条件查询名著
export const getStandBookBySearch = (params, pageNo, pageSize) => {
    return axios.postJson(base.baseUrl + "/book/getStandBookBySearch/" + pageNo + "/" + pageSize, params)
}
//修改名著
export const updateStandard = params => {
    return axios.put(base.baseUrl + "/book/updateStandard", params)
}
//删除名著
export const deleteStandard = bookName => {
    return axios.delete(base.baseUrl + "/book/deleteStandard", bookName)
}
//多条件查询娱乐书籍
export const getRecreationBySearch = (params, pageNo, pageSize) => {
    return axios.postJson(base.baseUrl + "/book/getRecreationBySearch/" + pageNo + "/" + pageSize, params)
}
//修改娱乐书籍
export const updateRecreation = params => {
    return axios.put(base.baseUrl + "/book/updateRecreation", params)
}
//删除娱乐书籍
export const deleteRecreation = bookName => {
    return axios.delete(base.baseUrl + "/book/deleteRecreation", bookName)
}
//分页查询用户上传信息
export const selectUploadBySearch = (params, pageNo, pageSize) => {
    return axios.postJson(base.baseUrl + "/userBook/selectUploadBySearch/" + pageNo + "/" + pageSize, params)
}
//更新用户上传信息
export const updateUserUpload = params => {
    return axios.put(base.baseUrl + "/userBook/updateUserUpload", params)
}
//检查用户是否拥有该书籍
export const checkUserHaveBook = (bookName, bigType, userId) => {
    return axios.get(base.baseUrl + "/userBook/checkUserHaveBook", { bookName, bigType, userId })
}
//获取用户钱包信息
export const getUserWalletByUserId = userId => {
    return axios.get(base.baseUrl + "/userInfo/getUserWalletByUserId", { userId })
}
//更新书架
export const updateBookshelf = params => {
    return axios.put(base.baseUrl + "/bookshelf/updateBookshelf", params)
}
//移除书架
export const deleteBookFromBookshelf = (bookShelfIds) => {
    return axios.postFrom(base.baseUrl + "/bookshelf/deleteBookFromBookshelf", bookShelfIds)
}
