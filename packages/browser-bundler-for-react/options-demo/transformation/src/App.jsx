import { useState } from 'react'

const App = () => {
  const [state] = useState(0)

  return (
    <div>
      <>
        <span>abc</span>
      </>
      App
      {state}
    </div>
  )
}

export default App
