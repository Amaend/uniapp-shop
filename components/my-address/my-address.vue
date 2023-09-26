<template>
    <view>
        <!-- 选择收货地址的盒子 -->
        <view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
            <button type="primary" size="mini" class="address-choose-btn" @click="chooseAddress">请选择收货地址+</button>
        </view>
        <!-- 收货地址的信息 -->
        <view class="address-info-box" v-else @click="chooseAddress">
            <view class="consignee-info">
                <view class="consignee-info-left">
                    <view class="consignee-name">收货人：{{address.userName}}</view>
                </view>
                <view class="consignee-info-right">
                    <view class="consignee-tel">电话：{{address.telNumber}}</view>
                    <uni-icons type="arrowright" size="16"></uni-icons>
                </view>
            </view>
            <view class="consignee-address">
                <view class="address-text">收货地址：{{userAddress}}</view>
            </view>
        </view>
        <!-- 底部的边框线 -->
        <image src="../../static/cart_border@2x.png" mode="" class="address-image"></image>
    </view>
</template>

<script>
    // 导入vuex模块
    import { mapState,mapMutations,mapGetters } from 'vuex'
    export default {
        name:'my-address',
        data() {
            return { }
        },
        methods:{
            ...mapMutations('userStore',['updataAdress']),
            async chooseAddress(){
                 const [err,succ] = await uni.chooseAddress().catch(err=>err)
                 // console.log(res)
                 if(err===null && succ.errMsg==='chooseAddress:ok'){
                     this.updataAdress(succ)
                 }
            }
        },
        computed:{
            ...mapState('userStore',['address']),
            ...mapGetters('userStore',['userAddress'])
        }
    }
</script>

<style lang="scss">
.address-image{
    display: block;
    width: 100%;
    height: 5px;
}
.address-choose-box{
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    .address-choose-btn{
        background-color:#1AAC1E;
    }
}
.address-info-box{
    height: 90px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5px;
    .consignee-info{
        display: flex;
        justify-content: space-between;
        .consignee-info-left{
            margin-bottom: 5px;
        }
        .consignee-info-right{
            display: flex;
            .consignee-tel{
                margin-right: 4px;
            }
        }
    }
}
</style>