import { useContext } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'
import './Concept1.scss'

export default function Concept1() {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides } = state
  return (
    <div className="container">
      <Editor />
      <div className="slidesVariantsContainer">
        {slides.map((slide, index) => (
          <SlideVariants
            key={index}
            slide={slide}
            onSelect={(action: any) => {
              if (action.type === 'UPDATE_SLIDE') {
                dispatch({
                  type: 'UPDATE_SLIDE',
                  payload: { ...action.payload, index: index + 1 },
                })
              }
            }}
            style={{ top: `${index * 180}px` }}
          />
        ))}
      </div>
    </div>
  )
}
