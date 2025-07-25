import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V11.scss'

const meta = {
  name: 'texti1_v11',
  priority: 404,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 1,
  },
  paragraph: {
    min: 1,
    max: 4,
    any: {min: 100},
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
      <div className="slideContainer">
        <div className="textContainer">

          <div className="contentContainer">
            <h1>{content.title}</h1>
            <UnwrapContent content={content} fromParagraph={0} />
          </div>

        </div>
      </div>
      <img
              src={content.images[0]?.src}
              alt={content.title}
              className="slideImage1"
            />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
