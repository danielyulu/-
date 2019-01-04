<template>
  <transition name="slide">
    <div ref="condition" v-bind="$props" :class="['cc-condition', {'borderBottom':isClearBtn}, {'el-form--label-left':isLeft}]" >
      <div class="el-form-item" :key="index" v-for="(item, index) in dataSource">
        <label class="el-form-item__label" :style="{'width': wdith + 'px'}">{{item.title}}</label>
        <div class="el-form-item__content" :style="{'margin-left': wdith + 'px'}">
          <template v-for="item2 in item.options">
            <el-button :class="['btn-label', item2.selected ? 'active' : null]" @click="handleSelect(item2, item, $event), item.click ? item.click(item2) : null">{{ item2.label }}</el-button>
          </template>
        </div>
      </div>
      <div class="clear-btn">
        <el-button type="text" v-if="isClearBtn" @click="clearCondition">清除条件</el-button>
      </div>

    </div>

  </transition>
</template>

<script>
  export default {
    name: 'cc-condition',
    data() {
      return {
        
      }
    },
    created() {
    },
    mounted() {
      let el = this.$refs.condition;
      el.style.height = (el.scrollHeight || 40) + 'px';
    },
    props: {
      dataSource: {
        type: [Object, Array],
        default: []
      },
      isClearBtn: {
        type: Boolean,
        default: true
      },
      wdith: {
        type: Number,
        default: 120,
      },
      isLeft: {
        type: Boolean,
        default: false
      },
      radio: {
        type: Boolean,
        default: false,
      }
    },
    methods: {
      handleSelect(item, parent, event) {
        if(this.radio) {//单选模式
          if(item.selected && item.value != 'all') {
            item.selected = false;
            parent.options[0].selected = true;
          } else {
            item.selected = true;
            parent.options.forEach((o) => {
              if (o.value != item.value) {
                o.selected = false;
              }
            });
          }
        } else {
          item.selected = !item.selected;
          if (item.value == 'all' || !item.value) {
            if (item.selected) {
              parent.options.forEach((o) => {
                if (o.value != 'all' || !o.value) {
                  o.selected = false;
                }
              });
            } else {
              item.selected = true;
            }
          } else if (item.selected && parent.options[0].selected && (parent.options[0].value == 'all' || !parent.options[
              0].value)) {
            parent.options[0].selected = false;
          } else if (parent.options.every(item => item.selected == false)) {
            parent.options[0].selected = true;
          }
        }
      },

      // 获取选中的属性
      getValues() {
        let values = {};
        this.dataSource.forEach(item => {
          values[item.key] = [];
          item.options.forEach(item2 => {

            if (item2.selected) {
              if (item2.value == 'all' || !item2.value) {
                values[item.key] = null;
              } else {
                values[item.key].push(item2.value);
              }
            }
          })
        });
        return values;
      },
      setValues(values, key) {
        if(!values || values.length == 0) {
          return;
        }

        this.dataSource.forEach(parent => {
          if(parent.key == key) {
            parent.options[0].selected = false;
            parent.options.forEach((o) => {
              
              if (values.filter(item => o.value == item).length > 0) {
                o.selected = true;
              }
            });
          }
        });
        
      },
      // 过渡结束
      transitionEnd() {
        this.$bus.$emit('adaptive');
        this.$emit('fold');
      },
      clearCondition() {
        //清除条件
        this.dataSource.forEach(item => {
          item.options.forEach(item2 => {
            if (item2.value == 'all' || !item2.value) {
              item2.selected = true;
            } else {
              item2.selected = false;
            }
          })
        });
        this.$emit('clear-condition');
      },

      // 数据初始化
      init() {
        this.dataSource.forEach(item => {
          item.options.forEach(item2 => {
            if (item2.value == 'all' || !item2.value) {
              item2.selected = true;
            } else {
              item2.selected = false;
            }
          })
        })
      }
    }
  }

</script>

<style lang="scss">
  @import "~@/assets/style/sass/_variable";
  @import "~@/assets/style/sass/_mixins"; 
  .borderBottom {
    border-bottom: 1px solid $border-color;
  }
  .cc-condition {
    height:40px;
    
    .btn-label {
      min-width: 56px;
      padding: 4px 6px;
      font-size: 14px;
      background-color: $button-gray;
      border-radius: 3px;
      cursor: pointer;
      transition: .2s;
      &:hover {
        background: lighten($button-gray, 2%);
      }
      &.active {
        background-color: $color-primary;
        color: #fff;
        border-color: $color-primary;
        &:hover {
          background: lighten($color-primary, 6%);
        }
      }
    }
   }

  .clear-btn {
    float: right;
    padding-right: 10px;
  }

</style>

