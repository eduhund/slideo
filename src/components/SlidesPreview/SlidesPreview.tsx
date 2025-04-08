import { useState } from 'react'
import SlidesVariants from '../../slides'

import './SlidesPreview.css'

function SlideVariants({ slide }: any) {
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const matchVariants = SlidesVariants[0]
  return (
    <div className="slidesVariants">
      {[1, 1, 1, 1, 1].map((item, i) => (
        <matchVariants.component
          content={slide}
          isSelected={selectedVariant === i}
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
