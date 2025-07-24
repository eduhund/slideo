import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V3.scss'

const meta = {
  name: 'titlei1_v03',
  priority: 205,
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
    min: 0,
    max: 5,
    count: [
      {min: 0, max: 160},
      {min: 0, max: 160},
      {min: 0, max: 160},
      {min: 0, max: 160},
      {min: 0, max: 160},
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
          <UnwrapContent content={content} listType="ul" fromParagraph={1} />
          <div className="contentContainer">
            <h1>{content.title}</h1>
            {content.paragraphsRaw && (<p dangerouslySetInnerHTML={{ __html: content.paragraphsRaw[0] }}/>)}
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
