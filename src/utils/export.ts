import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export default async function exportSlidesAsPDF(
  slides: any[],
  theme: string = 'sobakapav/light'
) {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [297 * 2, 210 * 2], // Match slide dimensions
  })

  const [themeName, themeType] = theme
    ? theme.split('/')
    : ['sobakapav', 'light']

  // Create a hidden container for rendering full-size slides
  const hiddenContainer = document.createElement('div')
  hiddenContainer.className = `${themeName} _${themeType}`
  hiddenContainer.style.position = 'absolute'
  hiddenContainer.style.top = '-9999px'
  hiddenContainer.style.left = '-9999px'
  hiddenContainer.style.width = '594px' // Full slide width
  hiddenContainer.style.height = '420px' // Full slide height
  hiddenContainer.style.overflow = 'hidden'
  document.body.appendChild(hiddenContainer)

  for (let i = 0; i < slides.length; i++) {
    const slideElement = document.querySelector(
      `.slidesPreview-item:nth-child(${i + 1}) .slide`
    )
    if (slideElement) {
      // Clone the slide element into the hidden container
      const clonedSlide = slideElement.cloneNode(true) as HTMLElement
      clonedSlide.style.transform = 'none' // Remove scaling
      clonedSlide.style.transformOrigin = 'unset'

      // Add a class to hide pseudo-elements
      clonedSlide.classList.add('no-pseudo-elements')

      hiddenContainer.appendChild(clonedSlide)

      // Render the cloned slide to a canvas
      const canvas = await html2canvas(clonedSlide, { scale: 2 })
      const imgData = canvas.toDataURL('image/png')
      if (i > 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, 0, 297 * 2, 210 * 2)

      // Remove the cloned slide after rendering
      hiddenContainer.removeChild(clonedSlide)
    }
  }

  // Clean up the hidden container
  document.body.removeChild(hiddenContainer)

  pdf.save('slides.pdf')
}
