import type { sFunction } from './common.type'

interface LocalConfig {
  source: {
    name: string

    // 使用静态数据
    type: 'local'

    // 数据结构描述
    structure: {
      [dataName: string]: string
    }
  }

  data: {

    // 根据 structure 配置的结构，填充数据
    [dataName: string]: any
  }

  // WARNING don't config setter
  // params 默认会传 set 和 get
  operate?: sFunction[]
}

export type { LocalConfig }
