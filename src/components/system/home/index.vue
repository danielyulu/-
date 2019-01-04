<template>
  <el-container class="content-container">
    <cc-container>
      hello world!
    </cc-container>
  </el-container>
</template>

<script>

export default {
  created() {
    
  },
  watch: {
    "findMenuForm.value": {
      handler: function(val, oldVal) {
        this.findMenuForm.value = val;
      },
      deep: true
    }
  },
  data() {
    return {};
  },
  components: {
  },
  methods: {

  }
};
</script>


<style lang="scss">
@import "~@/assets/style/sass/_variable";
@import "~@/assets/style/sass/_mixins";
@import "~@/assets/style/home/index";
</style>

