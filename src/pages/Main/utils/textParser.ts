function isEmptyParagraph(element: Element): boolean {
  return !element.textContent?.trim()
}

function extractHeaderSections(doc: Document): any[] {
  const h1Element = doc.querySelector('h1')
  const h2Elements = Array.from(doc.querySelectorAll('h2'))
  const allHElements = [h1Element, ...h2Elements]
  const slides: any[] = []

  allHElements.forEach((header, index) => {
    if (!header) return

    let content = header.outerHTML
    let node: ChildNode | null = header.nextSibling

    const paragraphs = []
    const lists = []
    const images = []

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
      if (node.nodeName === 'P') {
        if (node.firstChild?.nodeName === 'IMG') {
          images.push(node.firstChild)
        } else if (!isEmptyParagraph(node as Element)) {
          paragraphs.push(node.textContent)
        }
      }
      if (node.nodeName === 'UL' || node.nodeName === 'OL')
        lists.push(
          Array.from(node.childNodes).map((el) => el.textContent || '')
        )
      if (node.nodeName === 'IMG') images.push(node)
      node = node.nextSibling
    }

    slides.push({
      type: header.nodeName === 'H1' ? 'title' : 'content',
      title: header.textContent || '',
      paragraphs,
      lists,
      images,
      raw: content.trim().replaceAll('<p><br></p>', ''),
    })
  })

  console.log(slides)

  return slides
}

export function parseTextToSlides(html: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const slides = extractHeaderSections(doc)

  return slides
}
