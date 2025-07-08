import Quill from 'quill'
const BlockEmbed = Quill.import('blots/block/embed') as any

export class AIContentBlot extends BlockEmbed {
  static blotName = 'ai-content'
  static tagName = 'div'
  static className = 'ql-ai-content'
  static allowedChildren = []

  static create(value: any) {
    const node = super.create(value)
    node.setAttribute('contenteditable', false)
    return node
  }
}
