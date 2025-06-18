import { useContext, useEffect, useState } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import SlideVariants from '../../../../components/SlideVariants/SlideVariants'
import './Concept2.scss'
import SlidesPreview, {
  SlidePreview,
} from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariantsModal from './components/SlideVariantsModal'

function SlidePreviewItem({ slide, index, onSelect }: any) {
  return (
    <SlidePreview
      key={index}
      i={index + 1}
      slide={slide}
      onSelect={() => onSelect(index + 1)}
    />
  )
}

export default function Concept2() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { state, dispatch } = useContext(SlidesContext)
  const { slides } = state

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
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
            <SlidePreviewItem
              key={i}
              index={i}
              slide={slide}
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
