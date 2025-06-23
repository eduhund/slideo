import { act, useContext, useEffect, useState } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import SlidesPreview, {
  SlidePreview,
} from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'

import './Concept3.scss'

function getAdjustSlidePosition(index: number) {
  const container = document.querySelector('.container')
  const containerTop = container?.getBoundingClientRect()?.top || 0
  const editorSlideStart = document.querySelector(
    `[data-slide-id="${index + 1}"]`
  )
  const nextSlide = document.querySelector(`[data-slide-id="${index + 2}"]`)
  const editorSlideEnd = nextSlide ? nextSlide.previousElementSibling : null

  const editorSlideTop = editorSlideStart?.getBoundingClientRect().top || 0
  const editorSlideBottom = editorSlideEnd?.getBoundingClientRect().bottom || 0
  const editorSlideHeight = editorSlideBottom - editorSlideTop

  if (editorSlideEnd && editorSlideHeight !== 0 && editorSlideHeight < 232) {
    ;(editorSlideEnd as HTMLElement).style.marginBottom =
      `${240 - editorSlideHeight}px`
  }
  return editorSlideTop - containerTop
}

function SlidePreviewItem({ slide, index, isActive, onSelect }: any) {
  const [slideAdjust, setSlideAdjust] = useState(0)
  useEffect(() => {
    setSlideAdjust(getAdjustSlidePosition(index))
  }, [index])
  return (
    <SlidePreview
      key={index}
      i={index + 1}
      slide={slide}
      isActive={isActive}
      onSelect={() => onSelect(index + 1)}
      style={{ top: `${slideAdjust + 24}px` }}
    />
  )
}

export default function Concept3() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state

  const slide = activeSlide ? slides[activeSlide - 1] : null

  function handleSlideSelect(index: number) {
    dispatch({ type: 'CHANGE_ACTIVE_SLIDE', payload: index })
  }
  return (
    <>
      <div className="container">
        <div className="containerWrapper">
          <Editor />
          <div className="slidesVariantsContainer">
            {slides.map((slide, i) => (
              <SlidePreviewItem
                key={i}
                index={i}
                slide={slide}
                isActive={activeSlide === i + 1}
                onSelect={() => handleSlideSelect(i + 1)}
              />
            ))}
          </div>
        </div>
        <SlideVariants slide={slide} onSelect={dispatch} />
      </div>
      <SlidesPreview />
    </>
  )
}
