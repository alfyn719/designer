type ImportDefaultSpecifier = 'ImportDefaultSpecifier'

type ImportNamespaceSpecifier = 'ImportNamespaceSpecifier'

type ImportSpecifier = 'ImportSpecifier'

type ImportSpecifiers = ImportDefaultSpecifier | ImportNamespaceSpecifier | ImportSpecifier

const IMPORT_DEFAULT_SPECIFIER: ImportDefaultSpecifier = 'ImportDefaultSpecifier' as const

const IMPORT_NAMESPACE_SPECIFIER: ImportNamespaceSpecifier = 'ImportNamespaceSpecifier' as const

const IMPORT_SPECIFIER: ImportSpecifier = 'ImportSpecifier' as const

export {
  IMPORT_DEFAULT_SPECIFIER,
  IMPORT_NAMESPACE_SPECIFIER,
  IMPORT_SPECIFIER,
}

export type {
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  ImportSpecifiers,
}
