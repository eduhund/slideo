import Editor from '../../../../components/Editor/Editor'
import SlidesPreview from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'

import './Concept0.css'

export default function Concept0() {
  return (
    <>
      <div className="container">
        <Editor />
        <SlideVariants />
      </div>
      <SlidesPreview />
    </>
  )
}
