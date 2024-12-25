/**
 * 逻辑说明：
 * 1.在全局环境（此处设定是 browser's window），添加一个对象作为 module's container。
 * 2.以 module's name 作为 键 ，以 module 本身作为 值 。
 * 3.添加方式是隐式的：在使用 EBuilder 打包时，会注入一段代码，执行时把 module 设置到指定对象中，即可取用。
 *   所以，你在代码中搜索不到 module 添加到 module's container 的代码。
 */

interface EModulesGlobal extends Window {
  [K: string]: any
}

class EModules {
  public readonly namespace: string

  public readonly modules: Record<string, any>

  constructor(global: EModulesGlobal, namespace: string) {
    if (namespace in global) {
      throw new Error('The namespace already exists')
    }

    this.namespace = namespace

    // TODO proxy 以实现组件管理
    this.modules = global[namespace] = {}
  }

  public getNamespace() {
    return this.namespace
  }
}

export default EModules
