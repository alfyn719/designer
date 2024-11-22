class EFile {
  private _rawCode: string = ''

  get rawCode() {
    return this._rawCode
  }

  set rawCode(rawCode) {
    this._rawCode = rawCode

    // TODO 媒体文件才需要放到 object url 中
    if (this.extension === 'png') {
      this.updateURL()
    }
  }

  objectURL: string | undefined

  path: string | undefined

  filename: string

  extension: string

  constructor(rawCode: string, path: string) {
    const filename = EFile.getFilenameBy(path)
    const extension = EFile.getExtensionBy(filename)

    this.rawCode = rawCode
    this.path = path
    this.filename = filename
    this.extension = extension
  }

  updateInfo(path: string) {
    this.path = path
    this.filename = EFile.getFilenameBy(path)
    this.extension = EFile.getExtensionBy(this.filename)
  }

  updateURL() {
    if (this.objectURL)
      URL.revokeObjectURL(this.objectURL)

    this.objectURL = EFile.createObjectURL(this.rawCode, this.filename, this.extension)
  }

  // ======= static

  static getFilenameBy(path: string) {
    const filename = path.split('/').pop()

    if (!filename) {
      throw new Error('Invalid file path')
    }

    return filename
  }

  static getExtensionBy(filename: string) {
    const extension = filename.split('.').pop()

    if (!extension) {
      throw new Error('Invalid file name')
    }

    return extension
  }

  // TODO css
  static getMIMEBy(extension: string) {
    console.log('extension', extension)

    return 'application/javascript'
  }

  static createObjectURL(rawCode: string, filename: string, extension: string) {
    const file = new File(
      [rawCode],
      filename,
      { type: EFile.getMIMEBy(extension) },
    )

    return URL.createObjectURL(file)
  }
}

export default EFile
