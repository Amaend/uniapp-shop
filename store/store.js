// 导入vue
import Vue from 'vue'
// 导入vuex 
import Vuex from 'vuex'
// 导入car模块
import carStore from './car.js'
// 导入user模块
import userStore from './user.js'
// 使用vuex
Vue.use(Vuex)
// 导出配置对象
export default new Vuex.Store({
    modules: { 
        carStore,
        userStore 
        },
    })