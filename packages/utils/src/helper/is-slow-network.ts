/**
 * connection 类型：
 * https://developer.mozilla.org/zh-CN/docs/Web/API/NetworkInformation
 */

const isSlowNetwork = navigator.connection
  ? navigator.connection.saveData
  || (
    navigator.connection.type !== 'wifi'
    && navigator.connection.type !== 'ethernet'
    && /[23]g/.test(navigator.connection.effectiveType)
  )
  : false

export { isSlowNetwork }
