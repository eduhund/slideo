import { useEffect, useRef } from 'react'
import Quill from 'quill'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'

Quill.register('modules/markdownShortcuts', QuillMarkdown)

export default function useQuillEditor(
  value: string,
  onChange: (value: string) => void
) {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

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
  }, [editorRef, quillRef])

  return editorRef
}
