export const getScrollEventTarget = (element, rootParent = window) => {
  let currentNode = element
  // bugfix, see http://w3help.org/zh-cn/causes/SD9013 and http://stackoverflow.com/questions/17016740/onscroll-function-is-not-working-for-chrome
  while (
    currentNode &&
    currentNode.tagName !== 'HTML' &&
    currentNode.tagName !== 'BODY' &&
    currentNode.nodeType === 1 &&
    currentNode !== rootParent
  ) {
    const overflowY = this.getComputedStyle(currentNode).overflowY
    if (overflowY === 'scroll' || overflowY === 'auto') {
      return currentNode
    }
    currentNode = currentNode.parentNode
  }
  return rootParent
}

export const getScrollTop = (element) => {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset
}

export const setScrollTop = (element, value) => {
  'scrollTop' in element
    ? (element.scrollTop = value)
    : element.scrollTo(element.scrollX, value)
}

export const getElementTop = (element) => {
  return (
    (element === window ? 0 : element.getBoundingClientRect().top) +
    this.getScrollTop(window)
  )
}

export const getVisibleHeight = (element) => {
  return element === window
    ? element.innerHeight
    : element.getBoundingClientRect().height
}

export const getComputedStyle = document.defaultView.getComputedStyle.bind(
  document.defaultView
)
