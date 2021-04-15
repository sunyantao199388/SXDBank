<template>
	<cardAccList :accNo="accNo" :accList="accList" @navTo="ToNext"></cardAccList>
</template>

<script>
	import cardAccList from "../../common/myComponents/cardAccList.vue";
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		components: {
			cardAccList
		},
		data() {
			return {
				pageId: "",
				pageUrl: ""
			}
		},
		computed: {
			...mapState(['accNo', 'accList']),
			...mapMutations(['muAccInfo']),
		},
		onLoad(option) {
			//  用于后期多页面应用时，业务处理
			this.pageId = option.pageId;
			this.pageUrl = option.pageUrl;
			// 改变 NavigationBarTitle
			uni.setNavigationBarTitle({
				title: '个人中心'
			})

		},
		methods: {
			ToNext(item) {
				this.$store.commit("muAccInfo", {
					ACCT_NO: item.ACCT_NO,
					VAL_BALANCE: item.VAL_BALANCE,
				})
				if (this.pageId == "01") {
					uni.navigateTo({
						url: this.pageUrl,
					})
				}

			}
		}
	}
</script>

<style>
</style>
