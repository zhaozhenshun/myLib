<template>
  <div class="list">
    <slot></slot>
    <div v-show="loading" class="list__loading">
      <slot name="loading">
        <loading />
        <span class="list__loading-text">{{ loadingText }}</span>
      </slot>

    </div>
  </div>
</template>
<script>
import utils from '@/config/scroll'
import Loading from '@/components/common/loading'
import { on, off } from '@/config/event'
export default {
  name: 'list',

  model: {
    prop: 'loading'
  },

  props: {
    loading: Boolean,
    finished: Boolean,
    onceCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    },
    loadingText: {
      type: String,
      default: '加载中'
    }
  },
  components: {
    Loading
  },

  mounted () {
    this.scroller = utils.getScrollEventTarget(this.$el);
    this.handler(true);

    if (this.onceCheck) {
      this.$nextTick(this.check);
    }
  },
  destroyed () {
    this.handler(false);
  },

  activated () {
    this.handler(true);
  },

  deactivated () {
    this.handler(false);
  },
  watch: {
    loading () {
      this.$nextTick(this.check);
    },

    finished () {
      this.$nextTick(this.check);
    }
  },
  methods: {
    check () {
      if (this.loading || this.finished) {
        return;
      }

      const el = this.$el;
      const { scroller } = this;
      const scrollerHeight = utils.getVisibleHeight(scroller);

      /* istanbul ignore next */
      if (!scrollerHeight || utils.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
        return;
      }

      const scrollTop = utils.getScrollTop(scroller);
      const targetBottom = scrollTop + scrollerHeight;

      let reachBottom = false;

      /* istanbul ignore next */
      if (el === scroller) {
        reachBottom = scroller.scrollHeight - targetBottom < this.offset;
      } else {
        const elBottom =
          utils.getElementTop(el) -
          utils.getElementTop(scroller) +
          utils.getVisibleHeight(el);
        reachBottom = elBottom - scrollerHeight < this.offset;
      }

      /* istanbul ignore else */
      if (reachBottom) {
        this.$emit('input', true);
        this.$emit('load');
      }
    },
    handler (bind) {
      /* istanbul ignore else */
      if (this.binded !== bind) {
        this.binded = bind;
        (bind ? on : off)(this.scroller, 'scroll', this.check);
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.list {
  .list__loading {
    text-align: center
  }
  .list__loading .loading, .list__loading-text {
    display: inline-block
    vertical-align: middle
  }
  .list__loading .loading {
    margin-right: 0.5rem
  }
  .list__loading-text {
    font-size: 13px
    color: #999
    line-height: 50px
  }
}
</style>
