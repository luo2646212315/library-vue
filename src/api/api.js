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
export const checkEmailExist = params =>{
    return axios.get(base.baseUrl+"/userInfo/auth/register/checkEmailExist",{params:params})
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