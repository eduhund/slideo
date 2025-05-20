import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'
import { Op } from 'quill'

const STORAGE_KEY = 'quill-editor-content'

Quill.register('modules/markdownShortcuts', QuillMarkdown) // Register the markdown module

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

function Editor({ value, onChange }: EditorProps) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        markdownShortcuts: {}, // Enable markdown shortcuts
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
    <div>
      <div ref={editorRef} />
    </div>
  )
}

export default function Main() {
  const [value, setValue] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || ''
  )

  const slides = parseTextToSlides(value)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, [value])

  return (
    <main id="home">
      <div className="container">
        <Editor value={value} onChange={setValue} />
        <SlidesPreview slides={slides} />
      </div>
    </main>
  )
}
