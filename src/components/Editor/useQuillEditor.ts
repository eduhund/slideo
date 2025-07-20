import { useContext, useEffect, useRef } from 'react'
import Quill from 'quill'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'

import { SlidesContext } from '../../providers'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import { AIGenerateBlot, AIImageBlot, AIMermaidBlot } from './blots'
import generateMermaid from '../../api/methods/generateMermaid'
import generateImage from '../../api/methods/generateImage'

const STORAGE_KEY = 'quill-editor-content'

Quill.register('modules/markdownShortcuts', QuillMarkdown)
Quill.register(AIGenerateBlot)
Quill.register(AIImageBlot)
Quill.register(AIMermaidBlot)

const icons = Quill.import('ui/icons') as any
icons['insertAIImage'] = '🤖'
icons['insertAIMermaid'] = '🧟‍♂️'

function insertAIImage(quill: any) {
  const range = quill.getSelection()
  if (!range) return

  const selectedText = quill.getText(range.index, range.length)

  const index = range.index + range.length
  const [block] = quill.getLine(index)
  if (!block) return

  quill.insertText(index, '\n', Quill.sources.API)

  quill.insertEmbed(index + 1, 'ai-generate', Quill.sources.API)

  generateImage(selectedText, '')
    .then((imageUrl) => {
      quill.deleteText(index + 1, 1, Quill.sources.API)
      quill.insertEmbed(index + 1, 'ai-image', imageUrl, Quill.sources.API)
    })
    .catch((err) => {})
}

function insertAIMermaid(quill: any) {
  const range = quill.getSelection()
  if (!range) return

  const selectedText = quill.getText(range.index, range.length)

  const index = range.index + range.length
  const [block] = quill.getLine(index)
  if (!block) return

  quill.insertText(index, '\n', Quill.sources.API)

  quill.insertEmbed(index + 1, 'ai-generate', Quill.sources.API)

  generateMermaid(selectedText, '')
    .then((code) => {
      const processedCode = code.replace('```mermaid', '').replace('```', '')
      quill.deleteText(index + 1, 1, Quill.sources.API)
      quill.insertEmbed(
        index + 1,
        'ai-mermaid',
        processedCode,
        Quill.sources.API
      )
    })
    .catch((err) => {})
}

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
        return (
          el?.nodeName !== 'DIV' &&
          (el?.firstChild?.nodeName === 'BR' || !el?.textContent?.trim())
        )
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
      theme: 'snow',
      placeholder: 'Start your presentation here...',
      modules: {
        toolbar: {
          container: '#toolbar',
          handlers: {
            slideHeader: function () {
              const range = quill.getSelection()
              if (range) {
                const currentFormat = quill.getFormat(range)
                const isHeader2 = currentFormat.header === 2
                quill.formatLine(
                  range.index,
                  range.length,
                  'header',
                  isHeader2 ? false : 2
                )
              }
            },
            insertAIImage: function () {
              insertAIImage(quill)
            },
            insertAIMermaid: function () {
              insertAIMermaid(quill)
            },
          },
        },
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
        'ai-generate',
        'ai-image',
        'ai-mermaid',
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
