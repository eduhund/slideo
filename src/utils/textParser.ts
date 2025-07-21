function isEmptyParagraph(element: Element | null): boolean {
  if (!element) return true
  return element.firstChild?.nodeName === 'BR' || !element.textContent?.trim()
}

function svgToDataUrl(svgElement: SVGElement): string {
  const svgString = new XMLSerializer().serializeToString(svgElement)
  const encoded = encodeURIComponent(svgString)
  return `data:image/svg+xml,${encoded}`
}

function extractSlides(doc: Document): any[] {
  const slides: any[] = []
  let currentSlide: any = {
    paragraphs: [],
    paragraphsRaw: [],
    lists: [],
    images: [],
    raw: '',
  }

  const addSlide = () => {
    slides.push({ ...currentSlide })
    currentSlide = {
      paragraphs: [],
      paragraphsRaw: [],
      lists: [],
      images: [],
      raw: '',
    }
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
      } else if (element.classList.contains('ImageBlot')) {
        const img = element.querySelector('img')
        if (img) {
          currentSlide.images.push(img)
          currentSlide.raw += element.outerHTML
        }
      } else if (element.classList.contains('MermaidBlot')) {
        const svg = element.querySelector('svg') || ''
        if (svg) {
          const img = document.createElement('img')
          img.src = svgToDataUrl(svg)
          currentSlide.images.push(img)
          currentSlide.raw += img.outerHTML
        }
      } else if (element.tagName === 'P') {
        if (element.firstChild?.nodeName === 'IMG') {
          currentSlide.images.push(element.firstChild)
          currentSlide.raw += element.outerHTML
        } else if (element.querySelector('img')) {
          const images = Array.from(element.querySelectorAll('img'))
          images.forEach((img) => {
            currentSlide.images.push(img)
            currentSlide.raw += img
          })
        } else {
          currentSlide.paragraphs.push(element.textContent || '')
          currentSlide.paragraphsRaw.push(element.innerHTML || '')
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
  console.log(slides)

  return slides
}

export function parseTextToSlides(html: string): any {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const slides = extractSlides(doc)

  return slides
}
