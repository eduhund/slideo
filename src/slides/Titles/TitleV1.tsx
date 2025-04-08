import Slide from '../../components/Slide/Slide'

function TitleV1({ content, isSelected, onClick }: any) {
  return (
    <Slide isSelected={isSelected} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  templateName: 'TitleV1',
  isTitle: true,
  component: TitleV1,
}
