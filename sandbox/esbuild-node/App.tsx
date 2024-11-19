import { cloneDeep } from 'lodash-es'

const App = () => {
  const name = cloneDeep('name')

  return (
    <div>
      App
      {name}
    </div>
  )
}

export default App
