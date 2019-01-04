<template>
  <!--标题  蓝色矩形+箭头+图标 -->
  <div style="width:100%;">
    <div style="float:left;">
      <div class="cc-title-arrow-txt" style="float:left;">
        <div class="cc-title-arrow">  
          <i  :class="['iconfont', 'icon-' + icon]"></i>
        </div>
        <div class="cc-title-arrow-title">{{ title }}</div>
      </div>
      
    </div>
    <div :style="{ float: float, margin:'0 15px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cc-title-arrow-txt',
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
    float : {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";
.cc-title-arrow-txt{
  display: inline-block;
  .cc-title-arrow-title{
    color: $color-primary;
    display: inline-block;
  }
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

}

</style>
