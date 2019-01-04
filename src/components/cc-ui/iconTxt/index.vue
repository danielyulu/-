<template>
  <!--图标 + slot 公共组件-->
  <div class="cc-icon-txt">
    <i :class="['iconfont', 'icon-' + icon]"></i>
    <span>{{ txt }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cc-icon-txt',
  props: {
    icon: {
      type: String,
      default: 'user'
    },
    txt: {
      type: String,
      default: ''
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/sass/_variable";
//样式根据设计稿设置 还没有设置
.cc-icon-txt {
  display: inline-block;
  font-size: 14px;
  color: black;
  & + .cc-icon-txt{
    margin-left: 8px;

  }
  span{
    display: inline-block;
  }
  i {
    color:#666;
    font-size: 24px;
    vertical-align: middle;
    margin-right: 3px;
  }
}
</style>
