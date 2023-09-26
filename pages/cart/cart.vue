<template>
    <view>
        <view class="cart-container" v-if="carData.length!==0">
            <!-- 收获地址 -->
            <view class="address">
                <my-address></my-address>
            </view>
         <!-- 商品列表的标题区域 -->
            <view class="cart-title">
                <uni-icons type="shop" size="18"></uni-icons>
                <text class="cart-title-text">购物车</text>
            </view>
            <!-- 商品列表区域 -->
            <uni-swipe-action>
                <block v-for="(goodsItem,index) in carData" :key="index">
                    <uni-swipe-action-item :right-options="options" @click="swiperGoodsRemove(goodsItem)">
                        <my-goods :item='goodsItem'>
                            <template v-slot:checked="{item}">
                                    <radio  :checked="item.goods_state"  color="#c00000" @click="radioChangeHandle(item)"></radio>
                            </template>
                            <template v-slot:goodsNum="{item}">
                                <uni-number-box :min="0" :value="item.goods_count" @change="(value)=>changeGoodsNum(value,item)"></uni-number-box>
                            </template>
                        </my-goods>
                    </uni-swipe-action-item>
                </block>
            </uni-swipe-action>
            <!-- 结算区域 -->
            <my-settle></my-settle>
        </view>
        <!-- 这是空白结束页的标签 -->
        <view class="empty-cart" v-else>
            <image src="../../static/cart_empty@2x.png" class="empty-image"></image>
            <text class="empty-text">空空如也~</text>
        </view>
    </view>
</template>

<script>
    // 导入vuex获取数据
    import { mapState } from 'vuex'
    import { computed } from 'vue'
    import TabMixins from '../../mixins/tabBar-badge.js'
    export default{
        mixins:[TabMixins],
        data(){
            return{
                options:[
                        {
                            text: '删除',
                            style: { backgroundColor: '#c00000' }
                        }
                      ]
            }
        },
        computed:{ ...mapState('carStore',['carData']) },
        methods:{
            radioChangeHandle(item){
                const goodsChangeInfo={
                    goods_id:item.goods_id,
                    goods_state:!item.goods_state
                }
                this.$store.commit('carStore/updataGoodsState',goodsChangeInfo)
            },
            changeGoodsNum(value,item){
                const goodsChangeInfo={
                    goods_id:item.goods_id,
                    goods_count:value
                }
                this.$store.commit('carStore/updataGoodsCount',goodsChangeInfo)
            },
            swiperGoodsRemove(item){
                setTimeout(()=>{
                    this.$store.commit('carStore/byIdRemoveGoods',item.goods_id)
                },50)
                
            }
        },
        onPullDownRefresh(){
            uni.stopPullDownRefresh()
        }
    }
</script>

<style lang="scss">
.cart-container{
    padding-bottom: 50px;
}
.cart-title{
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border-bottom: 1px solid #efefef;
    .cart-title-text{
        font-size: 14px;
        margin-left: 10px;
    }
}
.empty-cart{
    display: flex;
    flex-direction: column;
    padding: 150px;
    align-items: center;
    .empty-image{
        width: 90px;
        height: 90px;
    }
    .empty-text{
        font-size: 12px;
        color: gray;
        margin-top: 10px;
    }
}
</style>