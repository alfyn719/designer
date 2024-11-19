import { isArray } from 'lodash-es'

import App from './App'
import MiniLogo from './assets/minilogo.png'
import Logo from './assets/vite.svg'
import styles from './index.module.css'
import styles1 from './index1.module.css'
import { getName } from './utils'

const index = () => {
  const isName = isArray([])

  return (
    <span className={styles.name}>
      App
      {' '}
      {isName && <App />}
      {getName() }
      <img className={[styles1.name1, styles.name2].join(' ')} src={Logo} alt="LOGO" />
      <img src={MiniLogo} alt="MiniLogo" />
    </span>
  )
}

export default index
