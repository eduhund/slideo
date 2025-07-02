import Slide from '../../../../components/Slide/Slide'

import './V8.scss'

const meta = {
  name: 'p0l0i2_v08',
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
        <div className="textContainer">
           <div className="images">
              <img
                src={content.images[0]?.src}
                alt={content.title}
                className="slideImage1"
              />
              <img
                src={content.images[1]?.src}
                alt={content.title}
                className="slideImage2"
              />
            </div>
          <h1>{content.title}</h1>
          {content.paragraphsRaw.map((p) => (<p dangerouslySetInnerHTML={{ __html: p }}/>))}

        </div>
      </div>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
