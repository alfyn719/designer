import EFile from './EFile'

type Path = string
type Files = Record<Path, Array<EFile>>

interface IEComponent {
  DEV?: boolean
  name: string
  files: Files
  entryPoint?: string
}

class EComponent {
  public name: string

  private readonly files: Files = {}

  private entryPoint: string | undefined

  private DEV: boolean = false

  constructor(props: IEComponent) {
    const {
      DEV = false,
      name,
    } = props

    this.DEV = DEV
    this.name = name
  }

  public createFile(path: Path, name: string) {
    const thePathFiles = this.files[path] ||= []

    if (this.isExist(path, name)) {
      throw new Error(`名称为 '${name}' 的文件已存在`)
    }

    const file = new EFile(name)
    thePathFiles.push(file)

    return file
  }

  public readFile(path: Path) {
    return this.files[path]
  }

  public deleteFile(path: Path) {
    delete this.files[path]
  }

  public getEntryPoint() {
    return this.entryPoint
  }

  public setEntryPoint(path: Path, name: string) {
    this.entryPoint = `${path}/${name}`
  }

  public isExist(path: Path, name: string) {
    const thePathFiles = this.files[path]

    if (!thePathFiles) {
      return false
    }

    return thePathFiles
      .map(file => file.name)
      .includes(name)
  }

  public isDEV() {
    return this.DEV
  }
}

export default EComponent
