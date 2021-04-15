<template>
  <view class="am-list am-list-form delete-padding">
    <view class="am-list-body">
      <view
        :class="[
          'am-list-item',
          'am-input-autoclear',
          deleteLine ? 'delete-line' : null,
          deleteTop ? 'am-list-line-top' : null,
          deletelow ? 'am-list-line-btm' : null,
        ]"
      >
        <view class="am-list-label ui-color-gray">
          {{ title }}
        </view>
        <view
          class="am-list-extra J-certificate ui-color-black line-feed"
          style="font-family: PingFangSC-Regular"
        >
          {{ val }}
        </view>
        <view aria-hidden="true" class="am-list-arrow" v-if="rightArr">
          <text class="am-icon arrow horizontal"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    rightArr: {
      //右侧是否有箭头
      type: Boolean,
    },
    leftGray: {
      //左侧字体颜色
      type: Boolean,
    },
    rightGray: {
      //右侧侧字体颜色
      type: Boolean,
    },
    deleteLine: {
      type: Boolean,
    },
    deleteTop: {
      //去除上边线
      type: Boolean,
    },
    deletelow: {
      //去除下边线
      type: Boolean,
    },
    title: {
      type: String,
    },
    val: {
      type: String,
      required: false,
    },
  },
};
</script>

<style>
.delete-padding {
  padding: 0 !important;
}
.line-feed{
    white-space: inherit !important;
    word-wrap: break-word;
    word-break: normal;
}
</style>