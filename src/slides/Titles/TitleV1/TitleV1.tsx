import Slide from '../../../components/Slide/Slide'

import './TitleV1.css'

function TitleV1({ content, isSelected, onClick }: any) {
  return (
    <Slide className={'title_1'} isSelected={isSelected} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  templateName: 'TitleV1',
  isTitle: true,
  component: TitleV1,
}
