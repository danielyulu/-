<template>
    <div class="pagination-box" v-show="total > 0">
			<el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="currentPage" :page-sizes="tempPageSizes"
					:page-size="pageSize" :layout="layout" :total="total">
			</el-pagination>
    </div>
</template>

<script>
export default {
  name: 'cc-page',
  props: {
    total: {
			type: Number,
			default: 0
    },
    currentPage: {
			type: Number,
			default: 1
    },
    pageSize: {
			type: Number,
			default: 20
    },
    pageSizes: {
			type:[Object, Array],
			default:null
    },
    sizeChange: {
			type:Function,
			default:() => {}
    },
    currentChange: {
			type:Function,
			default:() => {}
    },
    layout: {
			type:String,
			default:'total, sizes, prev, pager, next, jumper'
    }
  },
  data() {
		return {
			tempPageSizes:this.pageSizes || [10, 20, 30, 40, 50]
		};
  }
}
</script>

<style lang="scss" scoped>
</style>
