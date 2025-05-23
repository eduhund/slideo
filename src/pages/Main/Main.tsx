import Editor from '../../components/Editor/Editor'
import {
  SlidesPreview,
  SlideVariants,
} from '../../components/SlidesPreview/SlidesPreview'

import './Main.css'

export default function Main() {
  return (
    <main id="home">
      <div className="container">
        <Editor />
        <SlideVariants />
      </div>
      <SlidesPreview />
    </main>
  )
}
