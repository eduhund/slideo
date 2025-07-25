import Slide from '../../../../components/Slide/Slide'
import UnwrapContent from '../../../Fragments/UnwrapContent'

import './V3.scss'

const meta = {
  name: 'p1l0i1_v3',
  priority: 102,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 1,
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
          {content.paragraphsRaw.map((p) => (<p dangerouslySetInnerHTML={{ __html: p }}/>))}
          <UnwrapContent content={content} fromParagraph={1} />

          <div className="images">
            <img
              src={content.images[0]?.src}
              alt={content.title}
              className="slideImage1"
            />
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
