<template>
	<view class="my-container">
		<my-login v-if="!token"></my-login>
        <my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
    import { mapState } from 'vuex'
    import TabMixins from '../../mixins/tabBar-badge.js'
	export default {
        mixins:[TabMixins],
		data() {
			return {}
		},
        computed:{ ...mapState('userStore',['token']) }
	}
</script>

<style lang="scss">
page,.my-container{
    height: 100%;
}
</style>
