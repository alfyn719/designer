import type { CheerioAPI } from 'cheerio'

import { pathBox } from '@alfyn/utils'

const { toFullPathOfDir } = pathBox

const executorPublicPath = (
  entry: string,
  $html: CheerioAPI,
) => {
  const resolve = 'window.publicPath'
  const publicPath = `"${toFullPathOfDir(entry)}"`
  const script = `
    <script>
      ${resolve} = ${publicPath}
    </script>
  `

  $html('head').append(script)
}

export {
  executorPublicPath,
}
