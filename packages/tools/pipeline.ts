type Action = (...args: any[]) => any

type Source = string
type Target = string

type RouteKey = [Source] | [Source, Target]

type DeepAction = [RouteKey, MixedAction[]]

type MixedAction = Action | DeepAction

// 1st library, just sniff mode
function isDeep(mode: any): mode is DeepAction {
  try {
    return typeof mode[0][0] === 'string'
  }
  catch (e) {
    return false
  }
}

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

// ======= Currying =======

function pipelineCurrying<T>(actions: MixedAction[]) {
  return (init: any) =>
    pipeline<T>(actions, init)
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

// ======= debug tools =======

function log(value: any, signature: string = 'Mid_Result'): any {
  console.log(signature, JSON.stringify(value))

  return value
}

function logCurrying(signature: string) {
  return (value: any) =>
    log(value, signature)
}

export type { MixedAction }

export {
  pipeline,
  asyncPipeline,
  pipelineCurrying,
  deepReverse,
  log,
  logCurrying,
}
