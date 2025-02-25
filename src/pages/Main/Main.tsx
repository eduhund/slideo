import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './Main.css'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

type SlidesPreviewProps = {
  content: string
}
function Editor({ value, onChange }: EditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />
}

function SlidesPreview({ content }: SlidesPreviewProps) {
  return <div className="slides">{content}</div>
}

export default function Main() {
  const [value, setValue] = useState('')

  return (
    <main id="home">
      <div className="container">
        <Editor value={value} onChange={setValue} />
        <SlidesPreview content={value} />
      </div>
    </main>
  )
}
