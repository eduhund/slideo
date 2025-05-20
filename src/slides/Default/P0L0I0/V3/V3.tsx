import Slide from '../../../../components/Slide/Slide'

const meta = {
  title: {
    level: 1,
    minLength: 10,
    maxLength: 24,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p0l0i0_v3'}
      data-title={'Title p0l0i0_v3'}
      isSelected={isSelected}
      onClick={onClick}
    >
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
