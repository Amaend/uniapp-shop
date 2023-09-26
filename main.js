import App from './App'
import Vue from 'vue'
import store from './store/store.js'
// 封装弹窗的方法
uni.$showMsg=(title='数据加载失败',duration=1500)=>{
    uni.showToast({
        title,
        duration,
        icon:'none'
    })
}

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({ ...App,store })
app.$mount()