import slideTemplates, { Default } from '../../slides'

function checkLength(p, check) {
  if (check.max && p.length > check.max) return false;
  if (check.min && p.length < check.min) return false;
  return true;
}

function match(slide, variant) {
  const { title, image, paragraph } = variant.meta as any
  if (slide.type === 'title') {
    if (title.level !== 1) return false
    if (title.minLength && title.minLength > slide.title.length) return false
    if (title.maxLength && title.maxLength < slide.title.length) return false
  }
  if (paragraph) {
    const paragraphs = [...slide.paragraphs.slice(0, slide.paragraphs.findLastIndex(p => p) + 1)];
    slide.lists?.forEach(list => paragraphs.push(...list.items.map(li => li.text)));
    if (paragraph.min || paragraph.max) {
      if (paragraph.min && paragraphs.length < paragraph.min) return false;
      if (paragraph.max && paragraphs.length > paragraph.max) return false;
    }
    if (paragraph.count) {
      for (var i = 0; i < paragraph.count.length && i < paragraphs.length; i++) {
        if (!checkLength(paragraphs[i], paragraph.count[i])) return false;
      }
    }
    if (paragraph.any) {
      if (! paragraphs.find(p => checkLength(p, paragraph.any))) return false;
    }
  }

  if (image && (slide.images?.length != image.count)) return false

  if (image?.filter && slide.images) {
    for (var i = 0; i < image.filter.length && i < slide.images.length; i++) {
      if (image.filter[i].height?.max && slide.images[i].attributes.height.value > image.filter[i].height.max) return false;
      if (image.filter[i].height?.min && slide.images[i].attributes.height.value < image.filter[i].height.min) return false;
      if (image.filter[i].width?.max && slide.images[i].attributes.width.value > image.filter[i].width.max) return false;
      if (image.filter[i].width?.min && slide.images[i].attributes.width.value < image.filter[i].width.min) return false;

      const aspectRatio = 1.0 * slide.images[i].attributes.width.value / slide.images[i].attributes.height.value;
      if (image.filter[i].aspectRatio?.max && aspectRatio > image.filter[i].aspectRatio.max) return false;
      if (image.filter[i].aspectRatio?.min && aspectRatio < image.filter[i].aspectRatio.min) return false;
    }
  }
  return true
}

export default function SlideVariants({ slide, onSelect, ...props }: any) {
  if (!slide) {
    return (
      <div className="slidesVariants">
        <span>Please select a slide to preview it variants.</span>
      </div>
    )
  }

  const allVariants = Object.values(slideTemplates)

  const matchVariants = allVariants
    .filter((variant) => match(slide, variant))
    .sort((v1, v2) => ((v2.meta?.priority || 0) - (v1.meta?.priority || 0)))

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
