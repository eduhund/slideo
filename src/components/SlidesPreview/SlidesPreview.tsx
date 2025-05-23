import { useContext, useState } from 'react'

import './SlidesPreview.css'
import slides, { Default } from '../../slides'
import { SlidesContext } from '../../providers'
import { parseTextToSlides } from '../../utils/textParser'

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
          key={i}
          content={slide}
          isSelected={selectedVariant === i || matchVariants.length === 1}
          onClick={() => setSelectedVariant(i !== selectedVariant ? i : null)}
        />
      ))}
    </div>
  )
}

export default function SlidesPreview() {
  const { state } = useContext(SlidesContext)

  const slides = parseTextToSlides(state.content)

  const slidesQt = slides.length
  return (
    <div className={`previewContainer${slidesQt ? '' : ' _empty'}`}>
      {slidesQt ? (
        slides.map((slide: any, i: number) => (
          <SlideVariants key={i} slide={slide} />
        ))
      ) : (
        <span>
          We can't find any slides in the content.
          <br></br>
          Please, use headers or double linebreak to structure the text.
        </span>
      )}
    </div>
  )
}
