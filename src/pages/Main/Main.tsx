import { useEffect, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import type { UnprivilegedEditor } from 'react-quill'
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
  const quillRef = useRef<ReactQuill>(null);

    useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Автоматически устанавливаем первый абзац как H1 при загрузке
    quill.formatLine(0, 1, 'header', 1);
  }, []);

  const handleTextChange = (value: any) => {
    onChange(value);

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const text = quill.getText();
    const lines = text.split('\n');
    let offset = 0;
    let emptyLines = 0;

    lines.forEach((line, index) => {
      if (index === 0) {
        quill.formatLine(offset, 1, 'header', 1);
      } else if (line === '') {
        emptyLines++;
        quill.formatLine(offset, 1, 'header', false);
      } else {
        if (emptyLines >= 2) {
          quill.formatLine(offset, 1, 'header', 2);
        } else {
          quill.formatLine(offset, 1, 'header', false);
        }
        emptyLines = 0;
      }
      offset += line.length + 1;
    });
  };
  return <ReactQuill ref={quillRef} theme="snow" value={value} onChange={handleTextChange} />
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
                <Slide content={slide.raw} theme={theme} />
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
