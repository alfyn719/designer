import type { CheerioAPI } from 'cheerio'

import { pathBox } from '@alfyn/utils'

const {
  isFullPath,
  unshiftPath,
} = pathBox

const executorPrefixResource = (
  prefix: string,
  $html: CheerioAPI,
) => {
  const scriptSelector = 'script[src]'
  const linkSelector = 'link[href]'

  const scriptElements = $html(scriptSelector)
  const linkElements = $html(linkSelector)

  const { href } = location

  // the script executor

  for (const scriptElement of scriptElements) {
    const { src } = scriptElement.attribs

    if (isFullPath(src))
      continue

    scriptElement.attribs.src = (new URL(unshiftPath(prefix, src), href)).href
  }

  // the link executor

  for (const linkElement of linkElements) {
    const { href: src } = linkElement.attribs

    if (isFullPath(src))
      continue

    linkElement.attribs.href = (new URL(unshiftPath(prefix, src), href)).href
  }
}

export { executorPrefixResource }
