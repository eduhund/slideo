import Editor from '../../../../components/Editor/Editor'
import SlidesPreview from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'
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
