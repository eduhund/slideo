import Slide from '../../../../components/Slide/Slide'

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
          {content.paragraphsRaw?.length > 1 && (
            <ul>
              {content.paragraphsRaw.slice(1).map((item: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
              ))}
            </ul>
          )}

        </div>
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
