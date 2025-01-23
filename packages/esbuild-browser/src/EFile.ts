const EXTENSION_FLAG = '.'

const EXTENSION_MIMETYPE_MAP: Record<string, string> = {
  '.zip': 'application/zip',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.bmp': 'image/bmp',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.txt': 'text/plain',
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4',
  '.avi': 'video/x-msvideo',
  '.mov': 'video/quicktime',
  '.mkv': 'video/x-matroska',
  '.flv': 'video/x-flv',
  '.wmv': 'video/x-ms-wmv',
  '.webm': 'video/webm',
  '.tar': 'application/x-tar',
  '.gz': 'application/gzip',
  '.rar': 'application/vnd.rar',
  '.7z': 'application/x-7z-compressed',
  '.csv': 'text/csv',
  '.md': 'text/markdown',
  '.rtf': 'application/rtf',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.otf': 'font/otf',
  '.ico': 'image/x-icon',
  '.ics': 'text/calendar',
  '.jar': 'application/java-archive',
  '.sh': 'application/x-sh',
  '.swf': 'application/x-shockwave-flash',
  '.xhtml': 'application/xhtml+xml',
  '.xul': 'application/vnd.mozilla.xul+xml',
  '.3gp': 'video/3gpp',
  '.3g2': 'video/3gpp2',
  '.aac': 'audio/aac',
  '.abw': 'application/x-abiword',
  '.arc': 'application/x-freearc',
  '.azw': 'application/vnd.amazon.ebook',
  '.bz': 'application/x-bzip',
  '.bz2': 'application/x-bzip2',
  '.csh': 'application/x-csh',
  '.epub': 'application/epub+zip',
  '.mjs': 'text/javascript',
  '.mpkg': 'application/vnd.apple.installer+xml',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.ogv': 'video/ogg',
  '.ogx': 'application/ogg',
  '.opus': 'audio/opus',
  '.php': 'application/x-httpd-php',
  '.vsd': 'application/vnd.visio',

  // more
  '.ts': 'application/javascript',
  '.jsx': 'application/javascript',
  '.tsx': 'application/javascript',
}

const mustBeAStringError = (
  theString: any,
  nameOfTheString: string,
) => {
  if (typeof theString !== 'string')
    throw new Error(`EFile: ${nameOfTheString} must be a string.`)
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
  mustBeAStringError(filename, `the filename`)
  mustHaveAnExtensionError(filename)

  return filename
    .split(EXTENSION_FLAG)
    .pop() as string
}

const extensionToMimetype = (
  extension: string,
) =>
  EXTENSION_MIMETYPE_MAP[extension]

class EFile {
  private _content: string | File = ''

  private _name: string = ''

  private _extension: string | undefined

  private _mimetype: string | undefined

  constructor(filename: string) {
    this.name = filename
  }

  get content() {
    return this._content
  }

  get name() {
    return this._name
  }

  get extension() {
    return this._extension
  }

  get mimetype() {
    return this._mimetype
  }

  set content(content) {
    mustBeAStringError(content, `the content of ${this.name}`)

    this._content = content
  }

  set name(name: string) {
    const extension = pickTheExtension(name)
    const mimetype = extensionToMimetype(extension)

    this._extension = extension
    this._mimetype = mimetype
    this._name = name
  }
}

export default EFile
