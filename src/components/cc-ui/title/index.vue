<template>
  <!--竖线 + 标题-->
  <div class="cc-title">
    <span>{{ title }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'cc-title',
  props: {
    title:{
      //标题名
      type: String,
      default: ''     
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/sass/_variable";

.cc-title {
  display: inline-block;
  font-size: $font-size-base;
  margin-right: 20px;
  position:relative;
  line-height: 30px;
  padding-left: 15px;
  &:before{
    content: "";
    display: block;
    width:4px;
    height:15px;
    background-color: $color-primary;
    position:absolute;
    left:0px;
    top:7px;
  }  
}
</style>
