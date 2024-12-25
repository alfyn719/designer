import type EBundler from './EBundler'

import EFile from './EFile'

type Path = string
type Files = Record<Path, EFile>
interface IEComponent {
  bundler: EBundler
  name: string
  version: string
  files: Files
  entryPoint?: string
  DEV?: boolean
}

class EComponent {
  DEV: boolean = false

  readonly bundler: EBundler

  name: string

  version: string

  readonly files: Files = {}

  entryPoint: string

  dist: Record<string, any>

  objectURL: string

  constructor(props: IEComponent) {
    const {
      bundler,
      name,
      version,
      files,
      entryPoint = './index.tsx',
      DEV = false,
    } = props

    this.DEV = DEV
    this.bundler = bundler
    this.name = name
    this.version = version
    this.files = files
    this.entryPoint = entryPoint
  }

  // files crud

  createFile(rawCode: string = '', path: Path) {
    this.files[path] = new EFile(rawCode, path)
  }

  readFile(path: Path) {
    return this.files[path]
  }

  updateFile(rawCode: string = '', path: Path) {
    if (!(path in this.files)) {
      return
    }

    this.files[path].rawCode = rawCode
  }

  deleteFile(path: Path) {
    delete this.files[path]
  }

  revoke() {}

  public getModuleName() {
    let { name, version } = this

    name = name.replaceAll('.', '_')
    version = version.replaceAll('.', '_')

    return `${name}_${version}`
  }

  public bundle(namespace?: string) {
    const globalName = namespace
      ? `${namespace}.${this.getModuleName()}`
      : ''

    return this.bundler.build(this, globalName)
  }

  private getFileBy(path: string) {
    const file = this.files[path]

    if (!file) {
      throw new Error('The file does not exist in the files')
    }

    return file
  }

  public getObjectURLBy(path: string) {
    return this.getFileBy(path).objectURL
  }

  public getRawCodeBy(path: string) {
    return this.getFileBy(path).rawCode
  }
}

export default EComponent
