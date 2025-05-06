import { useState } from 'react'

import './SlidesPreview.css'
import slides, { Default } from '../../slides'

function SlideVariants({ slide }: any) {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const allVariants = Object.values(slides)

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
          content={slide}
          isSelected={selectedVariant === i || matchVariants.length === 1}
          onClick={() => setSelectedVariant(i !== selectedVariant ? i : null)}
        />
      ))}
    </div>
  )
}

export default function SlidesPreview({ slides }: any) {
  return (
    <div className="previewContainer">
      {slides.map((slide: any) => (
        <SlideVariants slide={slide} />
      ))}
    </div>
  )
}
