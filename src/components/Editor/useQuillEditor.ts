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
    if (!editorRef.current) return

    const root = editorRef.current.children[0]
    if (!root) return
    let slideId = 1

    root.querySelectorAll('[data-slide-id]').forEach((el) => {
      el.removeAttribute('data-slide-id')
    })

    root.childNodes.forEach((node, index) => {
      if (index === 0) {
        ;(node as Element).setAttribute('data-slide-id', String(slideId))
        slideId++
        return
      }
      const prev1 = node.previousSibling || null
      const prev2 = prev1?.previousSibling || null

      const isEmpty = (el: ChildNode | null) => {
        return el?.firstChild?.nodeName === 'BR' || !el?.textContent?.trim()
      }

      if (
        (node as Element).nodeName === 'H1' ||
        (node as Element).nodeName === 'H2' ||
        (isEmpty(prev1) && isEmpty(prev2))
      ) {
        ;(node as Element).setAttribute('data-slide-id', String(slideId))
        slideId++
      }
    })
  }, [state.content])

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    const quill = new Quill(editorRef.current, {
      theme: 'bubble',
      placeholder: 'Start your presentation here...',
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['blockquote', 'link', 'image', 'video'],
          ['clean'], // remove formatting button
        ],
        clipboard: {
          matchVisual: false,
        },
        markdownShortcuts: {},
      },
      formats: [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'blockquote',
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
