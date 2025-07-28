import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V1.scss'

const meta = {
  name: 'text_v01',
  priority: 404,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 0,
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
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
