import Slide from '../../../../components/Slide/Slide'
import Unlist from '../../../Fragments/Unlist'

import './V4.scss'

const meta = {
  name: 'text_v04',
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
    min: 3,
    max: 3,
    any: [
      {min: 100},
    ]
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
          <h1>{content.title}</h1>
          <div className="contentContainer">
            <Unlist content={content} fromParagraph={0} />
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
