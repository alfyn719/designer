import type { Action, DeepAction, MixedAction } from './actions.type'

import { isDeep } from './helper'

// ======= async execute action recursion =======

async function asyncDrill(action: DeepAction, lateInit: any | Promise<any>): Promise<any> {
  const [[source, target = source], actions] = action as DeepAction
  const init = await lateInit

  // eslint-disable-next-line ts/no-use-before-define
  init[target] = await asyncPipeline(actions, init[source])

  return init
}

async function concurrentAsyncDrill(actions: DeepAction[], lateInit: any | Promise<any>) {
  const init = await lateInit;

  (
    await Promise.all(
      actions.map(async ([[source, target = source], actions]) => ({
        target,
        // eslint-disable-next-line ts/no-use-before-define
        value: await asyncPipeline(actions, init[source]),
      })),
    )
  ).forEach(({ target, value }) => (init[target] = value))

  return init
}

const continousDeepActionsSplit = function self(
  deepActions: DeepAction[],
  actions: MixedAction[],
): [DeepAction[], MixedAction[]] {
  const [action, ...restActions] = actions

  if (isDeep(action))
    return self([...deepActions, action], restActions)

  return [deepActions, actions]
}

const asyncPipeline = async function self<T>(
  actions: MixedAction[],
  lateInit: any | Promise<any>,
): Promise<T> {
  if (!Array.isArray(actions)) {
    throw new TypeError('recursionAction: actions must be an array')
  }

  const init = await lateInit

  if (actions.length === 0)
    return init

  const [action, ...restActions] = actions

  const [prevAction, ...restPrevActions] = restActions
  const deeps = [action, prevAction]
  if (deeps.every(isDeep)) {
    const [deepActions, actions] = continousDeepActionsSplit(
      deeps,
      restPrevActions,
    )

    return concurrentAsyncDrill(deepActions, self(actions, init))
  }

  if (isDeep(action))
    return asyncDrill(action, self(restActions, init))

  // note 👇 await
  return await action(await self(restActions, init))
}

// ======= dev tools =======

const deepReverse = function self(actions: MixedAction[]): MixedAction[] {
  return actions
    .map((action): Action | DeepAction => {
      if (isDeep(action)) {
        const [routeKey, actions] = action

        return [routeKey, self(actions)]
      }

      return action
    })
    .toReversed()
}

export type { MixedAction }

export {
  asyncPipeline,
  deepReverse,
}
