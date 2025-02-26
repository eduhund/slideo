function extractH1Section(doc: Document): string | null {
  const h1 = doc.querySelector('h1')
  if (!h1) return null

  let content = ''
  let node: ChildNode | null = h1

  while (node && node.nodeName !== 'H2') {
    if (node.nodeType === Node.ELEMENT_NODE) {
      content += (node as Element).outerHTML
    } else {
      content += node.textContent || ''
    }
    node = node.nextSibling
  }

  return content.trim()
}

function extractH2Sections(doc: Document): string[] {
  const h2Elements = Array.from(doc.querySelectorAll('h2'))
  const slides: string[] = []

  h2Elements.forEach((h2, index) => {
    let content = h2.outerHTML
    let node: ChildNode | null = h2.nextSibling

    while (
      node &&
      (node.nodeName !== 'H2' ||
        !h2Elements.includes(node as HTMLHeadingElement))
    ) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        content += (node as Element).outerHTML
      } else {
        content += node.textContent || ''
      }
      node = node.nextSibling
    }

    slides.push(content.trim())
  })

  return slides
}

export function parseTextToSlides(html: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const slides = extractH2Sections(doc)

  const headingSlide = extractH1Section(doc)
  if (headingSlide) slides.unshift(headingSlide)

  return slides
}
