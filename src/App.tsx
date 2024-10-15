import storeDemo, { switcher } from '@designer/data-model-designer'
import DataSourceForm from '@designer/data-source-designer'
import { useStore } from 'zustand'

const xxx = switcher(false)

storeDemo.subscribe((state) => {
  console.log('xxx', state)
})

storeDemo.subscribe(state => state.count, (count) => {
  console.log('count', count)
})

const App = () => {
  const count = useStore(storeDemo, state => state.count)
  const increment = useStore(storeDemo, state => state.increment)

  const state = useStore(xxx, state => state.switch)
  const on = useStore(xxx, state => state.on)
  const off = useStore(xxx, state => state.off)
  const toggle = useStore(xxx, state => state.toggle)

  return (
    <div>
      App
      {count}
      <button type="button" onClick={increment}>
        increment
      </button>

      <div>
        <div>{state ? 'on' : 'off'}</div>
        <button type="button" onClick={on}>
          on
        </button>
        <button type="button" onClick={off}>
          off
        </button>
        <button type="button" onClick={toggle}>
          toggle
        </button>
      </div>

      <DataSourceForm />
    </div>
  )
}

export default App
