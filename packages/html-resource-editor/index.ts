import { asyncPipeline } from '@designer/pipeline'
import { pathBox } from '@tools/utils'
import * as cheerio from 'cheerio'
import { resolve } from 'uri-js'

const {
  isAbsolutePath,
  unshiftPath,
  fileTextToPathCurrying,
  toFullPath,
} = pathBox

const fileTextFetcher = async (
  url: string,
) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.text()
}

const resourceModifier = (
  href: string,
  prefix: string,
  rawHtml: string,
) => {
  const current = href

  const SCRIPT = 'script'
  const SRC = 'src'
  const LINK = 'link'
  const HREF = 'href'

  const scriptSelector = `${SCRIPT}[${SRC}]`
  const linkSelector = `${LINK}[${HREF}]`

  const $ = cheerio.load(rawHtml)

  const resources = [...$(scriptSelector), ...$(linkSelector)]

  for (const resource of resources) {
    const { name, href, src = href } = resource.attribs
    if (isAbsolutePath(src)) {
      continue
    }

    const path = resolve(current, unshiftPath(prefix, src))

    const key = name === SCRIPT ? SRC : HREF
    resource.attribs[key] = path
  }

  return $.html()
}

const resourceModifierCurrying = (
  href: string,
  prefix: string,
) => (
  rawHtml: string,
) =>
  resourceModifier(href, prefix, rawHtml)

const addPrefixToHtmlResource = async (
  entry: string,
  prefix: string,
) =>
  asyncPipeline(
    [
      fileTextToPathCurrying('index.html', 'text/html'),
      resourceModifierCurrying(location.href, prefix),
      fileTextFetcher,
      toFullPath,
    ],
    entry,
  )

export { addPrefixToHtmlResource }
