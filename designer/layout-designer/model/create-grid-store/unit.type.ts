/**
 * valur type：fr，px，%，em，auto，min-content，max-content，minmax
 */

enum ExplicitUnit {
  Pixel = 'px',
  Percent = '%',
  EM = 'em',
}

type ExplicitUnitKey = keyof typeof ExplicitUnit
type ExplicitUnitValue = `${ExplicitUnit}`

enum Track {
  Pixel = 'px',
  Percent = '%',
  EM = 'em',
  Fraction = 'fr',
  Auto = 'auto',
  MinContent = 'min-content',
  MaxContent = 'max-content',
  Minmax = 'minmax',
}

type TrackKey = keyof typeof Track
type TrackValue = `${Track}`

// ======= export split line =======

export type { ExplicitUnitKey, ExplicitUnitValue }
export { ExplicitUnit }

export type { TrackKey, TrackValue }
export { Track }
