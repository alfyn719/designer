import type {
  Action,
  DeepAction,
  MixedAction,
  MixedActions,
} from './actions.type'

// 1st library, just sniff mode

function isDeep(
  mode: any,
): mode is DeepAction {
  try {
    return typeof mode[0][0] === 'string'
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  catch (e) {
    return false
  }
}

function actionsMustBeAnArrayError(
  actions: MixedActions,
) {
  if (Array.isArray(actions))
    return

  throw new TypeError('pipeline: actions must be an array')
}

function isContinuousDeep(
  action: MixedAction,
  [theAction]: MixedActions,
): action is DeepAction {
  return [action, theAction].every(isDeep)
}

// ======= debug tools =======

function log(
  value: any,
  signature: string = 'Mid_Result',
): any {
  console.log(signature, JSON.stringify(value))

  return value
}

function logCurrying(
  signature: string,
) {
  return (
    value: any,
  ) =>
    log(value, signature)
}

const deepReverse = function self(
  actions: MixedAction[],
): MixedAction[] {
  return actions
    .map(
      (
        action,
      ): Action | DeepAction => {
        if (isDeep(action)) {
          const [routeKey, actions] = action

          return [routeKey, self(actions)]
        }

        return action
      },
    )
    .toReversed()
}

export {
  actionsMustBeAnArrayError,
  isContinuousDeep,
  isDeep,
}

export {
  deepReverse,
  log,
  logCurrying,
}
