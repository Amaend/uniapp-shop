<template>
    <view class="user-container">
        <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
        <button type="primary" class="login-btn" @click="getUserProfile"> 一键登录</button>
        <text class="login-text">登录后尽享更多权益</text>
    </view>
</template>

<script>
    import { reqUserLogin } from '../../request/api.js'
    import { mapMutations,mapState } from 'vuex'
    export default {
        name:'my-login',
        data() {
            return {}
        },
        methods:{
            ...mapMutations('userStore',['updataUserInfo','updataUserToken','updataRedirect']),
            async getUserProfile(){
                const res= await uni.getUserProfile({ desc:'登录授权' }).catch(err=>err)
                this.updataUserInfo(res[1].userInfo)
                this.getToken(res[1])
            },
            async getToken(userinfo){
               const [err,res] = await uni.login().catch(err=>err)
               if(err || res.errMsg!=='login:ok') return uni.$showMsg('登录失败')
               const query={
                   code:res.code,
                   encryptedData:userinfo.encryptedData,
                   iv:userinfo.iv,
                   rawData:userinfo.rawData,
                   signature:userinfo.signature,
               }
               const userReslut = await reqUserLogin(query)
               if(!(userReslut.meta.status===400||userReslut.meta.status===200)) return uni.$showMsg('登录失败')
               let token='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
               this.updataUserToken(token)
               this.navigateeBack()
            },
            navigateeBack(){
                if(this.redirectInfo&&this.redirectInfo.openType==='switchTab'){
                    uni.switchTab({ url:this.redirectInfo.from })
                    this.updataRedirect({})
                }
            }
        },
        computed:{ ...mapState('userStore',['redirectInfo']) }
    }
</script>

<style lang="scss">
.user-container{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-btn{
        width: 90%;
        border-radius: 100px;
        margin: 15px 0;
        background-color: #c00000;
    }
    .login-text{
        font-size: 12px;
        color: gray;
    }
}
</style>