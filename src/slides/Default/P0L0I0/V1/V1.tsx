import Slide from '../../../../components/Slide/Slide'

import './V1.css'

const meta = {
  name: 'p0l0i0_v1',
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
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
      <h1>{content.title}</h1>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
