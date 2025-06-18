import { useContext, useEffect, useState } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'
import './Concept2.scss'
import SlidesPreview, {
  SlidePreview,
} from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariantsModal from './components/SlideVariantsModal'

function SlideVariantsItem({ slide, index, dispatch }: any) {
  return (
    <SlideVariants
      key={index}
      slide={slide}
      onSelect={(action: any) => {
        /*
        if (action.type === 'UPDATE_SLIDE') {
          dispatch({
            type: 'UPDATE_SLIDE',
            payload: { ...action.payload, activeSlide: index + 1 },
          })
        }
          */
      }}
    />
  )
}

export default function Concept2() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  function handleSlideSelect(index: number) {
    dispatch({ type: 'CHANGE_ACTIVE_SLIDE', payload: index })
    showModal()
  }

  return (
    <>
      <div className="container">
        <Editor />
        <div className="slidesVariantsContainer">
          {slides.map((slide, i) => (
            <SlidePreview
              key={i}
              i={i + 1}
              slide={slide}
              isActive={activeSlide === i + 1}
              onSelect={() => handleSlideSelect(i + 1)}
            />
          ))}
        </div>
      </div>
      <SlidesPreview />
      <SlideVariantsModal
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
      />
    </>
  )
}
