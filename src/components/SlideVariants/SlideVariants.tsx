import { useContext } from 'react'
import slideTemplates, { Default } from '../../slides'
import { SlidesContext } from '../../providers'

export default function SlideVariants() {
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
