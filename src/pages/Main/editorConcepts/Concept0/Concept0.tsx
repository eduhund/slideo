import Editor from '../../../../components/Editor/Editor'
import {
  SlidesPreview,
  SlideVariants,
} from '../../../../components/SlidesPreview/SlidesPreview'

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
