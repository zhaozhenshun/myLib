
export function isObj (obj) {
  const type = typeof obj
  return type !== null && (type === 'object' || type === 'function')
}
