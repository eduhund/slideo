import { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'
import { useEditorWidth } from './hooks'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

Quill.register('modules/markdownShortcuts', QuillMarkdown)

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  const { editorWidth, resize } = useEditorWidth()

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        markdownShortcuts: {},
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'link',
        'image',
        'video',
      ],
    })

    quill.on('text-change', () => {
      const currentContent = quill.root.innerHTML
      if (currentContent !== value) {
        onChange(currentContent)
      }
    })

    quill.root.innerHTML = value
    quillRef.current = quill

    return () => {
      quillRef.current = null
    }
  }, [])

  return (
    <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
      <div className="editor" ref={editorRef} />
      <div className="separator" onMouseDown={resize} />
    </div>
  )
}
