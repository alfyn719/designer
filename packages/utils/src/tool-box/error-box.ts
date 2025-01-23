const mustBeAStringError = (
  input: any,
  scope: string = 'must be a string error',
  name: string = '',
) => {
  if (typeof input !== 'string') {
    throw new TypeError(`${scope}: the ${name} must be a string!`)
  }
}

/**
 *
 */

const mustNotBeAPathError = (
  input: string,
  scope: string = 'must be a string error',
  name: string = '',
) => {
  const isAPath = input.includes('/')

  if (isAPath)
    throw new Error('EFile: the filename must not be a path.')
}

export { mustBeAStringError }
