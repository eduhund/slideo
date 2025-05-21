import { useEffect, useState } from 'react'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'
import Editor from '../../components/Editor/Editor'

const STORAGE_KEY = 'quill-editor-content'
const EDITOR_WIDTH_KEY = 'editor-width'

export default function Main() {
  const [value, setValue] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || ''
  )
  const [editorWidth, setEditorWidth] = useState<number>(
    () => Number(localStorage.getItem(EDITOR_WIDTH_KEY)) || 50
  )

  const slides = parseTextToSlides(value)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, value)
  }, [value])

  useEffect(() => {
    localStorage.setItem(EDITOR_WIDTH_KEY, editorWidth.toString())
  }, [editorWidth])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const container = e.currentTarget.parentElement?.parentElement
    const containerWidth = container?.offsetWidth || 0

    document.body.style.cursor = 'col-resize' // Change cursor to resize

    const onMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX
      const deltaPercentage = (deltaX / containerWidth) * 100 // Scale deltaX to percentage
      const newWidth = editorWidth + deltaPercentage
      setEditorWidth(Math.min(80, Math.max(20, newWidth))) // Clamp width between 20% and 80%
    }

    const onMouseUp = () => {
      document.body.style.cursor = '' // Reset cursor to default
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <main id="home">
      <div className="container">
        <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
          <Editor value={value} onChange={setValue} />
          <div className="separator" onMouseDown={handleMouseDown} />
        </div>
        <div className="slidesPreviewContainer">
          <SlidesPreview slides={slides} />
        </div>
      </div>
    </main>
  )
}
