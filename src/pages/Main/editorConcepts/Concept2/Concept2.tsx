import { useContext, useEffect, useState } from 'react'
import { SlidesContext } from '../../../../providers'
import Editor from '../../../../components/Editor/Editor'
import './Concept2.scss'
import SlidesPreview, {
  SlidePreview,
} from '../../../../components/SlidesPreview/SlidesPreview'
import SlideVariantsModal from './components/SlideVariantsModal'

function getAdjustSlidePosition(index: number) {
  const container = document.querySelector('.container')
  const containerTop = container?.getBoundingClientRect()?.top || 0
  const editorSlideStart = document.querySelector(
    `[data-slide-id="${index + 1}"]`
  )
  const nextSlide = document.querySelector(`[data-slide-id="${index + 2}"]`)
  const editorSlideEnd = nextSlide ? nextSlide.previousElementSibling : null

  const editorSlideTop = editorSlideStart?.getBoundingClientRect().top || 0
  const editorSlideBottom = editorSlideEnd?.getBoundingClientRect().bottom || 0
  const editorSlideHeight = editorSlideBottom - editorSlideTop

  if (editorSlideEnd && editorSlideHeight !== 0 && editorSlideHeight < 232) {
    ;(editorSlideEnd as HTMLElement).style.marginBottom =
      `${240 - editorSlideHeight}px`
  }
  return editorSlideTop - containerTop
}

function SlidePreviewItem({ slide, index, onSelect }: any) {
  const [slideAdjust, setSlideAdjust] = useState(0)
  useEffect(() => {
    setSlideAdjust(getAdjustSlidePosition(index))
  }, [index])
  return (
    <SlidePreview
      key={index}
      i={index + 1}
      slide={slide}
      onSelect={() => onSelect(index + 1)}
      style={{ top: `${slideAdjust}px` }}
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
