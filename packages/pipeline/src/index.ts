import type {
  Action,
  DeepAction,
  DeepActions,
  MixedAction,
  MixedActions,
  Source,
  Target,
} from './actions.type'

import { asyncPipeline, asyncPipelineCurrying } from './asyncPipeline'

import {
  deepReverse,
  log,
  logCurrying,
} from './helper'

import { pipeline, pipelineCurrying } from './pipeline'

// ======= / =======

export {
  asyncPipeline,
  asyncPipelineCurrying,
  pipeline,
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
