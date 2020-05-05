import axios from "../assets/axiosX"

const base = {
    //baseUrl: 'http://localhost:9010/api/library-core/'
    baseUrl: '/api/library-core'
}

//用户本系统登录
export const loginByLocal = (userName,userPassword) =>{
    return axios.postFrom(base.baseUrl+"/userInfo/auth/loginByLocal", { userName:userName,userPassword:userPassword })
}
//三方qq登录
export const qqLogin = () =>{
    return axios.get(base.baseUrl+"/userInfo/auth/loginByQQ")
}
//检查邮箱是否已经被注册
export const checkEmailExist = params =>{
    return axios.get(base.baseUrl+"/userInfo/auth/checkEmailExist",params)
}
//检查昵称是否已经被注册
export const checkUserNickNameExist = params =>{
    return axios.get(base.baseUrl+"/userInfo/auth/checkUserNickNameExist",params)
}
//检查手机号是否已经被注册
export const checkUserPhoneNameExist = params =>{
    return axios.get(base.baseUrl+"/userInfo/checkUserPhoneNameExist",params)
}
//注册发送邮箱验证码
export const sendEmailCode = email =>{
    return axios.postFrom(base.baseUrl+"/userInfo/auth/register/sendEmail",{email:email})
}
//新增用户
export const insertUser = params =>{
    return axios.postJson(base.baseUrl+"/userInfo/auth/register/insertUser",params)
}
//修改用户
export const updateUser = params =>{
    return axios.put(base.baseUrl+"/userInfo/updateUser",params)
}
//删除用户
export const deleteUser = userId =>{
    return axios.delete(base.baseUrl+"/userInfo/deleteUser",{userId:userId})
}
//获取书籍类别
export const getBookType = bigType =>{
    return axios.get(base.baseUrl+"/book/auth/getBookType",{bigType:bigType})
}
//获取一些娱乐书籍
export const getSomeRecreationBook = num =>{
    return axios.get(base.baseUrl+"/book/auth/getSomeRecreationBook",{num:num})
}
//通过书籍名获取娱乐书籍
export const getRecreationBookByName = bookName =>{
    return axios.get(base.baseUrl+"/book/auth/getRecreationBookByName",{bookName:bookName})
}
//通过书籍类型获取名著
export const getStandardBookBookByType = (type,pageNo,pageSize) =>{
    return axios.get(base.baseUrl+"/book/auth/getStandardBookBookByType",{type,pageNo,pageSize})
}
