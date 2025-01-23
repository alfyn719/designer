import styles from './App.module.less'

function App() {
  return (
    <div className={styles.contentX}>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <span>change</span>
    </div>
  )
}

export default App

interface Prop {
  key: string

  /**
   * 根据不同的格式，会有不同的结构，需要描述结构
   */

  value: any

  /**
   * 值的来源：
   *
   * SOURCE：
   *  1.具体是哪个数据源，通过可视化关联；
   *  2.接口实例 拥有标准的交互逻辑；
   *  3.自动生成 CRUD 方法，根据对应的数据源拥有的操作方法生成；
   *
   * STATIC：有一个输入框，获取用户输入作为默认值；
   */

  source: 'SOURCE' | 'STATIC'

  mockValue?: string
}

interface Setter {
  key: string

  /**
   * 选择 SOURCE 是 STATIC 的 prop，
   */

  target: string

  /**
   * target 具体设置的 path
   */

  path?: string
}

interface Getter {
  key: string

  target: string
}

interface ReactState {
  name: string

  props: Array<Prop>

  setters: Array<Setter>

  /**
   * 目的
   * 取值方便
   * 性能优化
   */

  getters: Array<Getter>
}

/**
 * react state 的特性：
 * 1.响应式的值
 * 2.改变值的方法
 * 3.监听器，监听值的改变
 * 4.取值器
 */
