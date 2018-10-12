<template>
  <transition name="van-fade">
    <div v-show="value" class="van-toast">
      <div v-if="style==='text'">{{message}}</div>
      <div v-if="style==='html'" v-html="message"></div>
      <!-- icon -->
      <template>
        <toast-loading v-if="type === 'loading'" color="white" :type="loadingType" />
        <div v-if="isDef(message)" :class="'van-toast__text'">{{ message }}</div>
      </template>
    </div>
  </transition>
</template>
<script>
import ToastLoading from '@/components/common/ToastLoading'
export default {
  name: 'Toast',
  components: {
    ToastLoading
  },
  props: {
    forbidClick: Boolean,
    message: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    loadingType: {
      type: String,
      default: 'circular'
    },
    position: {
      type: String,
      default: 'middle'
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      clickable: false
    };
  },

  computed: {
    style () {
      return STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type;
    }
  },

  mounted () {
    this.toggleClickale();
  },

  watch: {
    value () {
      this.toggleClickale();
    },

    forbidClick () {
      this.toggleClickale();
    }
  },

  methods: {
    toggleClickale () {
      const clickable = this.value && this.forbidClick;
      if (this.clickable !== clickable) {
        this.clickable = clickable;
        const action = clickable ? 'add' : 'remove';
        document.body.classList[action]('van-toast--unclickable');
      }
    },
    isDef (val) {
      return val !== undefined && val !== null
    }
  }
}
</script>
<style lang="stylus" scoped>
@keyframes van-fade-in {
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes van-fade-out {
  from {
    opacity: 1
  }

  to {
    opacity: 0
  }
}

.van-fade {
  &-enter-active {
    animation: 0.3s van-fade-in
  }

  &-leave-active {
    animation: 0.3s van-fade-out
  }
}

.van-toast {
  position: fixed
  top: 50%
  left: 50%
  display: flex
  color: $white
  font-size: 12px
  line-height: 1.2
  border-radius: 5px
  word-break: break-all
  align-items: center
  justify-content: center
  flex-direction: column
  box-sizing: border-box
  transform: translate3d(-50%, -50%, 0)
  background-color: rgba(0, 0, 0, 0.7)

  &--unclickable {
    pointer-events: none
  }

  &--text {
    padding: 12px
    min-width: 220px
  }

  &--default {
    width: 120px
    min-height: 120px
    padding: 15px

    .van-toast__icon {
      font-size: 50px
    }

    .van-loading {
      margin: 10px 0 5px
    }

    .van-toast__text {
      font-size: 14px
      padding-top: 10px
    }
  }

  &--top {
    top: 50px
  }

  &--bottom {
    top: auto
    bottom: 50px
  }
}
</style>
