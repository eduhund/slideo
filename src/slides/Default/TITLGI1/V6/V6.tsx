import Slide from '../../../../components/Slide/Slide'

import './V6.scss'

const meta = {
  name: 'titlgi1_v06',
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
          {content.paragraphsRaw?.length > 1 && (
            <ul>
              {content.paragraphsRaw.slice(1).map((item: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
              ))}
            </ul>
          )}
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
