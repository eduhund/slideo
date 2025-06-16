import Editor from '../../../../components/Editor/Editor'
import {
  SlidesPreview,
  SlideVariants,
} from '../../../../components/SlidesPreview/SlidesPreview'

import './Concept1.scss'

export default function Concept1() {
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
