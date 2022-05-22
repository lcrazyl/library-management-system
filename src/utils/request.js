import axios from 'axios'


/**
 * 封装axios，实现发送/响应接口的拦截，来实现统一提示等效果
 */

const error = () => {

}
let loading
const startLoading = () => {

}
const endLoading = () => {
  loading.close()
}

const service = axios.create({
  baseURL: 'http://rap2api.taobao.org/app/mock/302193',
  timeout: 5000 // 请求超时时间限制
})

// 请求拦截器
service.interceptors.request.use(
  config => {

    return config
  },
  err => {
 
    error()
    Promise.reject(err)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {

    return response.data
  },
  err => {

    error()
    return Promise.reject(err)
  }
)

export default service
