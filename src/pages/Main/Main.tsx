import { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'

import './Main.css'
import { parseTextToSlides } from './utils/textParser'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'
import Editor from '../../components/Editor/Editor'
import { Op } from 'quill'

const STORAGE_KEY = 'quill-editor-content'

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
