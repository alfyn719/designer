import type { sFunction } from './common.type'

interface ApiConfig {
  source: {
    name: string

    // 通过 api 获取数据
    type: 'api'

    // 数据结构描述
    structure: {
      [dataName: string]: string
    }
  }

  api: {

    // 通过服务代理还是直接请求：
    // true（默认）：使用设计器后端服务代理
    // string（true）：需额外指定代理服务地址
    // false：直接请求
    proxy: string | boolean

    operate: {
      [name: string]: {
        // 接口返回值经过 transformer 处理后会根据 path 被设置到 data 的指定位置
        isSetter: boolean
        path: string
        transformer: sFunction

        api: string
        method: 'get' | 'post' | 'put' | 'delete'
        headers: any
        params: {
          [key: string]: any
        }
        response: string

        // 是否需要刷新
        needRefresh: boolean
        refreshWho: string[]
      }
    }[]
  }
}

export type { ApiConfig }
