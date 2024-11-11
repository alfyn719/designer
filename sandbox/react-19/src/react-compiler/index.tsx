import { useEffect, useState } from 'react'

const arr = Array.from({ length: 1000 }).map((_, i) => i)

const Li = ({ value }) => {
  return <li>{value}</li>
}

const ReactCompiler = () => {
  const [value, setValue] = useState(arr)

  useEffect(() => {
    setTimeout(() => {
      setValue(['ABC', ...value])
    }, 5000)
  }, [])

  return (
    <ul>
      {
        value.map((item, i) => (<Li key={i} value={item} />))
      }
    </ul>
  )
}

export default ReactCompiler
