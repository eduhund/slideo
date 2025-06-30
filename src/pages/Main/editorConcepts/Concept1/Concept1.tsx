import { useContext, useEffect, useState } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'
import './Concept1.scss'
import SlidesPreview from '../../../../components/SlidesPreview/SlidesPreview'

function getAdjustSlidePosition(index: number) {
  const editor = document.querySelector('.editor')
  const editorTop = editor?.getBoundingClientRect().top || 0

  const editorSlideStart = document.querySelector(
    `[data-slide-id="${index + 1}"]`
  )
  const nextSlide = document.querySelector(`[data-slide-id="${index + 2}"]`)
  const editorSlideEnd = nextSlide ? nextSlide.previousElementSibling : null

  const editorSlideTop =
    (editorSlideStart?.getBoundingClientRect().top || 0) - editorTop + 4
  const editorSlideBottom =
    (editorSlideEnd?.getBoundingClientRect().bottom || 0) - editorTop + 4
  const editorSlideHeight = editorSlideBottom - editorSlideTop

  if (editorSlideEnd && editorSlideHeight !== 0 && editorSlideHeight < 180) {
    ;(editorSlideEnd as HTMLElement).style.marginBottom =
      `${188 - editorSlideHeight}px`
  }
  return editorSlideTop
}

function SlideVariantsItem({ slide, index }: any) {
  const [slideAdjust, setSlideAdjust] = useState(0)
  useEffect(() => {
    setSlideAdjust(getAdjustSlidePosition(index))
  }, [index, slide])
  return (
    <SlideVariants
      key={index}
      slide={slide}
      onSelect={(action: any) => {
        /*
        if (action.type === 'UPDATE_SLIDE') {
          dispatch({
            type: 'UPDATE_SLIDE',
            payload: { ...action.payload, activeSlide: index + 1 },
          })
        }
          */
      }}
      style={{ top: `${slideAdjust + 41}px` }}
    />
  )
}

export default function Concept1() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides } = state

  return (
    <>
      <div className="container">
        <Editor />
        <div className="slidesVariantsContainer">
          {slides.map((slide, index) => (
            <SlideVariantsItem
              key={index}
              slide={slide}
              index={index}
              dispatch={dispatch}
            />
          ))}
        </div>
      </div>
      <SlidesPreview />
    </>
  )
}
