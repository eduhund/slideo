function isEmptyParagraph(element: Element | null): boolean {
  if (!element) return true
  return element.firstChild?.nodeName === 'BR' || !element.textContent?.trim()
}

function extractSlides(doc: Document): any[] {
  const slides: any[] = []
  let currentSlide: any = { paragraphs: [], lists: [], images: [], raw: '' }

  const addSlide = () => {
    slides.push({ ...currentSlide })
    currentSlide = { paragraphs: [], lists: [], images: [], raw: '' }
  }

  doc.body.childNodes.forEach((node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement
      let isLineBreak = false

      const previousSibling = element.previousElementSibling

      if (previousSibling !== null) {
        const prevPrevSibling = previousSibling?.previousElementSibling || null
        const isEmptyPrev =
          isEmptyParagraph(previousSibling) && isEmptyParagraph(prevPrevSibling)
        isLineBreak = !isEmptyParagraph(element) && isEmptyPrev
      }

      const isHeader = element.tagName === 'H1' || element.tagName === 'H2'

      if (isHeader || isLineBreak) {
        addSlide()
        currentSlide = {
          ...currentSlide,
          type: isHeader
            ? element.tagName === 'H1'
              ? 'title'
              : 'content'
            : 'content',
          title: isHeader ? element.textContent || '' : '',
          raw: element.outerHTML,
        }
      } else if (element.tagName === 'P') {
        if (element.firstChild?.nodeName === 'IMG') {
          currentSlide.images.push(element.firstChild)
          currentSlide.raw += element.outerHTML
        } else {
          currentSlide.paragraphs.push(element.textContent || '')
          currentSlide.raw += element.outerHTML
        }
      } else if (element.tagName === 'UL' || element.tagName === 'OL') {
        currentSlide.lists.push(
          Array.from(element.childNodes).map((el) => el.textContent || '')
        )
        currentSlide.raw += element.outerHTML
      } else if (element.firstChild?.nodeName === 'IMG') {
        currentSlide.images.push(element)
        currentSlide.raw += element.outerHTML
      } else {
        currentSlide.raw += element.outerHTML
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      // Handle text nodes
      const text = node.textContent || ''
      if (text.trim()) {
        currentSlide.raw += text
      }
    }
  })

  // Add the last slide if it exists
  addSlide()

  return slides
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
    let slideIndex = 0

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

    slideIndex++

    slides.push({
      type: header.nodeName === 'H1' ? 'title' : 'content',
      index: slideIndex,
      title: header.textContent || '',
      paragraphs,
      lists,
      images,
      raw: content.trim().replaceAll('<p><br></p>', ''),
    })
  })

  return slides
}

export function parseTextToSlides(html: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const slides = extractSlides(doc)

  return slides
}
