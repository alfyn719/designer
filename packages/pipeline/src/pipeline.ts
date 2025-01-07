import type { DeepAction, MixedActions } from './actions.type'

import { actionsMustBeAnArrayError, isDeep } from './helper'

/**
 * the control for action drill
 * @param action DeepAction
 * @param init any
 */

function drill(
  action: DeepAction,
  init: any,
): any {
  const [[source, target = source], actions] = action

  // eslint-disable-next-line ts/no-use-before-define
  init[target] = pipeline(actions, init[source])

  return init
}

/**
 * execute action on source or source's property further
 * @param actions MixedActions (use the actions reversely)
 * @param init any
 */

const pipeline = function self<T>(
  actions: MixedActions,
  init: any,
): T {
  actionsMustBeAnArrayError(actions)

  if (actions.length === 0)
    return init

  const [action, ...restActions] = actions

  if (isDeep(action))
    return drill(action, self(restActions, init))

  return action(self(restActions, init))
}

function pipelineCurrying<T>(
  actions: MixedActions,
) {
  return (init: any) =>
    pipeline<T>(actions, init)
}

export {
  pipeline,
  pipelineCurrying,
}
