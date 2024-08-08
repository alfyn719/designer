import type { TrackValue } from './unit.type.ts'

enum GridTemplateType {
  Row = 'gridTemplateRows',
  Column = 'gridTemplateColumns',
}

type GridTemplateTypeKey = keyof typeof GridTemplateType
type GridTemplateTypeValue = `${GridTemplateType}`

enum SplitDirection {
  Left,
  Right,
}

type SplitDirectionKey = keyof typeof SplitDirection
type SplitDirectionValue = `${SplitDirection}`

enum GapType {
  Row = 'rowGap',
  Column = 'columnGap',
}

type GapTypeKey = keyof typeof GapType
type GapTypeValue = `${GapType}`

interface UnitValue {
  unit: TrackValue
  value?: string
}

// ======= export split line =======

export type { GridTemplateTypeKey, GridTemplateTypeValue }
export { GridTemplateType }

export type { SplitDirectionKey, SplitDirectionValue }
export { SplitDirection }

export type { GapTypeKey, GapTypeValue }
export { GapType }

export type { UnitValue }
