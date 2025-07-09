import Slide from '../../../../components/Slide/Slide'
import HStack from '../../../../components/Slide/components/HStack/HStack'

import './V11.scss'

const meta = {
  name: 'titlei1_v11',
  priority: 204,
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
      <HStack
        className="slideContainer"
        leftContent={(
          <>
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
          </>
        )}

        rightContent={(

            <img
              src={content.images[0]?.src}
              alt={content.title}
              className="slideImage1"
            />

        )} />
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
