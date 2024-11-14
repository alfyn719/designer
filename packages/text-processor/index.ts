import type {
  ImportDeclaration,
  ImportDefaultSpecifier,
  ImportNamespaceSpecifier,
  ImportSpecifier,
  Literal,
  VariableDeclarator,
} from 'acorn'

import * as acorn from 'acorn'
import { generate } from 'escodegen'
import { replace } from 'estraverse'

import processorOfImportDefaultSpecifier from './processors/import-declaration/to-variable-declaration/processor-of-import-default-specifier.ts'
import processorOfImportNamespaceSpecifier from './processors/import-declaration/to-variable-declaration/processor-of-import-namespace-specifier.ts'
import processorOfImportSpecifier
  from './processors/import-declaration/to-variable-declaration/processor-of-import-specifier.ts'
import { hasImportDefaultSpecifier, hasImportNamespaceSpecifier } from './processors/import-declaration/tools.ts'

const rawText = `
    // ImportDeclaration: 这一行
    // ImportNamespaceSpecifier：* as process
    import * as processX from 'process';

    // ImportDeclaration：这一行
    // ImportDefaultSpecifier：antdX
    // ImportSpecifier：Button
    import antdX, { Button as Bx, Input } from "antd";
    
    import { useState, useEffect } from 'react';
    
    // shorthand: false："useState: useStateX"
    const { useState: useStateX, useRef, useHooks } = React;

    const [[name1], address] = yike

    // comment
    const name = "YIKE";

    const Demo1 = ({ name: name2 }) => {
      return /* @__PURE__ */ React.createElement(Button, null, "Demo1 ", name2);
    };

    export default Demo1;
  `

const ast = acorn.parse(
  rawText,
  {
    ecmaVersion: 2023,
    sourceType: 'module',
  },
)

console.log('acorn', ast)

const modified = () => {}

const replaced = replace(ast, {
  enter(current) {
    console.log('xxx', current)

    const { type } = current

    if (type !== 'Program' && type !== 'ImportDeclaration') {
      this.skip()
      return
    }

    if (type === 'ImportDeclaration') {
      const importDeclaration = current as ImportDeclaration

      if (hasImportNamespaceSpecifier(importDeclaration)) {
        const buff = processorOfImportNamespaceSpecifier(importDeclaration)

        if (!buff) {
          this.remove()

          return
        }

        this.skip()

        return buff
      }

      if (hasImportDefaultSpecifier(importDeclaration)) {
        const buff = processorOfImportDefaultSpecifier(importDeclaration)

        if (!buff) {
          this.remove()

          return
        }

        this.skip()

        return buff
      }

      const buff = processorOfImportSpecifier(importDeclaration)
      this.skip()

      return buff
    }
  },
})

replaced.body = replaced.body.flat()

const gText = generate(replaced)

console.log('gText ===')
console.log(gText)

const buildVariableDeclarationRenameAST = (
  newName: string,
  originalName: string,
) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations: [
    {
      type: 'VariableDeclarator',
      id: { type: 'Identifier', name: newName },
      init: { type: 'Identifier', name: originalName },
    },
  ],
})

const buildVariableDeclarationBy = (
  declarations: Array<VariableDeclarator>,
) => {
  return {
    type: 'VariableDeclaration',
    kind: 'const',
    declarations,
  }
}

const buildVariableDeclaratorBy = (specifiers, source) => {

}

const nameAnalysis = (
  source: Literal,
  specifier: ImportNamespaceSpecifier | ImportSpecifier | ImportDefaultSpecifier,
) => {
  const sourceName = source.value as string
  const localName = specifier.local.name

  const isRename = localName === sourceName

  return { isRename, localName, sourceName }
}

/**
 * ImportDeclaration
 *
 * - type: ImportDeclaration
 *
 * - specifiers: Array<ImportSpecifier | ImportDefaultSpecifier | ImportNamespaceSpecifier>
 *   -- local: Identifier
 *   -- imported: Identifier
 *
 * - source: Literal
 */

/**
 * VariableDeclaration
 *
 * - type: VariableDeclaration
 *
 * - declarations: Array<VariableDeclarator>
 *   -- id: Pattern
 *   -- init?: Expression | null
 *
 * - kind: 'var' | 'let' | 'const'
 */

// 把 import 语法转为 从全局变量做解构的语法
// 需要适配，数组解构（elements），对象解构（Property），解构别名（shorthand）
// 对象解构需要适配 ImportDeclaration，ImportNamespaceSpecifier，ImportDefaultSpecifier，ImportSpecifier

const ImportDeclarationToVariableDeclarator = (
  importDeclaration: ImportDeclaration,
) => {
  /**
   * 处理 ImportDeclaration
   * 1. ImportDeclaration - source
   *    >
   *    VariableDeclarator - init
   */

  /**
   * 处理 ImportDefaultSpecifier
   * 1. ImportDeclaration - specifiers - [ImportDefaultSpecifier]：
   *    与 source 同名则删除 specifiers Node；
   *    否则就相当于全局变量重命名；
   */

  /**
   * 处理 ImportSpecifier
   * 1. ImportDeclaration - specifiers - [ImportSpecifier]：
   *    - imported 原名
   *    - local 是别名，语法：import { Button as Bx } from "antd";
   */
}
