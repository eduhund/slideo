import { useEditorWidth } from './hooks'
import useQuillEditor from './useQuillEditor'

import './Editor.scss'

export default function Editor() {
  const editorRef = useQuillEditor()
  const { editorWidth, resize } = useEditorWidth()

  return (
    <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
      <div id="toolbar">
        <span className="ql-formats">
          <button className="ql-slideHeader">H</button>
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
        </span>
        <span className="ql-formats">
          <button className="ql-blockquote" />
          <button className="ql-link" />
        </span>
        <span className="ql-formats">
          <button className="ql-image" />
          <button className="ql-video" />
        </span>
        <span className="ql-formats">
          <button className="ql-clean" />
        </span>
        <span className="ql-formats">
          <button className="ql-insertAIImage">🤖</button>
          <button className="ql-insertAIMermaid">🧟‍♂️</button>
        </span>
      </div>
      <div className="editor" ref={editorRef} />
      <div className="separator" onMouseDown={resize} />
    </div>
  )
}
