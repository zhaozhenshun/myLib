<template>
  <div style="height:100%">
    <pull-refresh v-model="refresh" @refresh="onRefresh">
      <scroll-list v-model="loading" :finished="finished" @load="onLoad" ref='scrollList'>
        <slot></slot>
        <div class="no-data" v-if="finished">
          <span>没有更多数据了...</span>
        </div>
      </scroll-list>
    </pull-refresh>
  </div>
</template>
<script>
import ScrollList from './list'
import PullRefresh from './pull-refresh'
import * as utils from '@/config/scroll'
export default {
  name: 'scroll',
  props: {

  },
  data () {
    return {
      refresh: false,
      loading: false,
      finished: false
    }
  },
  methods: {
    onRefresh () {
      setTimeout(() => {
        this.$emit('refresh', this.refreshDone)
      }, 300)
    },
    refreshDone () {
      this.refresh = false
      this.loading = false
      this.finished = false
      setTimeout(() => {
        this.$refs.scrollList.check()
      }, 0)
    },
    loadingDone () {
      this.loading = false
    },
    finishedDone () {
      this.finished = true
    },
    onLoad () {
      setTimeout(() => {
        this.$emit('onLoad', this.loadingDone, this.finishedDone)
      }, 0)
    },
    getScrollTop () {
      return utils.getScrollTop(this.$refs.scrollList.scroller)
    },
    setScrollTop (val) {
      utils.setScrollTop(this.$refs.scrollList.scroller, val)
    }
  },
  components: {
    ScrollList,
    PullRefresh
  }
}
</script>
<style lang="stylus" scoped>
.no-data {
  text-align: center;

  span {
    line-height: 50px;
    vertical-align: middle;
    font-size: 13px;
  }
}
</style>
