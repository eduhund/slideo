import Slide from '../../../components/Slide/Slide'

import './PlanV1.css'

function PlanV1({ content, isSelected, onClick }: any) {
  return (
    <Slide className={'title_1'} isSelected={isSelected} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  templateName: 'PlanV1',
  paragraphs: {
    qty: 1,
    minItems: 1,
    maxItems: 10000,
    minItemLength: 1,
    maxItemLength: 100000,
    minTotalLength: 1,
    maxTotalLength: 10000,
  },
  lists: {
    qty: 1,
    minItems: 1,
    maxItems: 10000,
    minItemLength: 1,
    maxItemLength: 100000,
    minTotalLength: 1,
    maxTotalLength: 10000,
  },
  component: PlanV1,
}
