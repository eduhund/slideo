import Slide from '../../../components/Slide/Slide'

import './TitleV2.css'

function TitleV2({ content, isSelected, onClick }: any) {
  return (
    <Slide className={'title_2'} isSelected={isSelected} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  templateName: 'TitleV2',
  isTitle: true,
  component: TitleV2,
}
