<template>
  <div>
    <el-main class="main">
      <router-view v-if="visible"></router-view>
    </el-main>
  </div>
</template>

<script>
  //全局过滤器
  import filter from "@/filter/index";
  import {
    setStore,
    getFromSession
  } from "@/utils/globalSession"
  import {
    dateFormat
  } from "@/utils/dateUtil"
  import {
    getSeqNum,
  } from "@/utils/index";
  import { evt } from '@/utils';
  import {
    getAnnouncement,
    getArticle 
  } from "@/service/httpRequest"
  
  export default {
    data() {
      return {
        visible:true,
        count:1,

        flag:false,

        now:null,
        millisec:1000*300,
        notification:[],
      }
    },
    computed: {},
    watch:{
      "$route" : function(val, oldVal) {
        this.visible = false;
        
        this.$nextTick(()=>{
          this.visible = true;
        });
        this.setTitle(val);
      }
    },
    methods: {
      setTitle(val) {
        let paramsArr = [];
        let id = val.params[val.meta.key];
        if(id) {
          paramsArr.push(id);
        }
        document.title = 'One Index • ' + [val.meta.title].concat(paramsArr).join('-');
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
      rebuild() {
        if (this.$el) {
          let rect = this.$el.getBoundingClientRect();
          this.flag = rect.width <= 1280;
        }
      },
    },
    created() {
      if(!getFromSession('userInfo')) {
        this.$router.push({name: 'login'});
      }
      this.setTitle(this.$route);

    },
    mounted() {
      this.rebuild();
      this.installEvent();
    },
    beforeDestroy() {
      this.uninstallEvent();
      clearTimeout(this.timeOut);//当用户关闭或不在当前页面时清除刷新
      if(this.notification.length > 0) {
        for(let n of this.notification) {
          n.close();
        }
      }
    },
    components: {
      // sideBar,
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "~@/assets/style/sass/_variable";
  @import "~@/assets/style/sass/_mixins";
  .container-wrap {
    width: 100%;
    height: 100%;
    @include clearfix;
    .el-header {
      padding: 0;
      height: 78px !important;
    }
    .content {
      padding: $default-padding;
      .el-aside {
        background-color: white;
      }
    }
    .el-main {
      background-color: white;
      margin-left: 15px;
    }
  }

  .main {
    width: 100%;
    // height: 100%;
    padding: 0;
  }
</style>

<style>
   .el-notification.right {
    cursor: pointer;
}
</style>

