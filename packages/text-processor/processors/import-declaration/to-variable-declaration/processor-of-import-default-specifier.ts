import type { ImportDeclaration } from 'acorn'

// eslint-disable-next-line import/order
import { hasImportDefaultSpecifierWithImportsSpecifier } from '../tools.ts'
import processorOfImportNamespaceSpecifier from './processor-of-import-namespace-specifier.ts'
import processorOfImportSpecifier from './processor-of-import-specifier.ts'

const processorOfImportDefaultSpecifier = (
  importDeclaration: ImportDeclaration,
) => {
  const buff = processorOfImportNamespaceSpecifier(importDeclaration)

  if (!buff && !hasImportDefaultSpecifierWithImportsSpecifier(importDeclaration)) {
    return
  }

  const { source, specifiers } = importDeclaration
  const [_, ...restSpecifiers] = specifiers
  const importDeclarationWithRestSpecifiers = { source, specifiers: restSpecifiers } as ImportDeclaration
  const restBuff = processorOfImportSpecifier(importDeclarationWithRestSpecifiers)

  return buff ? [buff, restBuff] : restBuff
}

export default processorOfImportDefaultSpecifier
