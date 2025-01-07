import type {
  AsyncExecutor,
  Executor,
  ObjectURL,
} from './index.type'

import { executorPrefixResource } from './executor/executor-prefix-resource'
import { executorPublicPath } from './executor/executor-public-path'

import { fetchFileText } from './helper'

import { editHtml, editHtmlWithPath } from './html-editor'

export type {
  AsyncExecutor,
  Executor,
  ObjectURL,
}

export {
  executorPrefixResource,
  executorPublicPath,
}

export { fetchFileText }

export { editHtml, editHtmlWithPath }
