import { useEffect, useState } from 'react'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'
import Editor from '../../components/Editor/Editor'

const STORAGE_KEY = 'quill-editor-content'

export default function Main() {
  const [value, setValue] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) || ''
  )

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
