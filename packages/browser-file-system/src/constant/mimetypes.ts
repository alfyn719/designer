const EXTENSION_MIMETYPE_MAP: Record<string, string> = {

  // CODE
  'html': 'text/html',
  'css': 'text/css',
  'less': 'text/plain',
  'js': 'application/javascript',
  'ts': 'application/javascript',
  'jsx': 'application/javascript',
  'tsx': 'application/javascript',
  'json': 'application/json',
  'md': 'text/markdown',
  'txt': 'text/plain',

  // AUDIO
  'mp3': 'audio/mpeg',
  'mpeg3': 'audio/mpeg',
  'wav': 'audio/wav',
  'aac': 'audio/aac',
  'm4a': 'audio/aac',

  // VIDEO
  'mp4': 'video/mp4',
  'm4v': 'video/mp4',

  // IMAGE
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'bmp': 'image/bmp',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',

  // FONT
  'ttf': 'font/ttf',
  'otf': 'font/otf',
  'woff': 'font/woff',
  'woff2': 'font/woff2',

  // WEB_ASSEMBLY
  'wasm': 'application/wasm',

  // OTHER
  'zip': 'application/zip',
  'pdf': 'application/pdf',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'xml': 'application/xml',
  'ogg': 'audio/ogg',
  'avi': 'video/x-msvideo',
  'mov': 'video/quicktime',
  'mkv': 'video/x-matroska',
  'flv': 'video/x-flv',
  'wmv': 'video/x-ms-wmv',
  'webm': 'video/webm',
  'tar': 'application/x-tar',
  'gz': 'application/gzip',
  'rar': 'application/vnd.rar',
  '7z': 'application/x-7z-compressed',
  'csv': 'text/csv',
  'rtf': 'application/rtf',
  'eot': 'application/vnd.ms-fontobject',
  'ico': 'image/x-icon',
  'ics': 'text/calendar',
  'jar': 'application/java-archive',
  'sh': 'application/x-sh',
  'swf': 'application/x-shockwave-flash',
  'xhtml': 'application/xhtml+xml',
  'xul': 'application/vnd.mozilla.xul+xml',
  '3gp': 'video/3gpp',
  '3g2': 'video/3gpp2',
  'abw': 'application/x-abiword',
  'arc': 'application/x-freearc',
  'azw': 'application/vnd.amazon.ebook',
  'bz': 'application/x-bzip',
  'bz2': 'application/x-bzip2',
  'csh': 'application/x-csh',
  'epub': 'application/epub+zip',
  'mjs': 'text/javascript',
  'mpkg': 'application/vnd.apple.installer+xml',
  'odp': 'application/vnd.oasis.opendocument.presentation',
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',
  'odt': 'application/vnd.oasis.opendocument.text',
  'ogv': 'video/ogg',
  'ogx': 'application/ogg',
  'opus': 'audio/opus',
  'php': 'application/x-httpd-php',
  'vsd': 'application/vnd.visio',
}

export {
  EXTENSION_MIMETYPE_MAP,
}
