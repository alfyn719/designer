import { useState } from "react"

const UI = () => {
    const [state, setState] = useState('YIKE')

    return <div className="">CURSOR {state}</div>
}

export default UI