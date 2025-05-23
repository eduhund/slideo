import { useEditorWidth } from './hooks'
import useQuillEditor from './useQuillEditor'

export default function Editor() {
  const editorRef = useQuillEditor()
  const { editorWidth, resize } = useEditorWidth()

  return (
    <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
      <div className="editor" ref={editorRef} />
      <div className="separator" onMouseDown={resize} />
    </div>
  )
}
