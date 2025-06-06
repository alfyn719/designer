// import logA from './utils.js'
//
// logA()

console.warn('Hello World!')

import(`./utils.js`).then((res) => {
  console.warn(res.default())
  console.warn(res.logB())
  console.warn(res.logC())
})

import(`./utils.js`).then((res) => {
  console.warn(res.logC())
})

const a = 'an A'

export { a }
