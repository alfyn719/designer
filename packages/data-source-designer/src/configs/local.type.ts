import type { Data, sFunction, Structure } from './common.type'

interface LocalConfig {
  source: {
    name: string

    // 数据结构描述
    structure: Structure

    // 使用静态数据
    type: 'local'
  }

  local: {
    // 根据 structure 配置的结构，填充数据
    data: Data

    // WARNING don't config setter
    // params 默认会传 set 和 get
    operate?: sFunction[]
  }
}

export type { LocalConfig }
