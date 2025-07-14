import Slide from '../../../../components/Slide/Slide'
import ListOfContent from '../../../Fragments/lists/ListOfContent'

import './V3.scss'

const meta = {
  name: 'titlgi1_v03',
  priority: 305,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 2,
  },
}

const logoPosition = 2

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
            {content.paragraphsRaw && (<p dangerouslySetInnerHTML={{ __html: content.paragraphsRaw[0] }}/>)}
          </div>
        </div>
        <ListOfContent content={content} listType="ul" fromParagraph={1} logo={content.images[0].src} logoPosition={logoPosition} />
      </div>
      <img className="background" src={content.images[1].src} />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
