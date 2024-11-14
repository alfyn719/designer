import type {
  AssignmentProperty,
  Expression,
  Pattern,
  RestElement,
  VariableDeclarator,
} from 'acorn'

const buildScaffoldOfVariableDeclaration = (
  declarations: Array<VariableDeclarator>,
) => ({
  type: 'VariableDeclaration',
  kind: 'const',
  declarations,
})

interface IBuildScaffoldOfVariableDeclarator {
  id: Pattern
  init: Expression | null
}

const buildScaffoldOfVariableDeclarator = (
  {
    id,
    init,
  }: IBuildScaffoldOfVariableDeclarator,
) => ({
  type: 'VariableDeclarator',
  id,
  init,
} as VariableDeclarator)

const buildIdOfObjectPattern = (
  properties: Array<AssignmentProperty | RestElement>,
) => ({
  type: 'ObjectPattern',
  properties,
})

export { buildIdOfObjectPattern, buildScaffoldOfVariableDeclaration, buildScaffoldOfVariableDeclarator }
