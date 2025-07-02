import Slide from '../../../../components/Slide/Slide'

import './V2.scss'

const meta = {
  name: 'p1l0i1_v02',
  priority: 103,
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
        <div className="textContainer">
          <h1>{content.title}</h1>
          {content.paragraphsRaw.map((p) => (<p dangerouslySetInnerHTML={{ __html: p }}/>))}
          {content.lists[0] && (
            <ul>
              {content.lists[0].map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="images">
          <img
            src={content.images[0]?.src}
            alt={content.title}
            className="slideImage1"
          />
        </div>
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
