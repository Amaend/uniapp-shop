export default{
    // 开启命名空间
    namespaced:true,
    state:{ 
            address:JSON.parse(uni.setStorageSync('address')||'{}'),
            userInfo:JSON.parse(uni.setStorageSync('userInfo')||'{}'),
            token:uni.setStorageSync('token')||'',
            redirectInfo:null
         } ,
    mutations:{
        // 转存token
        updataUserToken(state,token){
            state.token=token
            uni.setStorageSync('token',JSON.stringify(state.token)) 
        },
        // 更新用户地址
        updataAdress(state,address){
            state.address=address
            this.commit('userStore/saveAddressToStorage')
        },
        // 转存到本地存储
        saveAddressToStorage(state){
            uni.setStorageSync('address',JSON.stringify(state.address)) 
        },
        // 定义userInfo的函数
        updataUserInfo(state,userinfo){
            state.userInfo=userinfo
            uni.setStorageSync('userInfo',JSON.stringify(state.userInfo)) 
        },
        // 进行重定向
        updataRedirect(state,info){
            state.redirectInfo=info
            console.log(state.redirectInfo)
        }
    },
    getters:{
        userAddress(state){
            if(!state.address.provinceName) return
            return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
        }
    },
}