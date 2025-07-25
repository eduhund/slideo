import Slide from '../../../../components/Slide/Slide'
import Unlist from '../../../Fragments/Unlist'

import './V6.scss'

const meta = {
  name: 'texti1_v06',
  priority: 404,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 1,
    filter: [
      {
        height: {
          min: 450,
        },
        width: {
          min: 250,
        },
        aspectRatio: {
          min: 1,
        },
      },
    ]
  },
  paragraph: {
    min: 3,
    max: 6,
    count: [
      {min: 0, max: 300},
      {min: 0, max: 300},
      {min: 0, max: 300},
      {min: 0, max: 300},
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
