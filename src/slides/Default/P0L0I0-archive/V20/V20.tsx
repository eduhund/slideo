import Slide from '../../../../components/Slide/Slide'

import './V20.scss'

const meta = {
  name: 'p0l0i0_v20',
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
      <div>
        <div>
          <h1>{content.title}</h1>
          <h3>{content.subtitle}</h3>
        </div>
        <img
          src={content.images[0]}
          alt={content.title}
          className="slideImage"
        />
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
