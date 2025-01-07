import type { CheerioAPI } from 'cheerio'

type Executor = ($html: CheerioAPI) => void

type AsyncExecutor = ($html: CheerioAPI) => Promise<void>

type ObjectURL = string

export type {
  AsyncExecutor,
  Executor,
  ObjectURL,
}
