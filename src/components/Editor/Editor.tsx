import useQuillEditor from './useQuillEditor'

export default function Editor() {
  const editorRef = useQuillEditor()

  return <div className="editor" ref={editorRef} />
}
