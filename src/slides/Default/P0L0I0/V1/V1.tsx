import Slide from '../../../../components/Slide/Slide'

import './V1.css'

const meta = {
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p0l0i0_v1'}
      data-title={'Title p0l0i0_v1'}
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
