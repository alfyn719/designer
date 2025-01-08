import type { ComponentType } from 'react'

import { lazy } from 'react'

type ReactModule = () => Promise<{ default: ComponentType<any> }>

/**
 * Prevent import() from being lost during compilation
 * @param path
 */

const toComponent = (
  path: string,
) =>
  lazy(
    // eslint-disable-next-line no-new-func
    new Function(
      `return import("${path}")`,
    ) as ReactModule,
  )

export {
  toComponent,
}
