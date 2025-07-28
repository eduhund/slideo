import Slide from '../../../../components/Slide/Slide'
import ListOfContent from '../../../Fragments/lists/ListOfContent'

import './V1.scss'

const meta = {
  name: 'titlgi1_v01',
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
        width: {
          mах: 360,
        },
        aspectRatio: {
          max: 1.5,
          min: 0.66,
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
      {min: 0, max: 120},
      {min: 0, max: 80},
      {min: 0, max: 80},
      {min: 0, max: 80},
      {min: 0, max: 80},
    ]
  },
}

const logoPosition = 0

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
