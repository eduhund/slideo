import Slide from '../../../../components/Slide/Slide'

import './V3.css'

const meta = {
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
  list: {
    count: 1,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide
      className={'slide titleSlide p0l1i0_v3'}
      data-title={'Title p0l1i0_v3'}
      isSelected={isSelected}
      onClick={onClick}
    >
      <h1>{content.title}</h1>
      <ul>
        {content.lists[0].map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
