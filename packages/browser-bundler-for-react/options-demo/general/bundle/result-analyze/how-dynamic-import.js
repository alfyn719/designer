// 逗号运算符 的特点是 “先求左边、丢弃左边的结果，再求右边并把右边的结果当整个表达式的值”

// (0, thatFunction) 这一 trick，(0, fn[…]) 的作用是“丢掉它的 this 绑定”，
//  强制以后面的函数在全局或 undefined 的上下文里运行——和 ES Module 里 import 的行为更像。

/**
 * __esm
 * __init 取出 fn 的第一个 key 的函数并调用，返回调用值
 * @param fn
 * @param res
 * @returns {function(): *}
 * @private
 */

const __esm = (
  fn,
  res,
) => {
  return function __init() {
    if (fn) {
      // (0, fn[key])(fn = 0)，
      // 1. (0, fn[key]) 这里用逗号运算符丢掉了 0，等价于直接拿到 fn[key]（也就是模块体函数），并保证它的 this 被置为 undefined ；
      // 2. (fn = 0) 是把 fn = 0 作为调用参数，但真正目的是利用赋值的副作用把 fn 清空，参数本身并不被模块体使用；

      res = (0, fn[Object.getOwnPropertyNames(fn)[0]])(fn = 0)
    }

    return res
  }
}

const __export = (
  target,
  all,
) => {
  for (const name in all) {
    Object.defineProperty(
      target,
      name,
      {
        get: all[name],
        enumerable: true,
      },
    )
  }
}

// src/utils.js
const utils_exports = {}
let logA, logB, logC, utils_default

__export(utils_exports, {
  default: () => utils_default,
  logB: () => logB,
  logC: () => logC,
})

const init_utils = __esm({
  'src/utils.js': function () {
    'use strict'
    console.warn('run smt')

    logA = () => {
      console.warn('this is the A')
    }
    logB = () => {
      console.warn('this is the B')
    }
    logC = () => {
      console.warn('this is the C')
    }

    utils_default = logA
  },
})

// src/app.js
console.warn('Hello World!')

Promise
  .resolve()
  .then(
    () => {
      // init_utils 延迟执行，顶层执行要等到真正调用的时候，并且永远异步（总是下一轮微任务才跑）
      return (
        init_utils(),
        utils_exports
      )
    },
  )
  .then(
    (res) => {
      console.warn(res.default())
      console.warn(res.logB())
      console.warn(res.logC())
    },
  )

Promise
  .resolve()
  .then(
    () => {
      // init_utils 只执行一次，
      //  多次 import() 就会多次执行，此时 fn = 0 不会再次执行
      return (
        init_utils(),
        utils_exports
      )
    },
  )
  .then(
    (res) => {
      console.warn(res.logC())
    },
  )

const a = 'an A'

export {
  a,
}
