import { useState } from 'react'

import './SlidesPreview.css'
import Default, { contents, titles } from '../../slides'

function SlideVariants({ slide }: any) {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const matchVariants = []
  if (slide.raw.includes('<h1>')) {
    matchVariants.push(...titles)
  } else {
    matchVariants.push(...contents)
  }
  matchVariants.push(Default)
  return (
    <div className="slidesVariants">
      {matchVariants.map((variant, i) => (
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
