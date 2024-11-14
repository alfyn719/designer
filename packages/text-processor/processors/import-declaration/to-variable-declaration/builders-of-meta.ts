import type { Identifier } from 'acorn'

import { pipeline } from '@tools/pipeline'

const buildIdentifier = (
  name: string,
) => ({
  type: 'Identifier',
  name,
} as Identifier)

interface IBuildProperty {
  keyIdentifier: Identifier
  valueIdentifier: Identifier
}

const buildProperty = (
  {
    keyIdentifier,
    valueIdentifier,
  }: IBuildProperty,
) => ({
  type: 'Property',
  kind: 'init',

  shorthand: keyIdentifier.name === valueIdentifier.name,
  method: false,
  computed: false,

  key: keyIdentifier,
  value: valueIdentifier,
})

interface LocalName {
  keyName: string
  valueName: string
}

const buildProperties = (localNames: Array<LocalName>) =>
  localNames
    .map(
      ({ keyName, valueName }) =>
        pipeline([buildProperty], {
          keyIdentifier: buildIdentifier(keyName),
          valueIdentifier: buildIdentifier(valueName),
        }),
    )

export {
  buildIdentifier,
  buildProperties,
  buildProperty,
}
