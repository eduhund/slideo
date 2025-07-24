import Slide from '../../../../components/Slide/Slide'
import HStack from '../../../../components/Slide/components/HStack/HStack'
import ListOfContent from '../../../Fragments/lists/ListOfContent'

import './V11.scss'

const meta = {
  name: 'titlei1_v11',
  priority: 204,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  paragraph: {
    min: 1,
    max: 3,
    count: [
      {max: 100},
      {min: 100, max: 300},
    ]
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
             <ListOfContent content={content} listType="ul" fromParagraph={1} />
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
