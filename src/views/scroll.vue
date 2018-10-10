<template>
  <div style="height:100vh">
    <list-scroll @refresh="onRefresh" @onLoad="onLoad">
      <div class="child_item" v-for="(item,index) in list" :key="index">
        {{ item }}
      </div>
    </list-scroll>
  </div>
</template>
<script>
import ListScroll from '@/components/scroll'

let listArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export default {
  name: 'scroll',
  components: {
    ListScroll
  },
  data () {
    return {
      content: [],
      list: [],
      loading: false,
      finished: false,
      refresh: false
    }
  },
  methods: {
    onRefresh (done) {
      this.list = []
      done()
    },
    onLoad (done, finished) {
      console.log('onLoad------')
      setTimeout(() => {
        this.list = this.list.concat(listArr)
        done()
        if (this.list.length > 100) {
          finished()
        }
      }, 500)
    }
  }
}
</script>
<style scoped>
.child_item {
  height: 50px;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid fuchsia;
}
</style>
