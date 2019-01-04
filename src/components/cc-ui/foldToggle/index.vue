<template>
  <!--折叠 筛选条件-->
  <div class="cc-fold-toggle" v-bind="$props" @click="handleToggle">
    <span>{{message}}</span>
    <i :class="icon"></i>
  </div>
</template>

<script>
export default {
  name: 'cc-fold-toggle',
  data() {
    return {
      isFoldToggle:this.isFold,
    }
  },
  props: {
    isFold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    message() {
      return this.isFoldToggle ? '更多筛选' : '更多筛选'
    },
    icon() {
      return this.isFoldToggle ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
    }
  },
  methods: {
    handleToggle() {
      this.isFoldToggle=!this.isFoldToggle;
      this.$emit('fold-toggle', this.isFoldToggle);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";

.cc-fold-toggle {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  color: $color-primary;
  cursor: pointer;
  position: relative;
  span{
    display:inline-block;
  }
  i {
    font-size: 17px;
    display:inline-block;
    vertical-align: middle;
  }
}

</style>
