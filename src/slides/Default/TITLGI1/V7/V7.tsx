import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V7.scss'

const meta = {
  name: 'titlgi1_v07',
  priority: 305,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 2,
    filter: [
      {
        height: {
          max: 240,
        },
      },
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
        <img className="logo" src={content.images[0].src} />
        <div className="textContainer">
          <UnwrapContent content={content} fromParagraph={1} />
          <div className="contentContainer">
            <h1>{content.title}</h1>
            {content.paragraphsRaw && (<p dangerouslySetInnerHTML={{ __html: content.paragraphsRaw[0] }}/>)}
          </div>
        </div>
      </div>
      <img className="background" src={content.images[1].src} />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
