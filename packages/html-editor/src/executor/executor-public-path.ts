import type { CheerioAPI } from 'cheerio'

import { pathBox } from '@alfyn/utils'

const { toFullPathOfDir } = pathBox

const executorPublicPath = (
  entry: string,
  $html: CheerioAPI,
) => {
  const resolve = 'window.publicPath'
  const script = `
    <script>
      ${resolve} = ${toFullPathOfDir(entry)}
    </script>
  `

  $html('head').append(script)
}

export {
  executorPublicPath,
}
