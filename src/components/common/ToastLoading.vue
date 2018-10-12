<template>
  <div :class="getStyle()" :style="style">
    <span :class="type === 'circular' ? 'van-loading__spinner van-loading__spinner--circular' : 'van-loading__spinner van-loading__spinner--spinner'">
      <i v-for="(item, index) in (type === 'spinner' ? 12 : 0)" :key="index" />
      <svg v-if="type === 'circular'" class="van-loading__circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
  </div>
</template>
<script>

const COMPONENT_NAME = 'loading'
export default {
  name: COMPONENT_NAME,
  props: {
    size: String,
    type: {
      type: String,
      default: 'circular'
    },
    color: {
      type: String,
      default: 'black'
    }
  },
  methods: {
    getStyle () {
      var style_name = 'van-loading'
      if (this.type === 'circular') {
        style_name = style_name + ' van-loading--circular'
      } else {
        style_name = style_name + ' van-loading--spinner'
      }
      if (this.color === 'white') {
        style_name += ' van-loading--white'
      }
      return style_name
    }
  },

  computed: {
    style () {
      return this.size ? {
        width: this.size,
        height: this.size
      } : {};
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
/* *自定义样式 */
@keyframes van-rotate {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}

.van-loading {
  width: 30px
  height: 30px
  z-index: 0
  font-size: 0
  line-height: 0
  position: relative
  vertical-align: middle

  &--circle {
    width: 16px
    height: 16px
  }

  &__spinner {
    z-index: -1
    width: 100%
    height: 100%
    position: relative
    display: inline-block
    box-sizing: border-box
    animation: van-rotate 0.8s linear infinite

    &--circle {
      border-radius: 100%
      border: 3px solid transparent
    }

    &--gradient-circle {
      background-size: contain
    }

    &--spinner {
      animation-timing-function: steps(12)

      i {
        top: 0
        left: 0
        width: 100%
        height: 100%
        position: absolute

        &::before {
          width: 2px
          height: 25%
          content: ' '
          display: block
          margin: 0 auto
          border-radius: 40%
          background-color: currentColor
        }
      }
    }

    &--circular {
      animation-duration: 2s
    }
  }

  &__circular {
    width: 100%
    height: 100%

    circle {
      stroke-width: 3
      stroke-linecap: round
      animation: van-circular 1.5s ease-in-out infinite
    }
  }

  &--black {
    .van-loading__spinner--circle {
      border-color: $gray
      border-top-color: $gray-darker
    }

    .van-loading__spinner--gradient-circle {
      background-image: url('https://img.yzcdn.cn/vant/gradient-circle-black.png')
    }

    .van-loading__spinner--spinner {
      color: $gray
    }

    circle {
      stroke: $gray
    }
  }

  &--white {
    .van-loading__spinner--circle {
      border-color: rgba(0, 0, 0, 0.1)
      border-top-color: rgba(255, 255, 255, 0.7)
    }

    .van-loading__spinner--gradient-circle {
      background-image: url('https://img.yzcdn.cn/vant/gradient-circle-white.png')
    }

    .van-loading__spinner--spinner {
      color: #fff
    }

    circle {
      stroke: $white
    }
  }
}

@keyframes van-circular {
  0% {
    stroke-dasharray: 1, 200
    stroke-dashoffset: 0
  }

  50% {
    stroke-dasharray: 90, 150
    stroke-dashoffset: -40
  }

  100% {
    stroke-dasharray: 90, 150
    stroke-dashoffset: -120
  }
}

@for $i from 1 to 12 {
  .van-loading__spinner--spinner i:nth-of-type($i) {
    opacity: calc(1 - (0.75 / 12) * ($i - 1))
    transform: rotate(calc($i * 30deg))
  }
}
</style>
