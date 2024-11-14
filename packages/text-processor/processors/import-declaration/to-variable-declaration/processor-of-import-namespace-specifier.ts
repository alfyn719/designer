import type {
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Literal,
} from 'acorn'

import { buildersOfRename } from './builders-of-rename.ts'

/**
 * ImportNamespaceSpecifier
 * 分析如：import * as name from "package's name" 的引用：
 *  - 如果标识符   一致，即：name === "package's name"，改为全局引用时无需处理；
 *  - 如果标识符 不一致，需处理成：const name = "package's name"；
 */

/**
 * ImportDefaultSpecifier
 * 分析如：import name from "package's name" 的引用：
 *  - 如果标识符   一致，即：name === "package's name"，改为全局引用时无需处理；
 *  - 如果标识符 不一致，需处理成：const name = "package's name"；
 */

const nameAnalysis = (
  source: Literal,
  specifier: ImportNamespaceSpecifier | ImportSpecifier | ImportDefaultSpecifier,
) => {
  const sourceName = source.value as string
  const localName = specifier.local.name

  const isRename = localName !== sourceName

  return { isRename, localName, sourceName }
}

const processorOfImportNamespaceSpecifier = (
  {
    source,
    specifiers,
  }: ImportDeclaration,
) => {
  const importNamespaceSpecifier = specifiers[0]
  const { isRename, ...names } = nameAnalysis(source, importNamespaceSpecifier)

  if (!isRename)
    return

  const { localName, sourceName } = names

  return buildersOfRename(localName, sourceName)
}

export default processorOfImportNamespaceSpecifier
