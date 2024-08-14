import type { AlignmentValue } from './alignment.type.ts'
import type {
  GapTypeKey,
  GridTemplateTypeKey,
  SplitDirectionKey,
  SplitDirectionValue,
} from './helper.type.ts'
import type createGridStore from './index.ts'
import type { ExplicitUnitValue } from './unit.type.ts'
import type { CSSProperties } from 'react'
import type { RectReadOnly } from 'react-use-measure'

// ======= grid area =======

/**
 * use grid lines to pick grid area
 */
type GridRowStart = number
type GridColumnStart = number
type GridRowEnd = number
type GridColumnEnd = number
type GridArea = [GridRowStart, GridColumnStart, GridRowEnd, GridColumnEnd]

/**
 * named grid area to improve legible
 */
type AreaName = string
type NamedArea = Record<AreaName, GridArea>
type NamedAreaArr = [AreaName, GridArea][]

// ======= private =======

interface SelectRect {
  x: number
  y: number
  left: number
  top: number
  width: number
  height: number
}

// ======= grid store props =======

interface GridProps {
  // gutter
  rowUnit: ExplicitUnitValue
  columnUnit: ExplicitUnitValue
  rowGap: number
  columnGap: number

  // alignment to container on tracks
  justifyContent: AlignmentValue
  alignContent: AlignmentValue

  // alignment to container on area's elements
  justifyItems: AlignmentValue
  alignItems: AlignmentValue

  // split
  gridTemplateRows: string[]
  gridTemplateColumns: string[]

  layout: NamedArea

  // ======= helper =======

  areaOrder: AreaName[]

  selectedTracks: {
    row: number[]
    column: number[]
  }

  colors: string[]
}

interface GridComputed {
  readonly cssVariable: () => CSSProperties
  readonly units: () => GridArea[]
  readonly trackGridArea: () => [GridArea[], GridArea[]]
  readonly sortedArea: () => NamedAreaArr
}

interface GridPropsPrivate {
  _workspaceRect: Partial<RectReadOnly>
  _selectRect: SelectRect

}

interface GridAction {
  // row / column
  readonly splitGrid: (
    type: GridTemplateTypeKey,
    index: number,

    // TODO for animation
    direction?: SplitDirectionValue,
  ) => void

  readonly deleteTrack: (type: GridTemplateTypeKey, index: number) => void

  readonly moveTrack: (
    type: GridTemplateTypeKey,
    from: number,
    to: number,
  ) => void

  readonly editTrack: (
    type: GridTemplateTypeKey,
    index: number,
    length: string,
  ) => void

  // gutter
  readonly editGap: (type: GapTypeKey, length: number) => void

  // layout
  readonly addArea: () => void
}

interface GridActionPrivate {
  readonly _setSelectRect: (selecto: SelectRect) => void
  readonly _setWorkspaceRect: (rect: RectReadOnly) => void
}

interface GridState extends
  GridProps, GridComputed, GridPropsPrivate, GridAction, GridActionPrivate {}

type GridStore = ReturnType<typeof createGridStore>

export type {
  GridArea,
  NamedArea,
  NamedAreaArr,
  GridProps,
  GridPropsPrivate,
  GridState,
  GridStore,
}
