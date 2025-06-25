import Slide from '../../../../components/Slide/Slide'

const meta = {
  name: 'p0l0i0_v10',
  title: {
    level: 1,
    minLength: 10,
    maxLength: 24,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide ' + meta.name}
      data-title={meta.name}
      isSelected={isSelected}
      onClick={onClick}
    >
      <div class="slideContainer">
        <div class="textContainer" dangerouslySetInnerHTML={{ __html: content.raw }} />
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
