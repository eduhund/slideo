import Slide from '../../../../components/Slide/Slide'

import './V1.css'

const meta = {
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
  image: {
    count: 1,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p0l0i1_v1'}
      data-title={'Title p0l0i1_v1'}
      isSelected={isSelected}
      onClick={onClick}
    >
      <h1>{content.title}</h1>
      <img src={content.images[0]} alt="Slide visual" />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
