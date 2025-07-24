import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V3.scss'

const meta = {
  name: 'title_v03',
  priority: 904,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 0,
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
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
