import { useEditorWidth } from './hooks'
import useQuillEditor from './useQuillEditor'

type EditorProps = {
  value: string
  onChange: (value: string) => void
}

export default function Editor({ value, onChange }: EditorProps) {
  const editorRef = useQuillEditor(value, onChange)
  const { editorWidth, resize } = useEditorWidth()

  return (
    <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
      <div className="editor" ref={editorRef} />
      <div className="separator" onMouseDown={resize} />
    </div>
  )
}
