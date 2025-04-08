import SlidesVariants from '../../slides'

import './SlidesPreview.css'

export default function SlidesPreview({ slides }: any) {
  return (
    <div className="previewContainer">
      {slides.map((slide: any) => {
        const matchVariants = SlidesVariants[0]
        return (
          <div className="slidesVariants">
            <matchVariants.component content={slide} />
            <matchVariants.component content={slide} />
            <matchVariants.component content={slide} />
            <matchVariants.component content={slide} />
            <matchVariants.component content={slide} />
          </div>
        )
      })}
    </div>
  )
}
