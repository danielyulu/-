<template>
  <!--标题  蓝色矩形+箭头 -->
  <div class="cc-title-arrow">
    <span v-if="title">{{ title }}</span>    
    <i v-if="icon" :class="['iconfont', 'icon-' + icon]"></i>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cc-title-arrow',
  props: {
    title:{
      //标题名
      type: String,
      default: null     
    },
    icon: {
      type: String,
      default: null
    },
  }
}
</script>

<style lang="scss">
@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";
.cc-title-arrow{
  display: inline-block;
  font-size: $font-size-base;
  margin-right:10px;
  position:relative;
  height:28px;
  line-height: 28px;
  padding:0 20px 0 15px;
  background-color: $color-primary;
  color: #fff;
  @extend %borderRadius;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  span{
    display:inline-block;
  }
  &:after{
    @include triangle(left,6px 28px,$button-gray);
    position:absolute;
    top:0px;
    right:0px;
  }
}
</style>
