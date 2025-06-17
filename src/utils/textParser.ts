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
      const nextSibling = element.nextElementSibling

      if (previousSibling !== null) {
        const prevPrevSibling = previousSibling?.previousElementSibling || null
        const isEmptyPrev =
          isEmptyParagraph(previousSibling) && isEmptyParagraph(prevPrevSibling)
        isLineBreak = !isEmptyParagraph(element) && isEmptyPrev
      }

      const isHeader = element.tagName === 'H1' || element.tagName === 'H2'

      if ((isHeader || isLineBreak) && previousSibling) {
        addSlide()
      }

      if (isHeader) {
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

      if (!nextSibling) {
        addSlide()
      }
    }
  })

  return slides
}

export function parseTextToSlides(html: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const slides = extractSlides(doc)

  return slides
}
