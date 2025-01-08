enum BuiltIn {
  File = '[object File]',
  // more you need...
}

const isTypeEqual = <T>(type: `${BuiltIn}`) =>
  (aThis: unknown): aThis is T =>
    Object.prototype.toString.call(aThis) === type

const isFile = isTypeEqual<File>(BuiltIn.File)

export { isFile }
