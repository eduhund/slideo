import { useContext } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import SlidesPreview from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'

import './Concept0.scss'

export default function Concept0() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state

  const slide = activeSlide ? slides[activeSlide - 1] : null
  return (
    <>
      <div className="container">
        <Editor />
        <SlideVariants slide={slide} onSelect={dispatch} />
      </div>
      <SlidesPreview />
    </>
  )
}
