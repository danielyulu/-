<template>
  <div class="cc-adaptive" :style="{'min-height':minHeight + 'px'}" >
    <slot :height="height"></slot>
  </div>
</template>

<script>
import { evt } from '@/utils';

export default {
  name: 'cc-adaptive',
  props:{
    minusHeight:{
      //减去的底部高度  默认是20
      type: Number,
      default: 20
    },
    isPage:{
      //是否包含分页  默认不包含
      type: Boolean,
      default: false
    },
    minHeight: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      height:0,
      width:0,
    }
  },
  created(){
  },
  mounted() {
    this.rebuild();
    this.installEvent();
  },
  beforeDestroy() {
    this.uninstallEvent();
  },
  methods: {
    rebuild() {
      if (this.$el) {
        let rect = this.$el.getBoundingClientRect();
        let height=0;
        if(this.isPage) {
          height = document.documentElement.clientHeight - rect.top - 53-15;
        } else {
          height = document.documentElement.clientHeight - rect.top - this.minusHeight-15;
        }
        this.$el.style.height = height + 'px';
        this.height=height;
      }
    },
    // 安装事件
    installEvent() {
      this.unbind = evt.add(window, 'resize', () => {
        this.rebuild();
      });
    },

    // 卸载事件
    uninstallEvent() {
      this.unbind();
    },
  }
}
</script>

<style lang="scss">
.cc-adaptive {
  overflow: auto;
  
}
</style>
