import type {
  Action,
  DeepAction,
  DeepActions,
  MixedAction,
  MixedActions,
  Source,
  Target,
} from './src/actions.type'

import {
  asyncPipeline,
  asyncPipelineCurrying,
} from './src/asyncPipeline.ts'

import {
  deepReverse,
  log,
  logCurrying,
} from './src/helper.ts'

import {
  pipeline,
  pipelineCurrying,
} from './src/pipeline'

export default pipeline

export {
  asyncPipeline,
  asyncPipelineCurrying,
  pipelineCurrying,
}

export {
  deepReverse,
  log,
  logCurrying,
}

export type {
  Action,
  DeepAction,
  DeepActions,
  MixedAction,
  MixedActions,
  Source,
  Target,
}
