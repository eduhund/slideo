import slideTemplates, { Default } from '../../slides'

export default function SlideVariants({ slide, onSelect, ...props }: any) {
  if (!slide) {
    return (
      <div className="slidesVariants">
        <span>Please select a slide to preview it variants.</span>
      </div>
    )
  }

  const allVariants = Object.values(slideTemplates)

  const matchVariants = allVariants.filter((variant) => {
    const { title, image } = variant.meta as any
    if (slide.type === 'title') {
      if (title.level !== 1) return false
      if (title.minLength && title.minLength > slide.title.length) return false
      if (title.maxLength && title.maxLength < slide.title.length) return false
    }
    if (image && (slide.images?.length != image.count)) return false
    return true
  }).sort((v1, v2) => ((v2.meta?.priority || 0) - (v1.meta?.priority || 0)))

  if (matchVariants.length === 0) {
    if (slide.selectedTemplate !== 'default') {
      onSelect({
        type: 'UPDATE_SLIDE',
        payload: { selectedTemplate: 'default' },
      })
    }
    return (
      <div className="slidesVariants" {...props}>
        <Default.component
          content={slide}
          isSelected={Default.meta.name === slide.selectedTemplate}
        />
      </div>
    )
  }

  const selectedVariant = matchVariants.find(
    (variant) => variant.meta.name === slide.selectedTemplate
  )
  if (!selectedVariant) {
    onSelect({
      type: 'UPDATE_SLIDE',
      payload: { selectedTemplate: matchVariants[0].meta.name },
    })
  }
  return (
    <div className="slidesVariants" {...props}>
      {matchVariants.map((variant: any, i: number) => (
        <variant.component
          key={i}
          content={slide}
          isSelected={variant.meta.name === slide.selectedTemplate}
          onClick={() => {
            onSelect({
              type: 'UPDATE_SLIDE',
              payload: { selectedTemplate: variant.meta.name },
            })
          }}
        />
      ))}
    </div>
  )
}
