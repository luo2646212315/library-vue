/**
* http.js
* 封装axios，
* 调用方法:
* http.get('/api/enquiry/web/query',{id:1}).then((res)=>{你的操作})
* http.post('/api/enquiry/web/update',{id:1}).then((res)=>{你的操作})
* http.postFormData('/api/enquiry/web/update',{id:1,file:file}).then((res)=>{你的操作})
*/
import axios from './http'
import qs from 'querystring'
export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  /**
   * post方法，对应post请求,表单提交
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  postFrom(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * post方法，对应post请求，json提交
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  postJson(url, params) {
    return new Promise((resolve, reject) => {
      axios.post(url, JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * postMultipart方法，对应post请求，用来提交文件+数据
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  postMultipart(url, params) {
    return new Promise((resolve, reject) => {
      axios({
        headers: {
          'Content-Type': 'multipart/form-data'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
        },
        // transformRequest: [function (data) { // 在请求之前对data传参进行格式转换
        //   const formData = new FormData()
        //   Object.keys(data).forEach(key => {
        //     formData.append(key, data[key])
        //   })
        //   return formData
        // }],
        url,
        method: 'post',
        data: params
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  },
  /**
   * put方法，对应put请求，json提交
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  put(url, params) {
    return new Promise((resolve, reject) => {
      axios.put(url, JSON.stringify(params), {
        headers: {
          'Content-Type': 'application/json'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * delete方法，对应delete请求，用来提交文件+数据
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios.delete(url, { params }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'// ;boundary=----WebKitFormBoundaryQ6d2Qh69dv9wad2u
        }
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}