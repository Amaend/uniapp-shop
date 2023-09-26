<template>
    <view v-if="goodsInfo.goods_name" class="goods-conatiner">
        <!-- 轮播图区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular>
            <swiper-item v-for="(item,index) in goodsInfo.pics" :key="index">
                <image :src="item.pics_big" mode="" @click="preview(index)"></image>
            </swiper-item>
        </swiper>
        <!-- 商品信息区域 -->
        <view class="goods-info-box">
            <!-- 商品价格 -->
            <view class="price">￥{{goodsInfo.goods_price}}</view>
            <!-- 商品的信息主体区域 -->
            <view class="goods-info-body">
                <!-- 商品的名字 -->
                <view class="goods-name">{{goodsInfo.goods_name}}</view>
                <!-- 收藏 -->
                <view class="goods-collect">
                    <uni-icons type="star" size="18"></uni-icons>
                    <text>收藏</text>
                </view>
            </view>
            <!-- 运费 -->
            <view class="goods-freight">快递：免运费</view>
        </view>
        <!-- 渲染富文本 -->
        <rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
        <!-- goods-nav 导航栏-->
        <view class="goods-nav">
            <uni-goods-nav :fill="true"  :options="options" :buttonGroup="buttonGroup" @click="clickConfrim"  @buttonClick="clickAddCart"/>
        </view>
    </view>
</template>

<script>
    // 导入接口
    import { reqGetGoodsDetail } from '../../request/api.js'
    // 导入vuex
    import { mapState,mapGetters } from 'vuex'
    import store from '../../store/store.js'
    export default {
        data() {
            return {
                // 定义商品的详细信息
                goodsInfo:{},
                // 获取商品的id
                goods_id:null,
                // goods-nav的配置对象
                options: [{
                			icon: 'headphones',
                			text: '客服'
                		}, {
                			icon: 'shop',
                			text: '店铺',
                		}, {
                			icon: 'cart',
                			text: '购物车',
                            info:0
                		}],
                	    buttonGroup: [{
                	      text: '加入购物车',
                	      backgroundColor: '#ff0000',
                	      color: '#fff'
                	    },
                	    {
                	      text: '立即购买',
                	      backgroundColor: '#ffa200',
                	      color: '#fff'
                	    }
                	    ]
            }
        },
        methods:{
            async getGoodsDetail(){
                const res=await reqGetGoodsDetail(this.goods_id)
                if(res.meta.status!==200) return uni.$showMsg()
                res.message.goods_introduce=res.message.goods_introduce.replace(/<img /g,'<img style="display:block;"')
                this.goodsInfo=res.message
            },
            // 定义预览图片的处理函数
            preview(i){
                // 调用uni.previewImage的api
                uni.previewImage({
                    current:i,
                    urls:this.goodsInfo.pics.map(item=>item.pics_big)
                })
            },
            // 跳转到购物车页面
            clickConfrim(e){ 
                // console.log(e)
                if(e.content.text==='购物车'){
                    uni.switchTab({ url:'/pages/cart/cart' })
                }
            },
            // 添加购物车的处理函数
            clickAddCart(e){
                if(e.content.text==='加入购物车'){
                    const goods={
                        goods_id:this.goodsInfo.goods_id,
                        goods_name:this.goodsInfo.goods_name,
                        goods_price:this.goodsInfo.goods_price,
                        goods_count:1,
                        goods_small_logo:this.goodsInfo.goods_small_logo,
                        goods_state:true
                    }
                    this.$store.commit('carStore/addToCart',goods)
                }
            }
        },
        computed:{ 
            ...mapState({ goodsData:state=>state.carStore.carData }),
            ...mapGetters('carStore',['total'])
             },
        watch:{
            total:{
                handler(newValue){
                    const findReslut= this.options.find(item=>{
                        return item.text==='购物车'
                    })
                    if(findReslut){
                        findReslut.info=newValue
                    }
                },
                immediate:true
            }
           
        },
        onLoad(options){
            this.goods_id=options.goods_id
            this.getGoodsDetail()
        }
    }
</script>

<style lang="scss">
.goods-conatiner{
    padding-bottom: 50px;
}
swiper{
    height: 750rpx;
    image{
        width: 100%;
        height: 100%;
    }
}
.goods-info-box{
    padding: 10px;
    padding-right: 0;
    .price{
        color: #c00000;
        font-size: 18px;
        margin: 10px 0;
    }
    .goods-info-body{
        display: flex;
        justify-content: space-around;
        .goods-name{
            font-size: 14px;
            margin-right: 10px;
        }
        .goods-collect{
            width: 120px;
            font-size: 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; 
            color: gray;
            border-left: 1px solid #efefef;
        }
    }
    .goods-freight{
        font-size: 12px;
        color: gray;
        margin: 10px 0;
    }
}
.goods-nav{
    position: fixed;
    bottom: 0;
    width: 100%;
}
</style>
