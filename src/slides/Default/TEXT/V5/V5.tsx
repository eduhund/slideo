import Slide from '../../../../components/Slide/Slide'
import Unlist from '../../../Fragments/Unlist'

import './V5.scss'

const meta = {
  name: 'text_v05',
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
    min: 2,
    max: 4,
    count: [
      {min: 0, max: 350},
      {min: 0, max: 350},
      {min: 0, max: 350},
      {min: 0, max: 350},
    ],
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
