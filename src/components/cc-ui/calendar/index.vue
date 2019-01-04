<template>
  <!--竖线 + 标题-->
  <div class="calendar-line">
    <div class="left">
      <el-button type="text" @click="getBeforeDate">
        <i class="el-icon-arrow-left" ></i>前1天
      </el-button>
    </div>
    <span>
      {{dateValue | dateFormat(format)}} ({{weeks[week]}})
    </span>
    <span>
      <i class="el-icon-date" style="cursor:pointer;" ref="iconDate" @click="showCalendar"></i>
      
      <el-date-picker
        class="hidden"
        ref="calendar"
        v-model="tempDateValue"
        v-show="true"
        align="right"
        type="date"
        value-format="yyyy-MM-dd"
        format="yyyy-MM-dd"
        @change="test"
        >
      </el-date-picker>
    </span>
    <div class="right">
      <el-button type="text" @click="setDayAfter">后1天
        <i class="el-icon-arrow-right el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
  import {
    dateFormat,
    getWeekByDate,
    parseDate,
  } from "@/utils/dateUtil";
  import moment from 'moment';
  export default {
    name: 'cc-calendar',
    created() {
    },
    data() {
      return {
        weeks: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        week:getWeekByDate(this.dateValue),
        tempDateValue:'',
      };
    },
    props: {
      format:{
        type: String,
        default: 'YYYY-MM-DD'
      },
      dateValue: {
        type: String,
        default: null,
      },
      click: {
        type:Function,
        default:null,
      }
    },
    mounted() {
      let calendar = this.$refs['calendar'].$el;
      let iconDate = this.$refs['iconDate'];
      calendar.style.position = 'absolute';
      calendar.style.left = iconDate.offsetLeft + 15 + 'px';
      calendar.style.top = iconDate.offsetTop - 15 + 'px';
    },
    methods: {
      setDayAfter() {
        let newDate = moment(this.dateValue, this.format).add(1, 'days').format(this.format);
        this.week = getWeekByDate(newDate);
        this.click && this.click(newDate);
      },
      getBeforeDate() {
        let newDate = moment(this.dateValue, this.format).add(-1, 'days').format(this.format);
        this.week = getWeekByDate(newDate);
        this.click && this.click(newDate)
      },
      test(val) {
        this.click && this.click(val)
      },
      showCalendar() {
        this.$refs['calendar'].handleFocus();
      }
    },
    watch:{
    }
  }

</script>

<style lang="scss" scoped>
  @import "~@/assets/style/sass/_variable";

  .calendar-line {
    padding: 0 10px 0px 10px;
    height: 40px;
    line-height: 40px;
    width: 100%;
    vertical-align: middle;
    text-align: center; // margin: 0 auto;
    font-size: 15px;
    font-weight: bold;
    span {
      margin: 0 5px;
    }
    
    .left {
      float: left; // left: 260px;
      // position: absolute;
    }
    .right {
      float: right; // position: absolute;
      // right: 30px;
    }
  }
  .hidden {
    width:1px;
    visibility: hidden;
  }
</style>

