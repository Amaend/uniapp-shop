<template>
    <view>
            <view class="goods-item" >
                <view class="goods-item-left">
                    <slot :item="item" name="checked"></slot>
                    <image :src="item.goods_small_logo||defaultPic" class="goods-pic"></image>
                </view>
                <view class="goods-item-right">
                    <view class="goods-name">{{item.goods_name}}</view>
                    <view class="goods-info-box">
                        <view class="goods-price">￥{{Number(item.goods_price).toFixed(2)}}</view>
                        <slot :item="item" name="goodsNum"></slot>
                    </view>
                </view>
            </view>
    </view> 
</template>

<script>
    export default {
        name:'my-goods',
        props:['item'],
        data() {
            return { defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png' }
        },
        methods:{}
    }
</script>

<style lang="scss">
.goods-item{
    display: flex;
    padding:  10px 5px;
    border-bottom: 1px solid #f0f0f0;
    
    .goods-item-left{
        margin-right: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .goods-pic{
            width: 100px;
            height: 100px;
            display: block;
        }
    }
    .goods-item-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        .goods-name{
            font-size: 13px
        }
            .goods-info-box{
                display: flex;
                justify-content: space-between;
                .goods-price{
                color: #c00000;
                font-size: 16px
            }
        } 
    }
}
</style>