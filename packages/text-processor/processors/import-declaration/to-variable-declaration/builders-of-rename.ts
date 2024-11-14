import { pipeline } from '@tools/pipeline'

import { buildScaffoldOfVariableDeclaration, buildScaffoldOfVariableDeclarator } from './builders-of-id.ts'
import { buildIdentifier } from './builders-of-meta.ts'

const buildersOfRename = (
  localName: string,
  sourceName: string,
) => pipeline(
  [
    buildScaffoldOfVariableDeclaration,
    declarator => [declarator],
    buildScaffoldOfVariableDeclarator,
  ],
  {
    id: buildIdentifier(localName),
    init: buildIdentifier(sourceName),
  },
)

export { buildersOfRename }
