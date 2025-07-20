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

export class AIImageBlot extends BlockEmbed {
  static blotName = 'ai-image'
  static tagName = 'img'
  static className = 'ql-ai-image'
  static allowedChildren = []

  static create(imageUrl: any) {
    const node = super.create() as HTMLImageElement
    node.src = imageUrl
    node.setAttribute('contenteditable', 'false')
    return node
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
    console.log('AIMermaidBlot.render', node, code)
    const mode = node.getAttribute('data-mode') || 'preview'
    node.innerHTML = ''

    const toggleBtn = document.createElement('button')
    toggleBtn.className = 'mermaid-button'
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
      console.log('AIMermaidBlot.render diagramContainer', diagramContainer)
      node.appendChild(diagramContainer)

      try {
        mermaid.run({ nodes: [diagramContainer] })
      } catch (e) {
        diagramContainer.innerHTML = `<pre style="color:red;">${String(e)}</pre>`
      }
    }
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-code') || ''
  }
}
