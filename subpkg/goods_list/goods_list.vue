<template>
    <view>
        <view class="goods-list">
            <view v-for="(item,index) in goodsList" :key="index" @click="goToGoodsDetail(item)">
                <my-goods :item="item"></my-goods>
            </view>
        </view>
    </view>
</template>

<script>
    // 导入搜索商品列表的接口1
    import { reqGetGoodsList } from '../../request/api.js'
    export default {
        data() {
            return {
                // 定义请求参数的对象
                queryInfo:{
                    // 查询语句
                    query:'',
                    pagenum:1,
                    pagesize:10
                },
                // 定义商品列表总数
                total:null,
                goodsList:[],
                // 定义节流阀
                isloading:false
                
            }
        },
        onLoad(optinos){
            // 添加onload生命周期钩子函数
            this.queryInfo.query=optinos.query||''
            // 调用获取商品列表的函数
            this.getGoodsList()
        },
        methods:{
            async getGoodsList(cb){
                this.isloading=true
                const res = await reqGetGoodsList(this.queryInfo)
                this.isloading=false
                if(res.meta.status!==200) return uni.$showMsg()
                this.goodsList=[...this.goodsList,...res.message.goods]
                this.total=res.message.total
                cb&&cb()
            },
            // 定义跳转到商品详情页面的处理函数
            goToGoodsDetail(item){
                uni.navigateTo({ url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id })
            }
        },
        // 上拉触底的出来函数
        onReachBottom(){
            // 判断数据是否加载完毕
            if(this.queryInfo.pagenum*this.queryInfo.pagesize>this.total) return uni.$showMsg('数据加载完毕')
            //  判断节流阀的状态
            if(this.isloading) return
            this.queryInfo.pagenum+=1
            this.getGoodsList()
        },
        onPullDownRefresh(){
            // 重置关键数据
            this.queryInfo.pagenum=1,
            this.total=0,
            this.isloading=false,
            this.goodsList=[]
            // 重新发请请求
            this.getGoodsList(()=>{uni.stopPullDownRefresh()})
        },
       
        
    }
</script>

<style lang="scss">

</style>
