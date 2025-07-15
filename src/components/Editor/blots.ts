import Quill from 'quill'
import generateImage from '../../api/methods/generateImage'
import generateMermaid from '../../api/methods/generateMermaid'
const BlockEmbed = Quill.import('blots/block/embed') as any

export class AIImageBlot extends BlockEmbed {
  static blotName = 'ai-image'
  static tagName = 'div'
  static className = 'ql-ai-content'
  static allowedChildren = []

  static create(value: any) {
    const node = super.create(value)
    node.setAttribute('contenteditable', false)
    node.classList.add('loading')

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.className = 'ai-cancel-button'
    node.appendChild(cancelButton)

    const controller = new AbortController()
    cancelButton.onclick = () => {
      controller.abort()
      if (node.parentNode) node.parentNode.removeChild(node)
    }

    const selectedText = value?.selectedText || ''

    generateImage(selectedText, '')
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
    return node
  }
}

export class AIMermaidBlot extends BlockEmbed {
  static blotName = 'ai-mermaid'
  static tagName = 'div'
  static className = 'ql-ai-content'
  static allowedChildren = []

  static create(value: any) {
    const node = super.create(value)
    const mockMermaid =
      '```mermaid\ngraph TB\n    A[Запустить MVP] -->|У команды продукта есть четко прописанное техническое задание| B[Интерфейс продукта]\n    B -->|глобальная доступность| C[Глобальная доступность]\n    B -->|инновации| D[Инновации]\n    B -->|доступность| E[Доступность]\n    B -->|безопасность| F[Безопасность]\n    A -->|Выбрать команду дизайнеров с подходящими компетенциями| G[Команда дизайнеров]\n    G -->|создание интерфейсов для мобильных приложений в сфере финансов и страхования| H[Опыт в создании интерфейсов для мобильных приложений в сфере финансов и страхования]\n```'

    node.className = 'ql-mermaid-diagram'
    node.innerText = mockMermaid
    /*
    node.setAttribute('contenteditable', false)
    node.classList.add('loading')

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.className = 'ai-cancel-button'
    node.appendChild(cancelButton)

    const controller = new AbortController()
    cancelButton.onclick = () => {
      controller.abort()
      if (node.parentNode) node.parentNode.removeChild(node)
    }

    const selectedText = value?.selectedText || ''

    generateMermaid(selectedText, '')
      .then((mermaidCode) => {
        if (!mermaidCode) throw new Error('No mermaid code in response')
          
        const newNode = document.createElement('div')
        newNode.className = 'ql-mermaid-diagram'
        newNode.innerText = mermaidCode
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
