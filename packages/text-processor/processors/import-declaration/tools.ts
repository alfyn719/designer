import type { ImportDeclaration, ImportDefaultSpecifier, ImportNamespaceSpecifier, ImportSpecifier } from 'acorn'
// eslint-disable-next-line import/order
import type { ImportSpecifiers } from './constant'
import { IMPORT_DEFAULT_SPECIFIER, IMPORT_NAMESPACE_SPECIFIER, IMPORT_SPECIFIER } from './constant'

const specifierTypeEqual = (
  type: ImportSpecifiers,
  specifier: ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier,
) => specifier.type === type

const isImportNamespaceSpecifier = specifierTypeEqual
  .bind(
    null,
    IMPORT_NAMESPACE_SPECIFIER,
  )

const isImportDefaultSpecifier = specifierTypeEqual
  .bind(
    null,
    IMPORT_DEFAULT_SPECIFIER,
  )

const isImportSpecifier = specifierTypeEqual
  .bind(
    null,
    IMPORT_SPECIFIER,
  )

const hasImportNamespaceSpecifier = (
  theImportDeclaration: ImportDeclaration,
) => isImportNamespaceSpecifier(
  theImportDeclaration.specifiers[0],
)

const hasImportDefaultSpecifier = (
  theImportDeclaration: ImportDeclaration,
) => isImportDefaultSpecifier(
  theImportDeclaration.specifiers[0],
)

const hasImportDefaultSpecifierWithImportsSpecifier = (
  theImportDeclaration: ImportDeclaration,
) =>
  hasImportDefaultSpecifier(theImportDeclaration)
  && (theImportDeclaration.specifiers.length > 1)

export {
  hasImportDefaultSpecifier,
  hasImportDefaultSpecifierWithImportsSpecifier,
  hasImportNamespaceSpecifier,

  isImportDefaultSpecifier,
  isImportNamespaceSpecifier,
  isImportSpecifier,
}
