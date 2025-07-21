import Quill from 'quill'
import mermaid from 'mermaid'
const BlockEmbed = Quill.import('blots/block/embed') as any

export class AIGenerateBlot extends BlockEmbed {
  static blotName = 'ai-generate'
  static tagName = 'div'
  static className = 'ql-ai-generate'
  static allowedChildren = []

  static create() {
    const node = super.create()
    node.setAttribute('contenteditable', false)

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    cancelButton.className = 'ai-cancel-button'
    node.appendChild(cancelButton)

    const controller = new AbortController()
    cancelButton.onclick = () => {
      controller.abort()
      if (node.parentNode) node.parentNode.removeChild(node)
    }

    return node
  }
}

export class ImageBlot extends BlockEmbed {
  static blotName = 'imageBlot'
  static tagName = 'div'
  static className = 'imageBlot'
  static allowedChildren = []

  static create(src: string) {
    const node = super.create(src)
    node.classList.add('EmbedBlot')
    node.setAttribute('contentEditable', 'false')
    node.setAttribute('data-src', src)
    node.classList.add('image-loading')

    const imageContainer = document.createElement('div')
    imageContainer.className = 'EmbedBlot-imageContainer'

    const image = new Image()
    image.className = 'EmbedBlot-content'
    if (src.startsWith('http')) {
      const loadHandler = () => {
        image.removeEventListener('load', loadHandler)
        node.classList.remove('image-loading')
        node.querySelector('.EmageBlot-preloaded_content')?.remove()
      }
      image.addEventListener('load', loadHandler, false)
    }
    image.src = src
    imageContainer.appendChild(image)

    const actionButtons = document.createElement('div')
    actionButtons.className = 'EmbedBlot-actionButtons'

    const deleteButton = document.createElement('div')
    deleteButton.className = 'EmbedBlot-actionButton __delete'
    deleteButton.innerHTML = '🗑️'

    deleteButton.addEventListener('click', () => {
      node.dispatchEvent(
        new CustomEvent('removeEmbedBlot', {
          bubbles: true,
          detail: {
            node,
          },
        })
      )
    })

    actionButtons.appendChild(deleteButton)
    imageContainer.appendChild(actionButtons)
    node.appendChild(imageContainer)
    return node
  }

  static value(domNode: any) {
    return domNode.querySelector('img').getAttribute('src')
  }
}

export class AIMermaidBlot extends BlockEmbed {
  static blotName = 'ai-mermaid'
  static tagName = 'div'
  static className = 'ql-ai-mermaid'
  static allowedChildren = []

  static create(code: any) {
    const node = super.create() as HTMLElement
    node.classList.add('EmbedBlot')
    AIMermaidBlot.render(node, code)

    return node
  }

  static render(node: HTMLElement, code: string) {
    node.innerHTML = ''

    const mermaidContainer = document.createElement('div')
    mermaidContainer.className = 'EmbedBlot-mermaidContainer'

    const diagramContainer = document.createElement('div')
    diagramContainer.className = 'mermaid'
    diagramContainer.innerHTML = code
    mermaidContainer.appendChild(diagramContainer)

    const actionButtons = document.createElement('div')
    actionButtons.className = 'EmbedBlot-actionButtons'

    const editButton = document.createElement('div')
    editButton.className = 'EmbedBlot-actionButton'
    editButton.contentEditable = 'false'
    editButton.innerHTML = '✏️'
    actionButtons.appendChild(editButton)

    const deleteButton = document.createElement('div')
    deleteButton.className = 'EmbedBlot-actionButton __delete'
    deleteButton.contentEditable = 'false'
    deleteButton.innerHTML = '🗑️'

    deleteButton.addEventListener('click', () => {
      node.dispatchEvent(
        new CustomEvent('removeEmbedBlot', {
          bubbles: true,
          detail: {
            node,
          },
        })
      )
    })
    actionButtons.appendChild(deleteButton)
    mermaidContainer.appendChild(actionButtons)

    node.appendChild(mermaidContainer)

    try {
      mermaid.run({ nodes: [diagramContainer] })
    } catch (e) {
      diagramContainer.innerHTML = `<pre style="color:red;">${String(e)}</pre>`
    }
    return node
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-code') || ''
  }
}
