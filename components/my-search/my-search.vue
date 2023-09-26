<template>
    <view class="my-search-container">
        <view class="my-search-box">
            <!-- 使用uniapp官方提供的字体图标 -->
            <uni-icons type="search" size="17"></uni-icons>
            <text class="placeholder">搜索</text>
        </view>
    </view>
</template>

<script>
    export default {
        name:'my-search',
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
.my-search-container{
    height: 50px;
    background-color: #c00000;
    display: flex;
    align-items: center;
    margin-top: -1px;
    padding: 0 10px;
    .my-search-box{
        height: 36px;
        background-color: #fff;
        border-radius: 18px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .placeholder{
            font-size: 15px;
            margin-left: 5px;
        }
    }
}
</style>