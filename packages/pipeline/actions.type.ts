type Action = (...args: any[]) => any

type Source = string
type Target = string

type RouteKey = [Source] | [Source, Target]

type DeepAction = [RouteKey, MixedAction[]]

type MixedAction = Action | DeepAction

/**
 * MixAction: () => void; ['key', [() => void, () => void]]
 */

export type {
  Action,
  DeepAction,
  MixedAction,
  Source,
  Target,
}
