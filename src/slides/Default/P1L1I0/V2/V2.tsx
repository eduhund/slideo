import Slide from '../../../../components/Slide/Slide'
import List from '../../../Fragments/lists/List'

import './V2.css'

const meta = {
  name: 'p1l1i0_v2',
  title: {
    level: 1,
    minLength: 1,
    maxLength: 10,
  },
  paragraph: {
    count: 1,
  },
  list: {
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
      <h1>{content.title}</h1>
      <p>{content.paragraphs[0]}</p>
      <List content={content} />

    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
