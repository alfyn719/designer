import type {
  DeepAction,
  DeepActions,
  LateInit,
  MixedActions,
} from './actions.type'

import {
  actionsMustBeAnArray,
  isContinuousDeep,
  isDeep,
} from './helper'

/**
 * the control for async action drill
 * @param action DeepAction
 * @param lateInit LateInit
 */

async function asyncDrill(
  action: DeepAction,
  lateInit: LateInit,
): Promise<any> {
  const [[source, target = source], actions] = action
  const init = await lateInit

  // eslint-disable-next-line ts/no-use-before-define
  init[target] = await asyncPipeline(actions, init[source])

  return init
}

async function asyncDrillCurrying(
  lateInit: LateInit,
) {
  return (
    action: DeepAction,
  ) =>
    asyncDrill(action, lateInit)
}

/**
 * the control for async action drill in concurrent
 * @param actions DeepActions
 * @param lateInit LateInit
 */

async function asyncDrillInConcurrent(
  actions: DeepActions,
  lateInit: LateInit,
) {
  const init = await lateInit

  await Promise.allSettled(
    actions.map(asyncDrillCurrying),
  )

  return init
}

/**
 * Bringing the <DeepAction>'s together
 * @param deepActions DeepActions
 * @param actions MixedActions
 */

const continuousDeepActionsSplit = function self(
  deepActions: DeepActions,
  actions: MixedActions,
): [DeepActions, MixedActions] {
  const [action, ...restActions] = actions

  if (isDeep(action))
    return self([...deepActions, action], restActions)

  return [deepActions, actions]
}

/**
 * async execute action on source or source's property further
 * @param actions MixedActions (use the actions reversely)
 * @param lateInit LateInit
 */

const asyncPipeline = async function self<T>(
  actions: MixedActions,
  lateInit: LateInit,
): Promise<T> {
  actionsMustBeAnArray(actions)

  const init = await lateInit

  if (actions.length === 0)
    return init

  const [action, ...restActions] = actions

  if (!isDeep(action)) {
    // note 👇 await
    return await action(await self(restActions, init))
  }

  /**
   * If there are continuous <DeepAction>, execute them
   * in concurrent to improve performance.
   */

  if (isContinuousDeep(action, restActions)) {
    const [deepActions, actions] = continuousDeepActionsSplit([action], restActions)

    return asyncDrillInConcurrent(deepActions, self(actions, init))
  }

  return asyncDrill(action, self(restActions, init))
}

function asyncPipelineCurrying(
  actions: MixedActions,
) {
  return (lateInit: LateInit) =>
    asyncPipeline(actions, lateInit)
}

export {
  asyncPipeline,
  asyncPipelineCurrying,
}
