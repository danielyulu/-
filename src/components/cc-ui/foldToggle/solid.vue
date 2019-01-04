<template>
  <!--折叠 圆形中间实心箭头-->
  <div class="cc-fold-toggle-solid" :class="icon" v-bind="$props" @click="handleToggle">
  </div>
</template>

<script>
export default {
  name: 'cc-fold-toggle-solid',
  data() {
    return {
    }
  },
  props: {
    isFold: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    icon() {
      return this.isFold ? 'cc-arrow-up' : 'cc-arrow-down'
    }
  },
  methods: {
    handleToggle() {
      let flag = !this.isFold;
      this.isFold = flag;
      this.$emit('change', flag)
    }
  }
}
</script>

<style lang="scss" scoped>

@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";

.cc-fold-toggle-solid {
  display:inline-block;
  color: $color-primary;
  cursor: pointer;
  width: 18px;
  height: 18px;
  background-color: $color-primary;
  border-radius: 100%;
  position: relative;
  &.cc-arrow-up{
    &:after{
      @include triangle(top, $size: 8px 5px, $color: #fff);
      position:absolute;
      top:6px;
      left:5px;
    }
  }
  &.cc-arrow-down{
    &:after{
      @include triangle(bottom, $size: 8px 5px, $color: #fff);
      position:absolute;
      top:7px;
      left:5px;
    }
  }
}
</style>
