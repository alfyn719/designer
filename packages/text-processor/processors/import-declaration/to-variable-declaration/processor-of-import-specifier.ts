import type {
  Identifier,
  ImportDeclaration,
  ImportSpecifier,
} from 'acorn'

import buildersOfDestructuring from './builders-of-destructuring.ts'

const importSpecifierNamePicker = (
  specifiers: Array<ImportSpecifier>,
) => specifiers
  .map(
    (
      specifier: ImportSpecifier,
    ) => {
      const imported = specifier.imported as Identifier
      const local = specifier.local as Identifier

      return {
        keyName: imported.name,
        valueName: local.name,
      }
    },
  )

const processorOfImportSpecifier = (
  {
    source,
    specifiers,
  }: ImportDeclaration,
) => {
  const sourceName = source.value as string
  const localNames = importSpecifierNamePicker(specifiers as Array<ImportSpecifier>)

  return buildersOfDestructuring(sourceName, localNames)
}

export default processorOfImportSpecifier
