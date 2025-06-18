import { Modal } from 'antd'
import SlideVariants from '../../../../../components/SlideVariants/SlideVariants'
import { SlidesContext } from '../../../../../providers'
import { useContext } from 'react'

export default function SlideVariantsModal({ title, open, onOk }: any) {
  const { state, dispatch } = useContext(SlidesContext)
  const { slides, activeSlide } = state
  const slide = slides[activeSlide ? activeSlide - 1 : 0]
  return (
    <Modal
      title={title}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onOk={onOk}
      onCancel={onOk}
      style={{ top: '20px' }}
      width={'80%'}
    >
      <SlideVariants
        slide={slide}
        style={{ maxHeight: '70vh', overflowY: 'auto' }}
        onSelect={(action: any) => {
          if (action.type === 'UPDATE_SLIDE') {
            dispatch({
              type: 'UPDATE_SLIDE',
              payload: { ...action.payload },
            })
          }
        }}
      />
    </Modal>
  )
}
