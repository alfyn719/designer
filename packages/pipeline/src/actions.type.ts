type Action = (...args: any[]) => any

/**
 * When drilling down to process data,
 * use this parameter to index the data.
 */

type Source = string

/**
 * Set the value based on this field
 * after drilling down the processed data.
 */

type Target = string

/**
 * <Target> can be left unset. If <Target>
 * is not set, the processed data will be
 * set back to <Source>.
 */

type RouteKey = [Source] | [Source, Target]

type DeepAction = [RouteKey, MixedActions]
type DeepActions = Array<DeepAction>

type MixedAction = Action | DeepAction
type MixedActions = Array<MixedAction>

// =======  =======

type LateInit = any | Promise<any>

export type {
  Action,
  DeepAction,
  DeepActions,
  MixedAction,
  MixedActions,
  Source,
  Target,
}

export type {
  LateInit,
}
