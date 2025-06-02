import Editor from '../../components/Editor/Editor'
import {
  SlidesPreview,
  SlideVariants,
} from '../../components/SlidesPreview/SlidesPreview'

import './Main.css'

import '../../themes/sobakapav.scss'
import { useContext } from 'react'
import { SlidesContext } from '../../providers'

export default function Main() {
  const { state } = useContext(SlidesContext)
  const { activeTheme } = state

  const [themeName, themeType] = activeTheme
    ? activeTheme.split('/')
    : ['default', 'light']
  return (
    <main id="home" className={`${themeName} _${themeType}`}>
      <div className="container">
        <Editor />
        <SlideVariants />
      </div>
      <SlidesPreview />
    </main>
  )
}
