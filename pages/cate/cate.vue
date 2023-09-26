<!-- 分类模块的开发 -->
<template>
	<view>
        <!-- 使用自定义的搜索组件 -->
        <view class="search-box">
             <my-search @click.native="goToSearch()"></my-search>
        </view>
		<view class="scroll-view-container">
		    <!-- 左侧的滑动区域 -->
            <scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh+'px'}">
                <block v-for="(item,index) in cateList" :key="index">
                    <!-- 动态添加当前点击项的active类名 -->
                    <view :class="['left-scroll-view-item',active===index?'active':'']" @click="activeChanged(index)">{{item.cat_name}}</view>
                </block>
            </scroll-view>
            <!-- 右侧的滑动区域 -->
            <scroll-view scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
                <view class="cate-leave-2" v-for="(item,index) in cateLeave2" :key="index">
                    <!-- 二级分类的标题 -->
                    <view class="cate-leave-title">{{item.cat_name}}</view>
                    <!-- 当前二级分类下的三级分类列表 -->
                    <view class="cate-leave-3-list">
                        <view class="cate-leave-3-item" v-for="(item3,index3) in item.children" :key="index3" @click="goToGoodsList(item)">
                            <!-- 三级分类的图片 -->
                            <image :src="item3.cat_icon" mode=""></image>
                            <!-- 三级分类的文本 -->
                            <text>{{item3.cat_name}}</text>
                        </view>
                    </view>
                </view>
            </scroll-view>
		</view>
	</view>
</template>

<script>
    import TabMixins from '../../mixins/tabBar-badge.js'
    // 导入接口文件
    import { reqGetCateList } from '../../request/api.js'
	export default {
        mixins:[TabMixins],
		data() {
			return {
                // 定义手机的可使用的视口宽度
                wh:null ,
                // 定义分类数据的列表
                cateList:[],
                // 定义当前选中项
                active:0,
                // 定义获取二级分类的数据列表
                cateLeave2:[],
                scrollTop:0
            }
		},
        onLoad(){
            const systemInfo=uni.getSystemInfoSync()
            // console.log(systemInfo)
            this.wh=systemInfo.windowHeight-50,
            // 当页面一加载完毕时就调用该函数
            this.getCateList()
        },
        methods:{
            // 定义获取分类数据接口的函数
           async getCateList(){
                const res =await reqGetCateList()
                if(res.meta.status!==200) return uni.$showMsg
                this.cateList=res.message
                this.cateLeave2=res.message[0].children
            },
            // 处理点击函数activechanged,动态获取当前项的index
            activeChanged(i){
                this.active=i
                this.cateLeave2=this.cateList[i].children
                this.scrollTop=this.scrollTop===0 ? 1 : 0
            },
            // 用户跳转到商品列表的点击函数
            goToGoodsList(item){
                uni.navigateTo({ url:'/subpkg/goods_list/goods_list?cid='+item.cat_id })
            },
            goToSearch(){
                // console.log(111)
                uni.navigateTo({ url:'/subpkg/search/search' })
            }
        }
	}
</script>

<style lang="scss">
.scroll-view-container{
    display: flex;
    .left-scroll-view{
        width: 120px;
        .left-scroll-view-item{
            background-color: #F7F7F7;
            line-height: 60px;
            text-align: center;
            font-size: 12px;
            &.active{
                background-color: #fff;
                position: relative;
                &::before{
                    content: "";
                    display: block;
                    width: 3px;
                    height: 30px;
                    background-color: #c00000;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            }
        }
    }
}
.cate-leave-title{
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
}
.cate-leave-3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-leave-3-item{
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        image{
            width: 60px;
            height: 60px;
        }
        text{
            font-size: 12px
        }
    }
}
.search-box{
    position: sticky;
    top: 0;
    z-index: 999;
}
</style>
