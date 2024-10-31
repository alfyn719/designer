interface sFunction {
  params: {
    name: string
    type: string
  }[]
  expression: string
  result?: string
}

type DataKey = string
type DataType = string
type Structure = Record<DataKey, DataType>

type Data = Record<DataKey, any>

export type { Data, sFunction, Structure }
