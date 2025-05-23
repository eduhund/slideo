import Slide from '../../../../components/Slide/Slide'

import './V1.css'

const meta = {
  name: 'p0l0i3_v1',
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
  image: {
    count: 3,
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
      <div className="images">
        <img src={content.images[0]} alt="Slide visual 1" />
        <img src={content.images[1]} alt="Slide visual 2" />
        <img src={content.images[2]} alt="Slide visual 3" />
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
