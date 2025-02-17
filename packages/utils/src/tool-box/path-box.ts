const ABSOLUTE_PATH_PREFIX = [
  'http://',
  'https://',
  'ws://',
  'ws://',
  'ftp://',
  'blob:',
]

const isFullPath = (
  path: string,
) =>
  ABSOLUTE_PATH_PREFIX.some(protocol => path.startsWith(protocol))

const toFullPath = (
  path: string,
) =>
  (new URL(path, location.href)).href

// TODO change function name to dir by full path
const toFullPathOfDir = (path: string) => {
  const _URL = new URL(path, location.href)

  const { pathname } = _URL

  if (!pathname.endsWith('/')) {
    _URL.pathname = pathname
      .split('/')
      .toSpliced(-1, 1, '')
      .join('/')
  }

  return _URL.href
}

const ROOT_PREFIX = '/'
const RELATIVE_PREFIX = './'
const NO_PREFIX = ''

const unshiftPath = (
  fragment: string,
  path: string,
) => {
  if (isFullPath(path))
    return path

  const prefix = path.startsWith(ROOT_PREFIX)
    ? ROOT_PREFIX
    : path.startsWith(RELATIVE_PREFIX)
      ? RELATIVE_PREFIX
      : NO_PREFIX

  return path.replace(prefix, `${prefix}${fragment}/`)
}

const toFileObjectURL = (
  ctx: string,
  name: string = 'anonymous',
  type?: string,
) =>
  URL.createObjectURL(new File([ctx], name, { type }))

const toFileObjectURLCurrying = (
  name: string,
  type?: string,
) =>
  (
    ctx: string,
  ) =>
    toFileObjectURL(ctx, name, type)

export {
  isFullPath,
  toFileObjectURL,
  toFileObjectURLCurrying,
  toFullPath,
  toFullPathOfDir,
  unshiftPath,
}
