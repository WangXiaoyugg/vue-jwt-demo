import axios from 'axios';

// 每个请求的拦截器方法不一样
class AjaxRequest {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '/'
    this.timeout = 5000
  }

  request(config) {
    let instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout,
    })
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = localStorage.getItem('token')
      return config
    }, err => Promise.reject(err))

    instance.interceptors.response.use(res => {
      return res.data
    }, err => Promise.reject(err))
    return instance(config)
  }
}



export default new AjaxRequest();
