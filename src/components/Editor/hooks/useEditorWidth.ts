import { useEffect, useState } from 'react'

const EDITOR_WIDTH_KEY = 'editor-width'

export default function useEditorWidth() {
  const [editorWidth, setEditorWidth] = useState<number>(
    () => Number(localStorage.getItem(EDITOR_WIDTH_KEY)) || 50
  )

  useEffect(() => {
    localStorage.setItem(EDITOR_WIDTH_KEY, editorWidth.toString())
  }, [editorWidth])

  function resize(e: React.MouseEvent) {
    e.preventDefault()
    const startX = e.clientX
    const container = e.currentTarget.parentElement?.parentElement
    const containerWidth = container?.offsetWidth || 0

    document.body.style.cursor = 'col-resize'

    const onMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX
      const deltaPercentage = (deltaX / containerWidth) * 100
      const newWidth = editorWidth + deltaPercentage
      setEditorWidth(Math.min(80, Math.max(20, newWidth)))
    }

    const onMouseUp = () => {
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return { editorWidth, resize }
}
