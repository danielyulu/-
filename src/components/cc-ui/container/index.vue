<template>
  <!--容器-->
  <el-main class="cc-container" :style="{ padding : padding }"> 
    <slot></slot>
  </el-main>
</template>

<script>
export default {
  name: 'cc-container',
  props: {
    padding:{
      type: String,
      default:'15px'   
    }, 
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";
.cc-container{
  @include clearfix;
}

</style>
