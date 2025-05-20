import { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

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
  const editorRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)

  useEffect(() => {
    if (!editorRef.current || quillRef.current) return

    const quill = new Quill(editorRef.current, {
      theme: 'snow',
      modules: {
        toolbar: {
          container: '#toolbar',
        },
      },
      formats: [
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
      ],
    })

    quill.on('text-change', () => {
      onChange(quill.root.innerHTML)
    })

    quill.root.innerHTML = value
    quillRef.current = quill

    return () => {
      quillRef.current = null
    }
  }, [value, onChange])

  return (
    <div>
      <CustomToolbar />
      <div ref={editorRef} />
    </div>
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
