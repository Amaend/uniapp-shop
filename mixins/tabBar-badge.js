import { mapGetters } from 'vuex'
	export default {
        computed:{ ...mapGetters('carStore',['total']) },
        methods:{
            setTabBar(){
                uni.setTabBarBadge({
                    index:2,
                    text:this.total.toString()
                })
            }
        },
        onShow(){
            this.setTabBar()
        },
        watch:{
            total(newvalue){
                this.setTabBar()
            }
        }
	}