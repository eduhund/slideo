import Slide from '../../../../components/Slide/Slide'
import ListOfContent from '../../../Fragments/lists/ListOfContent'

import './V7.scss'

const meta = {
  name: 'titlg_v07',
  priority: 304,
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
        <img className="logo" src={content.images[0].src} />
        <div className="textContainer">
          <ListOfContent content={content} listType="ul" fromParagraph={1} />
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
