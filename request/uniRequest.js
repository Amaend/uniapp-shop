// utils/http.js
// 导入vuex
import store from '@/store/store.js'
export const http = (config,showLoading = true) => {
    // 定义基础接口
    const baseUrl='https://api-hmugo-web.itheima.net/api/public/v1/'
    config.url=baseUrl+config.url
  // 请求拦截
  if (showLoading) {
    uni.showLoading({ title: '加载中...' })
    if(config.url.indexOf('/my')!==-1){
        config.header={ Authorization:store.state.userStore.token }
    }
    console.log(config)
  }
  // 返回一个Promise对象，用于处理请求结果
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      success: res => {
        // 响应拦截
        if (showLoading) {
          uni.hideLoading()
        }
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error('请求失败'))
        }
      },
      fail: err => {
        if (showLoading) {
          uni.hideLoading()
        }
        reject(err)
      }
    })
  })
}
