import { Modal } from 'antd'

export default function SlideVariantsModal({
  title,
  open,
  onOk,
  onCancel,
}: any) {
  return (
    <Modal
      title={title}
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div className="slide-variants-modal">
        <h2>Slide Variants</h2>
        <p>Select a variant for your slide.</p>
        {/* Add content for slide variants here */}
      </div>
    </Modal>
  )
}
