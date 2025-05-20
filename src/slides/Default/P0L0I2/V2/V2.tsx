import Slide from '../../../../components/Slide/Slide'

import './V2.css'

const meta = {
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
  image: {
    count: 2,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p0l0i2_v2'}
      data-title={'Title p0l0i2_v2'}
      isSelected={isSelected}
      onClick={onClick}
    >
      <h1>{content.title}</h1>
      <div className="images">
        <img src={content.images[0]} alt="Slide visual 1" />
        <img src={content.images[1]} alt="Slide visual 2" />
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
