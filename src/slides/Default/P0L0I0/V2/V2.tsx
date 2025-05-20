import Slide from '../../../../components/Slide/Slide'

import './V2.css'

const meta = {
  title: {
    level: 1,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p0l0i0_v2'}
      data-title={'Title p0l0i0_v2'}
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
