<template>
  <div class="cc-title-header"  :class="{'border' : isBorder}" :style="{ 'text-align': textAlign , 'padding':padding}">
    <cc-title :title="title">
      <el-badge v-if="showBtn" :value="size" class="item">
        <el-button type="primary" @click="btnEvent" >{{text}}</el-button>
      </el-badge>
    </cc-title>
    <div class="cc-title-header-slot">
       <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cc-title-header',
  props: {
    title:{
      type: String,
      default: ''     
    },
    isBorder: {
      //是否需要下边框
      type: Boolean,
      default: false
    },
    textAlign: {
      //slot 对齐方式 默认右对齐
      type: String,
      default: 'right'      
    },
    text:{
      type: String,
      default: ''
    },
    size:{
      type: Number,
      default: 0
    },
    showBtn:{
      type:Boolean,
      default:false,
    },
    btnEvent:{
      type:Function
    },
    padding:{
      type:String,
      default:'',
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";
  .item{
    margin-left: 15px;
  }
  .cc-title-header {
    width:100%;
    padding:13px $default-padding;
    display: inline-block;
    font-size: $font-size-base;  
    display:flex; 
    &.border{
      border-bottom: 1px solid $border-color;
    }
    .cc-title-header-slot{
      flex:1;
    }
  }
</style>
