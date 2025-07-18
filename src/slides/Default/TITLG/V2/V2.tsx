import Slide from '../../../../components/Slide/Slide'

import './V2.scss'

const meta = {
  name: 'titlg_v02',
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

const logoPosition = 1

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
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
