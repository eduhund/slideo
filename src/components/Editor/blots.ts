import Quill from 'quill'
import generateImage from '../../api/methods/generateImage'
const BlockEmbed = Quill.import('blots/block/embed') as any

export class AIContentBlot extends BlockEmbed {
  static blotName = 'ai-content'
  static tagName = 'div'
  static className = 'ql-ai-content'
  static allowedChildren = []

  static create(value: any) {
    const node = super.create(value)
    node.setAttribute('contenteditable', false)
    node.classList.add('loading')

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Отменить'
    cancelButton.className = 'ai-cancel-button'
    node.appendChild(cancelButton)

    const controller = new AbortController()
    cancelButton.onclick = () => {
      controller.abort()
      if (node.parentNode) node.parentNode.removeChild(node)
    }

    const selectedText = value?.selectedText || ''

    generateImage(selectedText, '')
    /*
      .then((imageUrl) => {
        if (!imageUrl) throw new Error('No image in response')

        const newNode = document.createElement('img')
        newNode.src = imageUrl
        newNode.className = 'ql-ai-image'
        node.replaceWith(newNode)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('API Error:', err)
        if (node.parentNode) node.parentNode.removeChild(node)
      })
        */
    return node
  }
}
