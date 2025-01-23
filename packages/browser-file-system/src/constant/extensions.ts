const EXTENSIONS = {
  CODE: ['html', 'css', 'less', 'js', 'ts', 'jsx', 'tsx', 'json', 'md', 'txt'],
  AUDIO: ['mp3', 'mpeg3', 'wav', 'aac', 'm4a'],
  VIDEO: ['mp4', 'm4v'],
  IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg'],
  FONT: ['ttf', 'otf', 'woff', 'woff2'],
  WEB_ASSEMBLY: ['wasm'],
} as const

export {
  EXTENSIONS,
}
