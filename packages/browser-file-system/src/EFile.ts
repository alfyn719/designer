import { pickTheExtension, toMimetypeByExtension } from './helper'

interface EFileProps {
  content: string
  name: string
}

class EFile {
  constructor(props: EFileProps) {
    const { content, name } = props

    this.content = content
    this.name = name
  }

  // ============== content

  private _content: string = ''

  get content() {
    return this._content
  }

  set content(ctx: any) {
    this._content = String(ctx)
  }

  // ============== name

  private _name: string = ''

  get name() {
    return this._name
  }

  set name(aName: string) {
    this.extension = this._name = String(aName)
  }

  // ============== extension

  private _extension: string = ''

  get extension() {
    return this._extension
  }

  private set extension(aName: string) {
    try {
      this._extension = pickTheExtension(aName)
    }
    catch (e) {
      console.warn(e)

      this._extension = ''
    }
    finally {
      this.mimetype = this._extension
    }
  }

  // ============== mimetype

  private _mimetype: string = ''

  get mimetype() {
    return this._mimetype
  }

  private set mimetype(aExtension: string) {
    if (!aExtension) {
      this._mimetype = ''
      return
    }

    this._mimetype = toMimetypeByExtension(aExtension) ?? ''
  }
}

export {
  EFile,
}
