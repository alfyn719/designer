import type { ComponentType } from 'react'

import { lazy } from 'react'

type ToObjectURL = (ctx: string, type: string) => string

const toObjectURL: ToObjectURL = (ctx, type = 'application/javascript') =>
  URL.createObjectURL(
    new File(
      [ctx],
      'anonymous',
      { type },
    ),
  )

const toComponent = (objectURL: string) =>
  lazy(
    // eslint-disable-next-line no-new-func
    new Function(
      `return import("${objectURL}")`,
    ) as () => Promise<{ default: ComponentType<any> }>,
  )

export { toComponent, toObjectURL }
