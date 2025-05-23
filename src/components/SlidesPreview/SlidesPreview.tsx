import { useContext, useState } from 'react'

import './SlidesPreview.css'
import slideTemplates, { Default } from '../../slides'
import { SlidesContext } from '../../providers'

export function SlideVariants() {
  const { state } = useContext(SlidesContext)
  const { slides, activeSlide } = state

  if (activeSlide === null) {
    return (
      <div className="slidesVariants">
        <span>Please select a slide to preview its variants.</span>
      </div>
    )
  }

  const slide = slides[activeSlide - 1]

  const allVariants = Object.values(slideTemplates)

  const matchVariants = allVariants.filter((variant) => {
    if (slide.type === 'title') {
      const { title } = variant.meta as any
      if (title.level !== 1) return false
      if (title.minLength && title.minLength > slide.title.length) return false
      if (title.maxLength && title.maxLength < slide.title.length) return false
    }
    return true
  })

  if (matchVariants.length === 0) {
    return (
      <div className="slidesVariants">
        <Default.component
          content={slide}
          isSelected={true}
          onClick={() => {}}
        />
      </div>
    )
  }
  return (
    <div className="slidesVariants">
      {matchVariants.map((variant: any, i: number) => (
        <variant.component
          key={i}
          content={slide}
          isSelected={activeSlide === i + 1 || matchVariants.length === 1}
          //onClick={() => setSelectedVariant(i !== selectedVariant ? i : null)}
        />
      ))}
    </div>
  )
}

function SlidePreview({ i, slide, isSelected, onSelect }: any) {
  return (
    <div
      className={`previewSlide${isSelected ? ' _active' : ''}`}
      onClick={onSelect}
    >
      <span>Slide #{i}</span>
    </div>
  )
}

export function SlidesPreview() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state
  const slidesQt = slides.length

  function handleSlideSelect(index: number) {
    dispatch({ type: 'CHANGE_ACTIVE_SLIDE', payload: index })
  }

  return (
    <div className={`previewContainer${slidesQt ? '' : ' _empty'}`}>
      {slidesQt ? (
        slides.map((slide, i) => (
          <SlidePreview
            key={i}
            i={i + 1}
            slide={slide}
            isSelected={activeSlide === i + 1}
            onSelect={() => handleSlideSelect(i + 1)}
          />
        ))
      ) : (
        <span>
          We can't find any slides in the content. Please, use headers to
          structure the text.
        </span>
      )}
    </div>
  )
}
