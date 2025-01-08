const mustBeAStringError = (
  input: any,
  scope: string = 'must be a string error',
  name: string = '',
) => {
  if (typeof input !== 'string') {
    throw new TypeError(`${scope}: the ${name} must be a string!`)
  }
}

export { mustBeAStringError }
