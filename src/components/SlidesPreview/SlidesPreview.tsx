import { useContext, useState } from 'react'

import './SlidesPreview.css'
import slideTemplates, { Default } from '../../slides'
import { SlidesContext } from '../../providers'

export function SlideVariants() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state

  if (activeSlide === null) {
    return (
      <div className="slidesVariants">
        <span>Please select a slide to preview it variants.</span>
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
    dispatch({
      type: 'UPDATE_SLIDE',
      payload: { selectedTemplate: 'default' },
    })
    return (
      <div className="slidesVariants">
        <Default.component
          content={slide}
          isSelected={Default.name === slide.selectedTemplate}
        />
      </div>
    )
  }

  const selectedVariant = matchVariants.find(
    (variant) => variant.meta.name === slide.selectedTemplate
  )
  if (!selectedVariant) {
    dispatch({
      type: 'UPDATE_SLIDE',
      payload: { selectedTemplate: matchVariants[0].meta.name },
    })
  }
  return (
    <div className="slidesVariants">
      {matchVariants.map((variant: any, i: number) => (
        <variant.component
          key={i}
          content={slide}
          isSelected={variant.meta.name === slide.selectedTemplate}
          onClick={() => {
            dispatch({
              type: 'UPDATE_SLIDE',
              payload: { selectedTemplate: variant.meta.name },
            })
          }}
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
