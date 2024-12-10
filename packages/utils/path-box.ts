import { resolve } from 'uri-js'

const ABSOLUTE_PATH_PREFIX = [
  'http://',
  'https://',
  'ws://',
  'ws://',
  'blob:',
]

const ROOT_PREFIX = '/'
const RELATIVE_PREFIX = './'
const NO_PREFIX = ''

const isAbsolutePath = (
  path: string,
) =>
  ABSOLUTE_PATH_PREFIX.some(protocol => path.startsWith(protocol))

const unshiftPath = (
  fragment: string,
  path: string,
) => {
  if (isAbsolutePath(path))
    return path

  const prefix = path.startsWith(ROOT_PREFIX)
    ? ROOT_PREFIX
    : path.startsWith(RELATIVE_PREFIX)
      ? RELATIVE_PREFIX
      : NO_PREFIX

  return path.replace(prefix, `${prefix}${fragment}/`)
}

const fileTextToPath = (
  name: string,
  type: string,
  raw: string,
) =>
  URL.createObjectURL(new File([raw], name, { type }))

const fileTextToPathCurrying = (
  name: string,
  type: string,
) =>
  (
    raw: string,
  ) =>
    fileTextToPath(name, type, raw)

const toFullPath = (
  path: string,
) => {
  if (isAbsolutePath(path))
    return path

  const { href } = location

  return resolve(href, path)
}

export {
  fileTextToPath,
  fileTextToPathCurrying,
  isAbsolutePath,
  toFullPath,
  unshiftPath,
}
