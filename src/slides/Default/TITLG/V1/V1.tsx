import Slide from '../../../../components/Slide/Slide'
import ListOfContent from '../../../Fragments/lists/ListOfContent'

import './V1.scss'

const meta = {
  name: 'titlg_v01',
  priority: 304,
  title: {
    level: 1,
    minLength: 1,
    maxLength: 100,
  },
  image: {
    count: 1,
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
            {content.paragraphsRaw && (
              <p
                dangerouslySetInnerHTML={{ __html: content.paragraphsRaw[0] }}
              />
            )}
          </div>
        </div>
        {content.paragraphsRaw?.length > 1 && (
          <ul>
            {content.paragraphsRaw
              .slice(1)
              .map((item: string, index: number) =>
                index == logoPosition ? (
                  <li key={index} className="itemWithLogo">
                    {content.images[0] && (
                      <img className="logo" src={content.images[0].src} />
                    )}{' '}
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ) : (
                  <li
                    key={index}
                    dangerouslySetInnerHTML={{ __html: item }}
                  ></li>
                )
              )}
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
