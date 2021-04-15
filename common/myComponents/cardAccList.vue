<template>
	<view id="app">
		<view class="am-list am-list-twoline-text">
			<view class="am-list-body" v-if="accList.LIST!=null && accList.LIST.length!=0"
				v-for="(item,index) in accList.LIST" :key="index">
				<view class="am-list-item" @click="ToNext(item)">
					<view class="am-list-content">
						<view class="am-list-title">{{$Fw.fmtAcctNo(item.ACCT_NO,true)}}</view>
						<view class="am-list-brief">{{item.ACC_ALIAS}}</view>
					</view>
					<view :class="item.ACCT_NO==accNo?'ui-list-checked':''"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			accList: {
				LIST: []
			},
			accNo: "",

		},
		mounted() {

		},
		data() {
			return {}
		},
		methods: {
			ToNext(item) {
				this.$emit("navTo",item);
			}
		},
	};
</script>

<style>
	.ui-list-checked {
		background: url(../img/checked.png) no-repeat;
		background-size: 20px 15px;
		width: 20px;
		height: 15px;
	}
</style>
