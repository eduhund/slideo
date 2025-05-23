import { useContext, useEffect, useRef } from 'react'
import Quill from 'quill'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'

import { SlidesContext } from '../../providers'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'

const STORAGE_KEY = 'quill-editor-content'

Quill.register('modules/markdownShortcuts', QuillMarkdown)

export default function useQuillEditor() {
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  const { state, dispatch } = useContext(SlidesContext)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, state.content)
  }, [state.content])

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
      if (currentContent !== state.content) {
        dispatch({ type: 'UPDATE_CONTENT', payload: currentContent })
      }
    })

    quill.root.innerHTML = state.content
    quillRef.current = quill

    return () => {
      quillRef.current = null
    }
  }, [editorRef, quillRef])

  return editorRef
}
