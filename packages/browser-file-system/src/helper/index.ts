import { errorBox } from '@alfyn/utils'

import { EXTENSION_MIMETYPE_MAP } from '../constant/mimetypes.ts'

const { mustBeAStringError } = errorBox

const PATH_FLAG = '/'
const EXTENSION_FLAG = '.'

const mustNotBeAPathError = (
  input: string,
) => {
  const isAPath = input.includes(PATH_FLAG)

  if (isAPath)
    throw new Error('EFile: the filename must not be a path.')
}

const mustNotBeADirError = (path: string) => {
  const isADir = path.endsWith(PATH_FLAG)

  if (isADir)
    throw new Error('EFile: the path must not be a dir.')
}

const mustHaveAnExtensionError = (
  filename: string,
) => {
  const isNotExist = !filename.includes(EXTENSION_FLAG)
  const isAtTail = filename.endsWith(EXTENSION_FLAG)
  const isAtHead = filename.startsWith(EXTENSION_FLAG)

  if (isNotExist || isAtTail || isAtHead)
    throw new Error('EFile: the filename must have a right extension.')
}

const pickTheExtension = (
  filename: string,
) => {
  mustBeAStringError(filename, 'EFile', `filename`)
  mustNotBeAPathError(filename)
  mustHaveAnExtensionError(filename)

  return filename
    .split(EXTENSION_FLAG)
    .pop() as string
}

const toMimetypeByExtension = (
  extension: string,
): string | undefined =>
  EXTENSION_MIMETYPE_MAP[extension]

const toDirAndFilenameByPath = (
  path: string,
) => {
  mustBeAStringError(path)
  mustNotBeADirError(path)

  const fragments = path.split(PATH_FLAG)
  const [filename] = fragments.splice(-1, 1, '')

  const dir = fragments.join(PATH_FLAG)

  return [dir, filename]
}

export {
  pickTheExtension,
  toDirAndFilenameByPath,
  toMimetypeByExtension,
}
