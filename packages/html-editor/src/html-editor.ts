import type {
  AsyncExecutor,
  Executor,
  ObjectURL,
} from './index.type'

import { asyncPipeline } from '@alfyn/pipeline'
import { errorBox, pathBox } from '@alfyn/utils'
import * as cheerio from 'cheerio'

import { fetchFileText } from './helper.ts'

const { mustBeAStringError } = errorBox

const { toFileObjectURLCurrying, toFullPath } = pathBox

const editHtml = async (
  executors: Array<AsyncExecutor | Executor>,
  rawHtml: string,
) => {
  const $ = cheerio.load(rawHtml)

  for (const executor of executors) {
    await executor($)
  }

  return $.html()
}

const editHtmlCurrying = (
  executors: Array<AsyncExecutor | Executor>,
) =>
  (
    rawHtml: string,
  ) =>
    editHtml(executors, rawHtml)

const editHtmlWithPath = async (
  executors: Array<AsyncExecutor | Executor>,
  entry: string,
) => {
  mustBeAStringError(entry, 'htmlEditor', 'entry')

  return asyncPipeline<ObjectURL>(
    [
      toFileObjectURLCurrying('index.html', 'text/html'),
      editHtmlCurrying(executors),
      fetchFileText,
      toFullPath,
    ],
    entry,
  )
}

export {
  editHtml,
  editHtmlCurrying,
  editHtmlWithPath,
}
