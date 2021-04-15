<template>
	<view>
		<view class="status_bar"></view>
		<view class="box" style="margin-top: 10rpx;">
			<view @click="chooseCard">
				<authRow title="卡号" :val="$Fw.fmtAcctNo(accNo,true)"></authRow>
			</view>
			<authRow title="余额" :val="'¥ '+$Fw.fmtAmt(val_balance)"></authRow>
		</view>
		<authBtn btnName="跳转" @next="goPages" />
	</view>
</template>

<script>
	import authRow from "../../common/myComponents/authRow.vue";
	import authBtn from "../../common/myComponents/authBtn";
	import operAccListQueryResult from '../../common/data/account/operAccListQuery.js'
	import {
		mapMutations,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		components: {
			authRow,
			authBtn
		},
		computed: {
			...mapState(['accNo', 'val_balance'])
		},
		methods: {
			...mapMutations(['muAccList', 'muAccInfo']),
			// 选择下挂卡
			chooseCard() {
				this.$store.commit("muAccInfo", {
					ACCT_NO: this.accNo,
					VAL_BALANCE: this.val_balance,
				});
				uni.navigateTo({
					url: "../0100100/pageA?pageId=01&pageUrl=../index/index"
				});
			},
			goPages(event) {
				// 允许从相机和相册扫码
				uni.scanCode({
					success: function(res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});

			},
			getAccList() {
				// 模拟请求接口
				setTimeout(() => {
					// await operAccListQueryResult
					let rpdata = operAccListQueryResult.rpdata
					let status = rpdata.head_app.H_STATUS;
					let msg = rpdata.head_app.H_MSG;
					rpdata = rpdata.body_app;
					if (status == "000000") {
						uni.stopPullDownRefresh(); // uni.stopPullDownRefresh 可以停止当前页面的下拉刷新。
						if (rpdata.LIST.length == null && rpdata.LIST.length == 0) {
							// 	Fw.device.alertinfo("请加挂企业账户后再使用");
						} else {
							this.$store.commit("muAccList", rpdata);
							if (this.$Fw.isEmpty(this.accNo)) {
								this.$store.state.accNo = rpdata.LIST[0].ACCT_NO;
								this.$store.state.val_balance = rpdata.LIST[0].VAL_BALANCE;
							}
							let accInfo = {
								ACCT_NO: this.accNo,
								VAL_BALANCE: this.val_balance,
							};
							this.$store.commit("muAccInfo", accInfo);
						}
					} else {
						uni.stopPullDownRefresh(); // uni.stopPullDownRefresh 可以停止当前页面的下拉刷新。
						uni.showModal(msg)
					}
				}, 1000);

			}

		},
		onLoad() {
			this.getAccList()
		},
		async onPullDownRefresh() {
			this.getAccList()
		}


	}
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	.cu-custom .cu-bar {
		height: 50px;
	}

	.ui-scan {
		background: url(../../common/img/001.png) no-repeat;
		background-size: 20px 15px;
		width: 20px;
		height: 15px;
		margin-right: 10px;
	}
</style>
