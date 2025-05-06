import { useState } from 'react'

import './SlidesPreview.css'
import * as slides from '../../slides'

function SlideVariants({ slide }: any) {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const matchVariants = Object.values(slides)
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
