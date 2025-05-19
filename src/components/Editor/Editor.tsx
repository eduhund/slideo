import React, {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from 'react'
import Quill, { Op } from 'quill'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'

let Delta = Quill.import('delta')
let Keyboard = Quill.import('modules/keyboard')

const CustomToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select
        className="ql-header"
        defaultValue={''}
        onChange={(e) => e.persist()}
      >
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
)

function Editor({
  value,
  onChange,
}: {
  value: Op[]
  onChange: (arg0: Op[]) => void
}) {
  const nodeRef = useRef<HTMLDivElement | null>(null)
  const quillRef = useRef<Quill | null>(null)
  const [quill, setQuill] = useState<Quill | null>(null)

  const handleTextChange = useCallback(() => {
    if (!quill) return
    const d = quill.getContents()
    onChange(d.ops)
  }, [quill, onChange])

  useLayoutEffect(() => {
    if (!nodeRef.current || quillRef.current) return

    const quill = new Quill(nodeRef.current, {
      placeholder: "So, let's start!",
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
    quillRef.current = quill
    quill.setContents(value, 'api')
    setQuill(quill)

    return () => {
      quillRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!quillRef.current) return
    const current = quillRef.current.getContents()
    if (JSON.stringify(current.ops) !== JSON.stringify(value)) {
      quillRef.current.setContents(value, 'api')
    }
  }, [value])

  useLayoutEffect(() => {
    if (!quill) {
      return
    }
    quill.on('text-change', handleTextChange)

    return () => {
      quill.off('text-change', handleTextChange)
    }
  }, [quill, handleTextChange])

  return (
    <div className={'Editor quill'} translate="no">
      <CustomToolbar />
      <div ref={nodeRef} />
    </div>
  )
}

export default React.forwardRef(Editor)
