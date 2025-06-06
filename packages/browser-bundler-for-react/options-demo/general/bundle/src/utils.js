console.warn('run smt')

const logA = () => {
  console.warn('this is the A')
}

const logB = () => {
  console.warn('this is the B')
}

const logC = () => {
  console.warn('this is the C')
}

export default logA

export { logB, logC }
