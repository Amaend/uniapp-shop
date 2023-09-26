<template>
	<view>
       <!-- 使用自定义的搜索组件 -->
       <view class="search-box">
            <my-search @click.native="goToSearch()"></my-search>
       </view>
		<!-- 轮播图的区域 -->
        <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
            <swiper-item v-for="(item,index) in swiperList" :key="index">
                <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
                    <image :src="item.image_src" mode="widthFix"></image>
                </navigator>
            </swiper-item>
        </swiper>
        <!-- 分类导航区域 -->
        <view class="nav-list">
                <view class="nav-item"v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
                        <image :src="item.image_src" class="nav-img"></image>
                </view>
        </view>
        <!-- 楼层区域 -->
        <view class="floor-list">
            <view class="floor-item" v-for="(item,index) in floorList" :key="index">
                <!-- 楼层的标题 -->
                <image :src="item.floor_title.image_src"  class="floor-title"></image>
                <!-- 楼层的图片区域 -->
                <view class="floor-img-box">
                    <!-- 左侧大图片区域 -->
                    <navigator class="left-img-box" :url="item.product_list[0].url">
                        <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
                    </navigator>
                    <!-- 右侧小图片区域 -->
                    <view class="right-img-box">
                        <navigator class="right-img-item" v-for="(item,index) in item.product_list" :key="index" :url="item.url" v-if="index!==0">
                            <image :src="item.image_src" :style="{width:item.image_width+'rpx'}" mode="widthFix"></image>
                        </navigator>
                    </view>
                </view>
            </view>
        </view>
	</view>
</template>

<script>
    import TabMixins from '../../mixins/tabBar-badge.js'
    // 导入swiper数据的请求接口
    import { reqGetSwiperList,reqGetNavList,reqGetFloorList } from '../../request/api.js'
	export default {
        mixins:[TabMixins],
		data() {
			return { 
                // 定义轮播图数组
                swiperList:[] ,
                // 分类导航的数据列表
                navList:[],
                // 楼层的数据
                floorList:[]
                }
		},
        //挂载到onload声明周期钩子函数上，类似于vue中的mounted
         onLoad(){
          this.getSwiperList(),
          this.getNavList(),
          this.getFloorList()
        },
        methods:{ 
            // 定义获取轮播图请求的函数
            async getSwiperList(){
                const res = await reqGetSwiperList()
                if(res.meta.status!==200) return uni.$showMsg
                this.swiperList=res.message
            },
            // 定义获取导航栏请求的函数
            async getNavList(){
                const res = await reqGetNavList()
                if(res.meta.status!==200) return uni.$showMsg
                this.navList=res.message
            },
            // 定义跳转到分类的接口
            navClickHandler(item){
                // console.log(item)
                if(item.name==='分类'){
                    uni.switchTab({ url:'/pages/cate/cate' })
                }
            },
            // 定义获取到楼层的数据函数
            async getFloorList(){
                const res = await reqGetFloorList()
                if(res.meta.status!==200) return uni.$showMsg
                // 对楼层数据进行处理
                res.message.forEach(floor=>{
                    floor.product_list.forEach(item=>{
                        item.url='/subpkg/goods_list/goods_list?'+item.navigator_url.split('?')[1]
                    })
                })
                this.floorList=res.message
            },
            goToSearch(){
                // console.log(111)
                uni.navigateTo({ url:'/subpkg/search/search' })
            }
        }
	}
</script>

<style lang="scss">
swiper{
    height: 350rpx;
    image{
        width: 100%;
        height: 100%;
    }
}
.nav-list{
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
    .nav-img{
        width: 128rpx;
        height: 140rpx;
        }
}
.floor-title{
    width: 100%;
    height: 60rpx;
}
.right-img-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.floor-img-box{
    display: flex;
    padding-left: 10rpx;
}
.search-box{
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>
