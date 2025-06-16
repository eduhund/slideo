import { useContext } from 'react'

import './SlidesPreview.css'
import slideTemplates, { Default } from '../../slides'
import { SlidesContext } from '../../providers'
import { ThemeSelector } from '..'
import exportSlidesAsPDF from '../../utils/export'

export function SlideVariants() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state

  const slide = activeSlide ? slides[activeSlide - 1] : null

  if (!slide) {
    return (
      <div className="slidesVariants">
        <span>Please select a slide to preview it variants.</span>
      </div>
    )
  }

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
          isSelected={Default.meta.name === slide.selectedTemplate}
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

function SlidePreview({ i, slide, isActive, onSelect }: any) {
  if (!slide.selectedTemplate) {
    return (
      <div className={`slidesPreview-item _empty`} onClick={onSelect}>
        <span>
          Slide #{i} <br></br>
          not selected
        </span>
      </div>
    )
  }

  const allVariants = Object.values(slideTemplates)
  const selectedVariant = allVariants.find(
    (variant) => variant.meta.name === slide.selectedTemplate
  )
  const SlideComponent = selectedVariant
    ? selectedVariant.component
    : Default.component

  return (
    <div
      className={`slidesPreview-item${isActive ? ' _active' : ''}`}
      onClick={onSelect}
    >
      <SlideComponent key={i} content={slide} onClick={onSelect} />
    </div>
  )
}

export function SlidesPreview() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide, selectedTemplates, activeTheme } = state
  const slidesQt = slides.length

  function handleSlideSelect(index: number) {
    dispatch({ type: 'CHANGE_ACTIVE_SLIDE', payload: index })
  }

  const disableExport =
    !slidesQt ||
    slidesQt > selectedTemplates.length ||
    selectedTemplates.includes(null)

  return (
    <div className={`bottomBar${slidesQt ? '' : ' _empty'}`}>
      <div className="slidesPreview">
        {slidesQt ? (
          slides.map((slide, i) => (
            <SlidePreview
              key={i}
              i={i + 1}
              slide={slide}
              isActive={activeSlide === i + 1}
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
      <div className="previewActions">
        <ThemeSelector />
        <button
          className={`_export ${disableExport ? '_disabled' : ''}`}
          disabled={disableExport}
          onClick={() => exportSlidesAsPDF(slides, activeTheme)}
        >
          Export slides
        </button>
      </div>
    </div>
  )
}
