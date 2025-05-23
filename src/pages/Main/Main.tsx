import Editor from '../../components/Editor/Editor'
import SlidesPreview from '../../components/SlidesPreview/SlidesPreview'

import './Main.css'

export default function Main() {
  return (
    <main id="home">
      <div className="container">
        <Editor />
        <div className="slidesPreviewContainer">
          <SlidesPreview />
        </div>
      </div>
    </main>
  )
}
