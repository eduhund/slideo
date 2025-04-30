function isEmptyParagraph(element: Element): boolean {
  return !element.textContent?.trim()
}

function extractH1Section(doc: Document): any | null {
  const titleElement = doc.querySelector('h1')
  let subtitleElement

  if (!titleElement) return null

  let content = ''
  let node: ChildNode | null = titleElement

  while (node && node.nodeName !== 'H2') {
    if (node.nodeType === Node.ELEMENT_NODE) {
      content += (node as Element).outerHTML
      if (node.nodeName === 'H3') {
        subtitleElement = node as HTMLHeadingElement
      }
    } else {
      content += node.textContent || ''
    }
    node = node.nextSibling
  }

  return {
    type: 'title',
    title: titleElement.textContent || '',
    subtitle: subtitleElement?.textContent || '',
    raw: content.trim(),
  }
}

function extractH2Sections(doc: Document): any[] {
  const h2Elements = Array.from(doc.querySelectorAll('h2'))
  const slides: any[] = []

  h2Elements.forEach((h2, index) => {
    let content = h2.outerHTML
    let node: ChildNode | null = h2.nextSibling

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
      if (node.nodeName === 'UL' || node.nodeName === 'OL') lists.push(Array.from(node.childNodes).map((el) => el.textContent || ''))
      if (node.nodeName === 'IMG') images.push(node)
      node = node.nextSibling
    }

    slides.push({
      title: h2.textContent || '',
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

  const slides = extractH2Sections(doc)

  const headingSlide = extractH1Section(doc)
  if (headingSlide) slides.unshift(headingSlide)

  return slides
}
