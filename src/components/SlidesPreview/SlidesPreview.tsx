import SlidesVariants from '../../slides'

import './SlidesPreview.css'

export default function SlidesPreview({ slides }: any) {
  return (
    <div className="previewContainer">
      <div className="slidesRow">
        {slides.map((slide: any) => {
          const matchVariants = SlidesVariants[0]
          return (
            <div className="slidesVariants">
              <section className={`slide`}>
                <matchVariants.component content={slide} />
              </section>
            </div>
          )
        })}
      </div>
    </div>
  )
}
