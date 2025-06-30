import { useEditorWidth } from './hooks'
import useQuillEditor from './useQuillEditor'

export default function Editor() {
  const editorRef = useQuillEditor()
  const { editorWidth, resize } = useEditorWidth()

  return (
    <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
      <div id="toolbar">
        <button className="ql-slideHeader">H</button>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-blockquote" />
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
        <button className="ql-clean" />
      </div>
      <div className="editor" ref={editorRef} />
      <div className="separator" onMouseDown={resize} />
    </div>
  )
}
