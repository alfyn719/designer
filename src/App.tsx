import { ReactCompiler } from 'react-19'

import styles from './App.module.less'

function App() {
  return (
    <div className={styles.contentX}>
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>

      <ReactCompiler />
    </div>
  )
}

export default App
