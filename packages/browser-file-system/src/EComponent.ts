import type { EFile } from './EFile.ts'
import { toDirAndFilenameByPath } from './helper'

type Dir = string
type Filename = string

type Files = Record<Dir, Record<Filename, EFile>>

interface EComponentProps {
  name: string
  files: Files
}

class EComponent {
  constructor(props: EComponentProps) {
    const { name, files } = props

    this.name = name
    this.files = files
  }

  // ============== name

  private _name: string = ''

  get name() {
    return this._name
  }

  set name(aName: any) {
    this._name = String(aName)
  }

  // ============== files

  private readonly _files: Files = {}

  get files() {
    return this._files
  }

  private set files(files: Files) {
    const filePairs = Object.entries(files)

    for (const [path, files] of filePairs) {
      this._files[path] = files
    }
  }

  //        ======= dir

  public createDir(dir: Dir) {
    if (dir in this._files) {
      return
    }

    this._files[dir] = {}
  }

  public deleteDir(dir: Dir) {
    delete this._files[dir]
  }

  //        ======= file

  public isExistTheFile(path: string) {
    const [dir, filename] = toDirAndFilenameByPath(path)

    const isExistDir = dir in this._files
    const isExistFile = isExistDir && (filename in this._files[dir])

    const file = isExistFile
      ? this._files[dir][filename]
      : null

    return {
      dir,
      filename,

      isExistDir,
      isExistFile,

      file,
    }
  }

  public getFile(path: string) {
    return this.isExistTheFile(path).file
  }

  public addFile(path: string, file: EFile) {
    const { isExistFile, dir, filename } = this.isExistTheFile(path)

    if (isExistFile)
      return

    (this._files[dir] ||= {})[filename] = file
  }

  public deleteFile(path: string) {
    const { dir, filename, file } = this.isExistTheFile(path)

    delete this._files[dir][filename]

    return file
  }

  /**
   * @param from is the original location of the file
   * @param to is the destination location
   */
  public moveFile(from: string, to: string) {
    if (from === to)
      return

    // = Y 1 is there the same name file in to ?

    const { isExistFile } = this.isExistTheFile(to)

    if (isExistFile)
      return

    // = Y 2 is there exist the file by from ?

    const file = this.deleteFile(from)

    if (!file)
      return

    // =

    this.addFile(to, file)
  }

  // ============== entry point

  private _entryPoint: string | null = null

  get entryPoint(): string | null {
    return this._entryPoint
  }

  set entryPoint(path: string) {
    const { isExistFile } = this.isExistTheFile(path)

    this._entryPoint = isExistFile
      ? path
      : null
  }
}

export {
  EComponent,
}
