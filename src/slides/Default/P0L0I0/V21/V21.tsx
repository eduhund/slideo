import Slide from '../../../../components/Slide/Slide'

import './V21.scss'

const meta = {
  name: 'p0l0i0_v21',
  title: {
    level: 1,
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
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
