import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

type SlidesPreviewProps = {
  content: string
}

type SlideProps = SlidesPreviewProps & {
  theme: string
}

function HtmlRenderer({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

function Editor({ value, onChange }: EditorProps) {
  return <ReactQuill theme="snow" value={value} onChange={onChange} />
}

function SlidesPreview({ content }: SlidesPreviewProps) {
  const slides = parseTextToSlides(content)

  return (
    <div className="previewContainer">
      <div className="slidesRow">
        {slides.map((slide: any) => {
          return (
            <div className="slidesVariants">
              {['new', 'wave', 'neon'].map((theme) => (
                <Slide content={slide} theme={theme} />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Slide({ content, theme }: SlideProps) {
  return (
    <section className={`slide _${theme}`}>
      {HtmlRenderer({ html: content })}
    </section>
  )
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
