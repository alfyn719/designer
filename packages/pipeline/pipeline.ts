import type { DeepAction, MixedAction } from './actions.type'

import { isDeep } from './helper'

// ======= execute action recursion =======

/**
 * the control for action drill
 * @param action DeepAction
 * @param init any
 */

function drill(action: DeepAction, init: any): any {
  const [[source, target = source], actions] = action as DeepAction

  // eslint-disable-next-line ts/no-use-before-define
  init[target] = pipeline(actions, init[source])

  return init
}

/**
 * execute action on source or source's property further
 * @param actions use the actions reversely
 * @param init any
 */

const pipeline = function self<T>(actions: MixedAction[], init: any): T {
  if (!Array.isArray(actions))
    throw new TypeError('recursionAction: actions must be an array')

  if (actions.length === 0)
    return init

  const [action, ...restActions] = actions

  if (isDeep(action))
    return drill(action, self(restActions, init))

  return action(self(restActions, init))
}

// ======= Currying =======

function pipelineCurrying<T>(actions: MixedAction[]) {
  return (init: any) =>
    pipeline<T>(actions, init)
}

export {
  pipeline,
  pipelineCurrying,
}
