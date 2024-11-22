import App from './App'
import Logo from './assets/vite.svg'
import styles from './index.module.css'
import styles1 from './index1.module.css'
import { getName } from './utils'

const index = () => {
  return (
    <span className={styles.name}>
      App
      <App />
      {getName() }
      <img className={[styles1.name1, styles.name2].join(' ')} src={Logo} alt="LOGO" />
    </span>
  )
}

export default index
