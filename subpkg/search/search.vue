<template>
    <view>
        <view class="search-container">
            <uni-search-bar @input="input" radius="18" placeholder="请输入搜索内容" clearButton="auto" cancelButton="none" :focus="true" />
        </view>
        <!-- 搜索建议列表 -->
        <view class="suggest-list" v-if="searchResults.length!==0">
            <view class="suggest-item" v-for="(item,index) in searchResults" :key="index" @click="goToDetail(item)">
                <view class="goods-name">{{item.goods_name}}</view>
                <uni-icons type="arrow-right" size="16"></uni-icons>
            </view>
        </view>
        <!-- 搜索历史 -->
        <view class="history-box" v-else>
            <!-- 标题区域 -->
            <view class="history-title">
                <text>搜索历史</text>
                 <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
            </view>
            <view class="history-list">
                <uni-tag :text="item" v-for="(item,index) in historyList" :key="index" size="normal" :inverted="false" @click="goToGoodsList(item)"></uni-tag>
            </view>
        </view>
    </view>
</template>

<script>
    import { reqGetSearchList } from '../../request/api.js'
    export default {
        data() {
            return {
                timer:null,
                // 定义用户输入的搜索关键字
                keyword:'',
                // 搜素的结果列表
                searchResults:[],
                // 搜索历史记录
                historyList:[]
            }
        },
        methods:{
            input(e){
                clearTimeout(this.timer)
                this.timer=setTimeout(()=>{
                    this.keyword=e
                        this.getSearchList()
                },500)
            },
            async getSearchList(){
                if(this.keyword.length===0) return this.searchResults=[]
                const res = await reqGetSearchList(this.keyword)
                if(res.meta.status!==200) return uni.$showMsg()
                this.searchResults=res.message
                this.saveSearchHistory()
            },
            goToDetail(item){
                uni.navigateTo({ url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id })
            },
            saveSearchHistory(){
                if(this.historyList.includes(this.keyword)) return
                this.historyList.unshift(this.keyword)
                // 对搜索历史数据，进行持久化的存储
                uni.setStorageSync('keyWord',JSON.stringify(this.historyList))
            },
            clearHistory(){
                this.historyList=[]
                uni.setStorageSync('keyWord','[]')
            },
            goToGoodsList(item){
                uni.navigateTo({ url:'/subpkg/goods_list/goods_list?query='+item })
            }
        },
        onLoad(){
            this.historyList=JSON.parse(uni.getStorageSync('keyWord')||'[]')
        }
        
    }
</script>

<style lang="scss">
.suggest-list{
    padding: 0 5px;
    .suggest-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 12px;
        padding: 13px 0;
        border-bottom: 1px solid #efefef;
        .goods-name{
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
.search-container{
    position: sticky;
    top: 0;
    z-index: 999;
}
.history-box{
    padding: 0 5px;
    .history-title{
        display: flex;
        justify-content: space-between;
        height: 40px;
        align-items: center;
        font-size: 13px;
        border-bottom: 1px solid #efefef;
    }
    .history-list{
        display: flex;
        flex-wrap: wrap;
        .uni-tag{
            margin-top: 5px;
            margin-right: 5px;
            color: #000;
            background-color: #efefef;
        }
    }
}

</style>
