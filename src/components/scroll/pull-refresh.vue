<template>
  <div class="pull-refresh">
    <div class="track" :style="style" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd" @touchcancel="onTouchEnd">
      <div class="head">
        <slot v-if="status === 'normal'" name="normal" />
        <slot v-if="status === 'pulling'" name="pulling">
          <span class="text">{{ pullingText }}</span>
        </slot>
        <slot v-if="status === 'loosing'" name="loosing">
          <span class="text">{{ loosingText }}</span>
        </slot>
        <slot v-if="status === 'loading'" name="loading">
          <div class="pull-loading">
            <loading />
            <span>{{ loadingText }}</span>
          </div>
        </slot>
      </div>
      <slot />
    </div>
  </div>
</template>
<script>
import Loading from "@/components/common/loading"
import * as scrollUtils from "@/config/scroll"
export default {
  name: "pull-refresh",
  components: {
    Loading
  },
  props: {
    disabled: Boolean,
    pullingText: {
      type: String,
      default: "下拉即可刷新..."
    },
    loosingText: {
      type: String,
      default: "释放即可刷新..."
    },
    loadingText: {
      type: String,
      default: "加载中..."
    },
    value: {
      type: Boolean,
      required: true
    },
    animationDuration: {
      type: Number,
      default: 300
    },
    headHeight: {
      type: Number,
      default: 50
    }
  },
  data () {
    return {
      status: "normal",
      height: 0,
      duration: 0
    };
  },
  computed: {
    style () {
      return {
        transition: `${this.duration}ms`,
        transform: `translate3d(0,${this.height}px, 0)`
      };
    },

    untouchable () {
      return this.status === "loading" || this.disabled;
    }
  },
  watch: {
    value (val) {
      this.duration = this.animationDuration;
      this.getStatus(val ? this.headHeight : 0, val);
    }
  },
  methods: {
    onTouchStart () {
      if (this.untouchable) {
        return;
      }
      if (this.getCeiling()) {
        this.duration = 0;
        this.touchStart(event);
      }
    },
    onTouchMove () {
      if (this.untouchable) {
        return;
      }

      this.touchMove(event);

      if (!this.ceiling && this.getCeiling()) {
        this.duration = 0;
        this.startY = event.touches[0].clientY;
        this.deltaY = 0;
      }

      if (this.ceiling && this.deltaY >= 0) {
        if (this.direction === "vertical") {
          this.getStatus(this.ease(this.deltaY));
          event.preventDefault();
        }
      }
    },
    onTouchEnd () {
      if (this.untouchable) {
        return;
      }

      if (this.ceiling && this.deltaY) {
        this.duration = this.animationDuration;
        if (this.status === "loosing") {
          this.getStatus(this.headHeight, true);
          this.$emit("input", true);
          this.$emit("refresh");
        } else {
          this.getStatus(0);
        }
      }
    },
    // 是否顶部
    getCeiling () {
      this.ceiling = scrollUtils.getScrollTop(this.scrollEl) === 0;
      return this.ceiling;
    },
    ease (height) {
      const { headHeight } = this;
      return height < headHeight
        ? height
        : height < headHeight * 2
          ? Math.round(headHeight + (height - headHeight) / 2)
          : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4);
    },

    getStatus (height, isLoading) {
      this.height = height;

      const status = isLoading
        ? "loading"
        : height === 0
          ? "normal"
          : height < this.headHeight ? "pulling" : "loosing";

      if (status !== this.status) {
        this.status = status;
      }
    },
    touchStart (event) {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },

    touchMove (event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction =
        this.offsetX > this.offsetY
          ? "horizontal"
          : this.offsetX < this.offsetY ? "vertical" : "";
    }
  },
  mounted () {
    this.scrollEl = scrollUtils.getScrollEventTarget(this.$el);
  }
};
</script>
<style lang="stylus" scoped>
.pull-refresh {
  user-select: none
  overflow: hidden

  // height: 100%
  .track {
    position: relative
  }

  .head {
    width: 100%
    height: 50px
    left: 0
    overflow: hidden
    position: absolute
    text-align: center
    top: -50px
    font-size: 14px
    // color: $gray-dark
    line-height: 50px
  }

  .pull-loading {
    span {
      font-size: 13px
      color: #999
      line-height: 50px
      vertical-align: middle
      display: inline-block
    }

    /deep/ .loading {
      line-height: 50px
      vertical-align: middle
      margin-right: 0.5rem
    }
  }

  .text {
    display: block
  }
}

>>> .loading {
  display: inline-block
}
</style>
