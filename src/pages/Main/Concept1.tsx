import Editor from '../../components/Editor/Editor'
import {
  SlidesPreview,
  SlideVariants,
} from '../../components/SlidesPreview/SlidesPreview'

import './Concept1.scss'

import '../../themes/sobakapav.scss'
import { useContext } from 'react'
import { SlidesContext } from '../../providers'
import { useEditorWidth } from '../../components/Editor/hooks'

export default function Concept1() {
  const { state } = useContext(SlidesContext)
  const { activeTheme } = state

  const { editorWidth, resize } = useEditorWidth()

  const [themeName, themeType] = activeTheme
    ? activeTheme.split('/')
    : ['sobakapav', 'light']

  return (
    <main id="home" className={`${themeName} _${themeType}`}>
      <div className="container">
        <div className="editorContainer" style={{ width: `${editorWidth}%` }}>
          <Editor />
          <div className="separator" onMouseDown={resize} />
        </div>
        <SlideVariants />
      </div>
      <SlidesPreview />
    </main>
  )
}
