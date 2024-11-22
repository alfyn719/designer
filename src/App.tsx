import { EBundler, EComponent, EModules } from '@tools/esbuild'

import styles from './App.module.less'

const eModules = new EModules(window, 'mimeTest')

console.log('xxx', eModules)

const testC = new EComponent({
  bundler: new EBundler({ DEV: true }),
  name: 'testC',
  version: '0.0.1',
  files: {},
  entryPoint: './index.tsx',
  DEV: true,
})

testC.createFile(`
  import hello from './hello.js'
  import styles from './index.module.less'

  const App = () => {
    hello()
  
    return <div className={styles.name}>build test</div>
  }
  
  export default App
`, './index.tsx')

testC.createFile(`
  import helloBase from './helloBase.js'

  const hello = () => {
    helloBase()
    
    console.log('hello')
  }
  
  export default hello
`, './hello.js')

testC.createFile(`
  const helloBase = () => {
    console.log('hello base')
  }
  
  export default helloBase
`, './helloBase.js')

testC.createFile(`
  .name {
    color: red;
    
    .age {
      line-height: 22;
    }
  }
`, './index.module.less')

setTimeout(() => {
  const r = testC.bundle('namespace')

  console.log('xxx r', r)
}, 2000)

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
