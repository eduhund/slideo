import { useContext } from 'react'

import './SlidesPreview.css'
import slideTemplates, { Default } from '../../slides'
import { SlidesContext } from '../../providers'
import { ThemeSelector } from '..'
import exportSlidesAsPDF from '../../utils/export'

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

export default function SlidesPreview() {
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
