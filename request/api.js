// 在页面中的某个组件中
import { http } from './uniRequest.js'
// 获取轮播图数据的接口
export const reqGetSwiperList=()=>{
   return http({
       url:'home/swiperdata',
       method:'GET'
   })
}
// 定义获取分类导航的数据列表的接口
export const reqGetNavList=()=>{
    return http({
        url:'home/catitems',
        method:'GET'
    })
}
// 定义楼层的数据接口
export const reqGetFloorList=()=>{
    return http({
        url:'home/floordata',
        method:'GET'
    })
}
// 定义获取分类数据的接口
export const reqGetCateList=()=>{
    return http({
        url:'categories',
        method:'GET'
    })
}
// 定义搜索结果的接口函数
export const reqGetSearchList=data=>{
    return http({
        url:'goods/qsearch',
        method:'GET',
        data:{ query:data }
    })
}
// 定义商品列表的搜索接口
export const reqGetGoodsList=data=>{
    return http({
        url:'goods/search',
        method:'GET',
        data:{ ...data }
    })
}
//定义商品详细信息的接口
export const reqGetGoodsDetail=id=>{
    return http({
        url:'goods/detail',
        method:'GET',
        data:{ goods_id:id }
    })
}
// 创建用户登录接口
export const reqUserLogin=userinfo=>{
    return http({
        url:'users/wxlogin',
        method:'POST',
        data:{ ...userinfo }
    })
}
// 创建订单的接口函数
export const reqPayOrder=orderinfo=>{
    return http({
        url:'my/orders/create',
        method:'POST',
        data:{ ...orderinfo }
    })
}
// 创建预支付的接口函数
export const reqPrePay=ordernumber=>{
    return http({
        url:'my/orders/req_unifiedorder',
        method:'POST',
        data:{ order_number:ordernumber }
    })
}
// 创建订单支付的接口函数
export const reqPayOver=ordernumber=>{
    return http({
        url:'my/orders/chkOrder',
        method:'POST',
        data:{ order_number:ordernumber }
    })
}