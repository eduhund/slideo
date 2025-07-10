import Slide from '../../../../components/Slide/Slide'

import './V4.scss'

const meta = {
  name: 'titlgi1_v04',
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

const logoPosition = 3

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
        {content.paragraphsRaw?.length > 1 && (
          <ul>
            {content.paragraphsRaw.slice(1).map((item: string, index: number) => index == logoPosition ? (
              <li key={index} className="itemWithLogo"><img className="logo" src={content.images[0].src} /> <span dangerouslySetInnerHTML={{ __html: item }} /></li>
            ) : (
              <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
            ))}
          </ul>
        )}
      </div>
      <img className="background" src={content.images[1].src} />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
