<template>
    <view class="my-settle-container">
        <!-- 全选 -->
        <label class="radio">
            <radio :checked="isTotalChecked" @click="allGoodsChecked" color="#c00000" /><text>全选</text>
        </label>
        <!-- 合计 -->
        <view class="amount-box">
            <text class="amount">合计：￥{{checkedGoodsAmount}}</text>
        </view>
        <!-- 结算按钮 -->
        <button type="warn" class="btn-settle" @click="settleHandler">结算（{{checkedGoodsNum}}）</button>
    </view>
</template>

<script>
    // 导入接口
    import { reqPayOrder,reqPrePay,reqPayOver } from '../../request/api.js'
    // 导入vuex
    import { mapGetters,mapMutations,mapState } from 'vuex'
    export default {
        name:'my-settle',
        data() {
            return { second:3 }
        },
        computed:{
            // 计算合计
            ...mapState('carStore',['carData']),
            ...mapGetters('carStore',['checkedGoodsNum','total','checkedGoodsAmount']),
            ...mapGetters('userStore',['userAddress']),
            ...mapState('userStore',['token']),
            // 计算全选
            isTotalChecked(){
                return this.total===this.checkedGoodsNum
            }
         },
         methods:{
             ...mapMutations('carStore',['updataAllGoodsState']),
             ...mapMutations('userStore',['updataRedirect']),
             allGoodsChecked(){
                 this.updataAllGoodsState(!this.isTotalChecked)
             },
             // 点击结算的处理函数
             settleHandler(){
                 if(!this.checkedGoodsNum) return uni.showToast({
                     mask:true,
                     title:'请选择结算的商品',
                     icon:'none'
                 })
                 if(!this.userAddress) return uni.$showMsg('请选择收货地址')
                 if(!this.token) return this.delayNavigate()
                 // 创建订单的处理函数
                 this.payOrder()
             },
             // 定义三秒后自动跳转登录处理函数
             showTips(n){
                 uni.showToast({
                     duration:1500,
                     title:'请登录后再结算'+n+'秒后自动跳转',
                     icon:'none',
                     mask:true
                 })
             },
             // 延时跳转的处理函数
             delayNavigate(){
                 this.showTips(this.second)
                 const timer = setInterval(()=>{
                     this.second--,
                     this.showTips(this.second)
                     if(this.second<=0){
                         uni.switchTab({ 
                             url:'/pages/user/user',
                             success:()=>{
                                 this.updataRedirect({
                                     openType:'switchTab',
                                     from:'/pages/cart/cart'
                                 })
                             }
                         
                            }
                          )
                         clearInterval(timer)
                         this.second=3
                         return
                     }
                 },1000)
             },
             async payOrder(){
                 const orderInfo={
                     // 用户价格
                     // order_price:this.checkedGoodsAmount
                     order_price:0.01,
                     // 用户地址
                     consignee_addr:this.userAddress,
                     // 用户商品
                     order:this.carData.filter(item=>item.goods_state).map(x=>({
                         goods_id:x.goods_id,
                         goods_number:x.goods_count,
                         goods_price:x.goods_price
                     }))
                 }
                 // 发起网络请求
                 const res = await reqPayOrder(orderInfo)
                 if(res.meta.status!==200) return uni.$showMsg('创建订单失败')
                 const orderNumber = res.message.order_number
                 const reslut = await reqPrePay(orderNumber)
                 if(reslut.meta.status!==200) return uni.$showMsg('创建预支付失败')
                 // console.log(reslut)
                 const payInfo=reslut.message.pay
                 console.log(payInfo)
                 const [err,succ] = await uni.requestPayment(payInfo)
                 console.log(err)
                 if(err) return uni.$showMsg('订单未支付')
                 const payReslut = await reqPayOver(orderNumber)
                 if(payReslut.meta.status!==200) uni.$showMsg('订单未支付')
                 uni.showToast({
                     title:'订单支付成功',
                     icon:'success'
                 })
             }
         }
    }
</script>

<style lang="scss">
.my-settle-container{
    z-index: 999;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color:#fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    font-size: 14px;
    .radio{
        display: flex;
        align-items: ce;
    }
    .amount-box{
        color: #c00000;
        font-weight: bold;
    }
    .btn-settle{
        height: 50px;
        border-radius: 0;
        font-size: 14px;
        line-height: 50px;
        text-align: center;
        margin: 0;
    }
}
</style>