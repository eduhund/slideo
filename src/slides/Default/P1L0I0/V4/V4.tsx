import Slide from '../../../../components/Slide/Slide'

import './V4.css'

const meta = {
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
  paragraph: {
    count: 1,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p1l0i0_v4'}
      data-title={'Title p1l0i0_v4'}
      isSelected={isSelected}
      onClick={onClick}
    >
      <h1>{content.title}</h1>
      <p>{content.paragraphs[0]}</p>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
