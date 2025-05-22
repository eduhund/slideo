import { useEffect, useState, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'

const EDITOR_WIDTH_KEY = 'editor-width'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

Quill.register('modules/markdownShortcuts', QuillMarkdown)

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  const [editorWidth, setEditorWidth] = useState<number>(
    () => Number(localStorage.getItem(EDITOR_WIDTH_KEY)) || 50
  )

  useEffect(() => {
    localStorage.setItem(EDITOR_WIDTH_KEY, editorWidth.toString())
  }, [editorWidth])

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

  function handleMouseDown(e: React.MouseEvent) {
    e.preventDefault()
    const startX = e.clientX
    const container = e.currentTarget.parentElement?.parentElement
    const containerWidth = container?.offsetWidth || 0

    document.body.style.cursor = 'col-resize'

    const onMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX
      const deltaPercentage = (deltaX / containerWidth) * 100
      const newWidth = editorWidth + deltaPercentage
      setEditorWidth(Math.min(80, Math.max(20, newWidth)))
    }

    const onMouseUp = () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
      <div className="editor" ref={editorRef} />
      <div className="separator" onMouseDown={handleMouseDown} />
    </div>
  )
}
