import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'
import Editor from '../../components/Editor/Editor'
import { Op } from 'quill'

const STORAGE_KEY = 'quill-editor-content'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

function Editor2({ value, onChange }: EditorProps) {
  const quillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    if (!quillRef.current) return

    const quill = quillRef.current.getEditor()

    quill.keyboard.addBinding(
      { key: '1', shortKey: true, altKey: true },
      () => {
        quill.format('header', 1)
      }
    )

    quill.keyboard.addBinding(
      { key: '2', shortKey: true, altKey: true },
      () => {
        quill.format('header', 2)
      }
    )

    quill.keyboard.addBinding(
      { key: '3', shortKey: true, altKey: true },
      () => {
        quill.format('header', 3)
      }
    )

    quill.keyboard.addBinding(
      { key: '0', shortKey: true, altKey: true },
      () => {
        quill.format('header', 0)
      }
    )

    quill.keyboard.addBinding(
      { key: '7', shortKey: true, shiftKey: true },
      () => {
        quill.format('list', 'ordered')
      }
    )

    quill.keyboard.addBinding(
      { key: '8', shortKey: true, shiftKey: true },
      () => {
        quill.format('list', 'bullet')
      }
    )

    quill.keyboard.addBinding(
      { key: 'X', shortKey: true, shiftKey: true },
      () => {
        quill.format('strike', !quill.getFormat().strike)
      }
    )
  }, [])
  /*
  const handleTextChange = (value: any) => {
    onChange(value)

    const quill = quillRef.current?.getEditor()
    if (!quill) return

    const text = quill.getText()
    const lines = quill.getLines()
    let offset = 0
    let emptyLines = 0
    console.log(text)
    console.log(lines)

    lines.forEach((line, index) => {
      if (index === 0) {
        quill.formatLine(offset, 1, 'header', 1)
      } else if (line === '') {
        emptyLines++
        quill.formatLine(offset, 1, 'header', false)
      } else {
        if (emptyLines >= 2) {
          quill.formatLine(offset, 1, 'header', 2)
        }
        emptyLines = 0
      }
      offset += line.length + 1
    })
  }
  */
  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={{
          toolbar: {
            container: '#toolbar',
          },
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'list',
          'bullet',
          'color',
          'background',
          'link',
          'image',
          'video',
          'clean',
        ]}
      />
    </div>
  )
}

export default function Main() {
  const [value, setValue] = useState<Op[]>(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY) || '{}'
    return JSON.parse(savedContent) as Op[]
  })

  //const slides = parseTextToSlides(value)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  }, [value])

  return (
    <main id="home">
      <div className="container">
        <Editor value={value} onChange={setValue} />
        <SlidesPreview slides={[]} />
      </div>
    </main>
  )
}
