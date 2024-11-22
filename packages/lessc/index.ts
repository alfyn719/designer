import less from 'less'

import RenderError = Less.RenderError
import RenderOutput = Less.RenderOutput

const math = 'parens-division'
const strictUnits = false

interface RLessc {
  error: RenderError
  result: RenderOutput | undefined
}

const lessc = (
  lessText: string,
) => {
  const { promise, resolve } = Promise.withResolvers<RLessc>()

  less.render(
    lessText,
    { math, strictUnits },
    (
      error,
      result,
    ) => resolve({ error, result }),
  )

  return promise
}

export default lessc
