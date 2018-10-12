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
