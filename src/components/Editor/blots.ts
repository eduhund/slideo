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
    node.classList.add('image-loading')

    const imageContainer = document.createElement('div')
    imageContainer.className = 'imageBlot-imageContainer'

    const image = new Image()
    image.className = 'imageBlot-content'
    if (src.startsWith('http')) {
      const loadHandler = () => {
        image.removeEventListener('load', loadHandler)
        node.classList.remove('image-loading')
        node.querySelector('.imageBlot-preloaded_content')?.remove()
      }
      image.addEventListener('load', loadHandler, false)
    }
    image.src = src
    imageContainer.appendChild(image)

    const deleteButton = document.createElement('div')
    deleteButton.className = 'EmbedBlot-deleteButton'
    deleteButton.innerHTML = 'x'

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
    imageContainer.appendChild(deleteButton)
    node.appendChild(imageContainer)
    return node
  }

  static value(domNode: any) {
    return domNode.firstChild.getAttribute('src')
  }
}

export class AIMermaidBlot extends BlockEmbed {
  static blotName = 'ai-mermaid'
  static tagName = 'div'
  static className = 'ql-ai-mermaid'
  static allowedChildren = []

  static create(code: any) {
    const node = super.create() as HTMLElement

    node.setAttribute('data-mode', 'preview')
    node.setAttribute('data-code', code)
    AIMermaidBlot.render(node, code)

    return node
  }

  static render(node: HTMLElement, code: string) {
    const mode = node.getAttribute('data-mode') || 'preview'
    node.innerHTML = ''

    const toggleBtn = document.createElement('button')
    toggleBtn.className = 'mermaid-button'
    toggleBtn.contentEditable = 'false'
    toggleBtn.innerText = mode === 'preview' ? 'Edit code' : 'Preview'
    toggleBtn.onclick = () => {
      node.setAttribute('data-mode', mode === 'preview' ? 'code' : 'preview')
      AIMermaidBlot.render(node, code)
    }
    node.appendChild(toggleBtn)

    if (mode === 'code') {
      const textarea = document.createElement('textarea')
      textarea.value = code
      textarea.style.width = '100%'
      textarea.style.height = '150px'
      textarea.oninput = (e) => {
        e.preventDefault()
        e.stopPropagation()
        node.setAttribute('data-code', textarea.value)
        AIMermaidBlot.render(node, textarea.value)
      }
      node.appendChild(textarea)
    } else {
      const diagramContainer = document.createElement('div')
      diagramContainer.className = 'mermaid'
      diagramContainer.innerHTML = code
      node.appendChild(diagramContainer)

      try {
        mermaid.run({ nodes: [diagramContainer] })
      } catch (e) {
        diagramContainer.innerHTML = `<pre style="color:red;">${String(e)}</pre>`
      }
    }
    return node
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-code') || ''
  }
}
