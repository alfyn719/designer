import { pipeline } from '@alfyn/pipeline'

import {
  buildIdOfObjectPattern,
  buildScaffoldOfVariableDeclaration,
  buildScaffoldOfVariableDeclarator,
} from './builders-of-id.ts'
import {
  buildIdentifier,
  buildProperties,
} from './builders-of-meta.ts'

interface LocalName {
  keyName: string
  valueName: string
}

const buildersOfDestructuring = (
  sourceName: string,
  localNames: Array<LocalName>,
) => pipeline(
  [
    buildScaffoldOfVariableDeclaration,
    declarator => [declarator],
    buildScaffoldOfVariableDeclarator,
  ],
  {
    id: pipeline([buildIdOfObjectPattern, buildProperties], localNames),
    init: buildIdentifier(sourceName),
  },
)

export default buildersOfDestructuring
