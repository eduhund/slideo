import { useContext, useEffect, useRef } from 'react'
import Quill from 'quill'
//@ts-ignore
import QuillMarkdown from 'quill-markdown-shortcuts'

import { SlidesContext } from '../../providers'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'
import { AIGenerateBlot, AIMermaidBlot, ImageBlot } from './blots'
import generateMermaid from '../../api/methods/generateMermaid'
import generateImage from '../../api/methods/generateImage'

Quill.register('modules/markdownShortcuts', QuillMarkdown)
Quill.register(ImageBlot)
Quill.register(AIGenerateBlot)
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
      quill.insertEmbed(index + 1, 'ImageBlot', imageUrl, Quill.sources.API)
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
        'MermaidBlot',
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

  const runSlidePostprocess = () => {
    if (!editorRef.current) return
    const root = editorRef.current.children[0] as HTMLElement | undefined
    if (!root) return

    let slideId = 1

    root.querySelectorAll('[data-slide-id]').forEach((el) => {
      el.removeAttribute('data-slide-id')
    })

    const isEmpty = (el: ChildNode | null) => {
      return (
        el?.nodeName !== 'DIV' &&
        (el?.firstChild?.nodeName === 'BR' || !el?.textContent?.trim())
      )
    }

    root.childNodes.forEach((node, index) => {
      if (index === 0) {
        ;(node as Element).setAttribute('data-slide-id', String(slideId))
        slideId++
        return
      }
      const prev1 = node.previousSibling || null
      const prev2 = prev1?.previousSibling || null

      if (
        (node as Element).nodeName === 'H1' ||
        (node as Element).nodeName === 'H2' ||
        (isEmpty(prev1) && isEmpty(prev2))
      ) {
        ;(node as Element).setAttribute('data-slide-id', String(slideId))
        slideId++
      }
    })

    // push parsed DOM to context
    if (quillRef.current) {
      const dom = quillRef.current.root.innerHTML
      dispatch({ type: 'PARSE_SLIDES', payload: dom })
    }
  }

  useEffect(() => {
    runSlidePostprocess()
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
        'ImageBlot',
        'MermaidBlot',
      ],
    })

    quillRef.current = quill

    quill.setContents(state.content, 'silent')

    requestAnimationFrame(() => {
      runSlidePostprocess()
    })

    quill.on('text-change', () => {
      const content = quill.getContents().ops
      const dom = quill.root.innerHTML
      dispatch({ type: 'UPDATE_CONTENT', payload: { content, dom } })
    })

    const handleRemoveEmbedBlot = (removeEmbedBlotEvent: any) => {
      const blot = Quill.find(removeEmbedBlotEvent.detail.node) as any
      const blotIndex = quill.getIndex(blot)
      quill.deleteText(blotIndex, 1, Quill.sources.USER)
    }

    const quillContainer = editorRef.current
    if (quillContainer) {
      quillContainer.addEventListener('removeEmbedBlot', handleRemoveEmbedBlot)
    }

    return () => {
      quillRef.current = null
    }
  }, [editorRef, quillRef])

  return editorRef
}
