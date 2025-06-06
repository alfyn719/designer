const prefetchWasm = (href: string) => {
  const link = document.createElement('link')

  link.href = href
  link.as = 'fetch'
  link.rel = 'prefetch'
  link.type = 'application/wasm'
  link.crossOrigin = 'anonymous'
  link.onload = () => {
    window.document.head.removeChild(link)
  }

  window.document.head.appendChild(link)
}

export default prefetchWasm
