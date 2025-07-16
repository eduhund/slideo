import Quill from 'quill'
import mermaid from 'mermaid'
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
    const node = super.create() as HTMLElement
    node.setAttribute('contenteditable', 'false')
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
      .then((code) => {
        const newNode = document.createElement('div')
        newNode.className = 'ql-ai-content'
        newNode.setAttribute('data-mode', 'preview')
        newNode.setAttribute('data-code', code)
        AIMermaidBlot.render(newNode, code)
        node.replaceWith(newNode)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error('API Error:', err)
        if (node.parentNode) node.parentNode.removeChild(node)
      })
    return node
  }

  static render(node: HTMLElement, code: string) {
    const mode = node.getAttribute('data-mode') || 'preview'
    node.innerHTML = ''

    const toggleBtn = document.createElement('button')
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
      textarea.oninput = () => {
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
  }

  static value(node: HTMLElement) {
    return {
      code: node.getAttribute('data-code') || '',
    }
  }
}
