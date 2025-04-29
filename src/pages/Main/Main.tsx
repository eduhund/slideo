import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'

const STORAGE_KEY = 'quill-editor-content'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

const CustomToolbar = () => (
  <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-header" defaultValue={''} onChange={(e) => e.persist()}>
        <option value="1">Main Title</option>
        <option value="2">Slide Title</option>
        <option value="3">Text Title</option>
        <option value="">Normal text</option>
      </select>
    </span>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>

    <span className="ql-formats">
      <button className="ql-list" value="ordered" />
      <button className="ql-list" value="bullet" />
    </span>

    <span className="ql-formats">
      <select className="ql-color" />
      <select className="ql-background" />
    </span>

    <span className="ql-formats">
      <button className="ql-link" />
      <button className="ql-image" />
      <button className="ql-video" />
    </span>

    <span className="ql-formats">
      <button className="ql-clean" />
    </span>
  </div>
);

function Editor({ value, onChange }: EditorProps) {
  const quillRef = useRef<ReactQuill>(null)

  useEffect(() => {
    if (!quillRef.current) return;

    const quill = quillRef.current.getEditor();

    quill.keyboard.addBinding({ key: '1', shortKey: true, altKey: true }, () => {
      quill.format('header', 1);
    });

    quill.keyboard.addBinding({ key: '2', shortKey: true, altKey: true }, () => {
      quill.format('header', 2);
    });

    quill.keyboard.addBinding({ key: '3', shortKey: true, altKey: true }, () => {
      quill.format('header', 3);
    });

    quill.keyboard.addBinding({ key: '0', shortKey: true, altKey: true }, () => {
      quill.format('header', 0);
    });

    quill.keyboard.addBinding({ key: '7', shortKey: true, shiftKey: true }, () => {
      quill.format('list', 'ordered');
    });

    quill.keyboard.addBinding({ key: '8', shortKey: true, shiftKey: true }, () => {
      quill.format('list', 'bullet');
    });

    quill.keyboard.addBinding({ key: 'X', shortKey: true, shiftKey: true }, () => {
      quill.format('strike', !quill.getFormat().strike);
    });
  }, [])
  const handleTextChange = (value: any) => {
    onChange(value)

    const quill = quillRef.current?.getEditor()
    if (!quill) return

    const text = quill.getText()
    const lines = text.split('\n')
    let offset = 0
    let emptyLines = 0

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
  return (
    <div><CustomToolbar />
      <ReactQuill
        ref={quillRef}
      theme="snow"
      value={value}
      onChange={handleTextChange}
      modules={{
        toolbar: {
          container: "#toolbar",
        },
      }}
      formats={[
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet',
        'color', 'background',
        'link', 'image', 'video',
        'clean',
      ]}
    /></div>
      
  )
}

export default function Main() {
  const [value, setValue] = useState(() => {
    const savedContent = localStorage.getItem(STORAGE_KEY)
    return savedContent || ''
  })

  const slides = parseTextToSlides(value)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, value)
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
