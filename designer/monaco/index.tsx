import { loader } from '@monaco-editor/react'
import { useEffect, useRef } from 'react'

// monaco-editor 用于编辑 json 模式

interface MonacoEditorProps {
  value: string
  onChange: (value: string) => void
}

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loader.init().then((monaco) => {
      if (containerRef.current) {
        editorRef.current = monaco.editor.create(containerRef.current, {
          value,
          language: 'json',
          theme: 'vs-dark',
          automaticLayout: true,
        })

        editorRef.current.onDidChangeModelContent(() => {
          onChange(editorRef.current?.getValue() || '')
        })
      }
    })

    return () => {
      editorRef.current?.dispose()
    }
  }, [])

  return <div ref={containerRef} style={{ width: '100%', height: '400px' }} />
}

export default MonacoEditor
