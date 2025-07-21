import Slide from '../../../../components/Slide/Slide'
import ListOfContent from '../../../Fragments/lists/ListOfContent'

import './V7.scss'

const meta = {
  name: 'title_v07',
  priority: 204,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
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
            {content.paragraphsRaw && (<p dangerouslySetInnerHTML={{ __html: content.paragraphsRaw[0] }}/>)}
          </div>
          <ListOfContent content={content} listType="ul" fromParagraph={1} />
        </div>
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
