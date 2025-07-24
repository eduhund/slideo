import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V12.scss'

const meta = {
  name: 'titlg_v12',
  priority: 304,
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
          max: 240,
        }
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
          <div className="contentContainer">
            <h1>{content.title}</h1>
            {content.paragraphsRaw && (<p dangerouslySetInnerHTML={{ __html: content.paragraphsRaw[0] }}/>)}
          </div>
          <UnwrapContent content={content} listType="ul" fromParagraph={1} />
        </div>
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
