import Vue from 'vue'
import VueToast from './Toast'
import { isObj } from '../../config/until';

const defaultOption = {
  type: 'text',
  mask: false,
  duration: 3000,
  value: true,
  message: '',
  position: 'middle',
  loadingType: 'circular',
  forbidClick: false,
  overlayStyle: {}
}

const parseOption = message => isObj(message) ? message : { message }

let queue = []
let singleton = true
let currentOptions = { ...defaultOption }
// 创建单列
function createInstance () {
  if (!queue.length || !singleton) {
    const toast = new (Vue.extend(VueToast))({
      el: document.createElement('div')
    })
    document.body.appendChild(toast)
    queue.push(toast)
  }
  return queue[length - 1]
}
function merageOption (option) {
  option.overlayStyle = option.mask
  return option
}

function Toast (option = {}) {
  const instance = createInstance()
  option = {
    ...currentOptions,
    ...parseOption(Option),
    clear () {
      instance.value = false
    }
  }
  Object.assign(instance, merageOption(option))
  clearTimeout(instance.timer)

  if (option.duration > 0) {
    instance.timer = setTimeout(() => {
      instance.clear()
    }, option.duration)
  }
  return instance
}

Toast.clear = function (all) {
  if (queue.length) {
    if (all) {
      queue.forEach((item) => {
        item.clear()
      })
      queue = []
    } else if (singleton) {
      queue[0].clear()
    } else {
      queue.shift().clear()
    }
  }
}

const createMethod = type => options => Toast({ type, ...parseOption(options) });

['loading'].forEach(method => {
  Toast[method] = createMethod(method);
})

Toast.setDefaultOptions = options => {
  Object.assign(currentOptions, options)
}

Toast.restDefaultOptions = () => {
  Object.assign(currentOptions, defaultOption)
}

Toast.allowMultiple = (allow = true) => {
  singleton = !allow
}

Toast.install = () => {
  Vue.use(VueToast)
}

Vue.prototype.$toast = Toast

export default Toast
