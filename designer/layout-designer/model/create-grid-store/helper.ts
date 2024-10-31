import type { UnitValue } from './helper.type'
import type { GridArea } from './index.type.ts'

import { pipelineToolkit } from '@designer/tools'

import { Track } from './unit.type.ts'

const { pipelineCurrying } = pipelineToolkit

// ======= split =======

// 'minmax(20px, 1ft)' to 'minmax' + '20px,1fr'
const splitCall = (call: string) => call.replace(/[)\x20]/g, '').split('(')

// '1fr' to '1' + 'fr'
const splitNumberUnit = (value: string) => {
  const unit = value.replace(/\d/g, '')
  const number = value.match(/\d/g)!.join('')

  return [unit, number]
}

/**
 * minmax(min, max) -> minmax + min,max
 * auto, min-content, max-content
 * 1px, 1%, 1em, 1fr -> 1 + px | % | em | fr
 */
const splitValue = (value: string): UnitValue => {
  // minmax(min, max)
  const specialValueUnit = Track.Minmax

  if (value.startsWith(specialValueUnit)) {
    const [call, props] = splitCall(value)

    return {
      unit: <Track.Minmax>call,
      value: props,
    }
  }

  // auto | min-content | max-content
  const noValueUnit: string[] = [
    Track.Auto,
    Track.MinContent,
    Track.MaxContent,
  ]

  if (noValueUnit.includes(value)) {
    return { unit: <Track>value }
  }

  // px | % | em | fr
  const [unit, number] = splitNumberUnit(value)

  return {
    unit: <Track>unit,
    value: number,
  }
}

/**
 * auto, min-content, max-content
 * minmax + min,max -> [minmax(strategy half), minmax(strategy half)]
 * 1fr -> [1fr, 1fr]
 * 1 + px | % | em -> [0.5 + px | % | em, 0.5 + px | % | em]
 */
const splitStrategy = function self(unitValue: UnitValue) {
  const { unit, value } = unitValue

  // auto | min-content | max-content
  if (value === undefined) {
    return [unit, unit]
  }

  // fr
  if (unit === Track.Fraction) {
    const fr = `${value}${unit}`
    return [fr, fr]
  }

  // minmax
  if (unit === Track.Minmax) {
    const [[min], [max]] = value
      .split(',')
      .map(pipelineCurrying<string[]>([self, splitValue]))

    const minmax = `${unit}(${min}, ${max})`
    return [minmax, minmax]
  }

  // px | % | em
  const number = Number(value)
  const halfValue = `${number / 2}${unit}`

  return [halfValue, halfValue]
}

const split = pipelineCurrying<string[]>([splitStrategy, splitValue])

// ======= track area =======

interface INumberedTrackProps {
  rowLineCount: number
  columnLineCount: number
}

// line's count to numbered track
const numberedTrack = (gridLines: INumberedTrackProps) => {
  const { rowLineCount, columnLineCount } = gridLines

  const rowTracks: GridArea[] = []
  for (let i = 1; i < rowLineCount; i++) {
    const rowStart = i
    const rowEnd = i + 1

    rowTracks.push([rowStart, 1, rowEnd, columnLineCount])
  }

  const columnTracks: GridArea[] = []
  for (let i = 1; i < columnLineCount; i++) {
    const columnStart = i
    const columnEnd = i + 1

    columnTracks.push([1, columnStart, rowLineCount, columnEnd])
  }

  return [rowTracks, columnTracks]
}

const bodyCombine = <T>(arr: [T[], T[]]) => {
  const [[_, ..._rest], [__, ...__rest]] = arr

  return [_rest, __rest]
}

const trackArea = pipelineCurrying<[GridArea[], GridArea[]]>([
  numberedTrack,
])

// ======= unit area =======

interface INumberedUnitProps extends INumberedTrackProps {
  startRowGridLineNo?: number
  startColumnGridLineNo?: number
}

// line's count to numbered unit
const numberedUnit = (gridLines: INumberedUnitProps) => {
  const {
    rowLineCount,
    columnLineCount,
    startRowGridLineNo = 1,
    startColumnGridLineNo = 1,
  } = gridLines

  const unit: GridArea[] = []

  for (let i = startRowGridLineNo; i < rowLineCount; i++) {
    const rowStart = i
    const rowEnd = i + 1

    for (let j = startColumnGridLineNo; j < columnLineCount; j++) {
      const columnStart = j
      const columnEnd = j + 1

      unit.push([rowStart, columnStart, rowEnd, columnEnd])
    }
  }

  return unit
}

const unitArea = numberedUnit

// ======= utils =======

const toFixed = (n: number, precision: number): number => Number(n.toFixed(precision))

export { split, trackArea, unitArea, toFixed }
