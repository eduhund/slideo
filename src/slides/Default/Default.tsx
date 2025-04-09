import Slide from '../../components/Slide/Slide'

function Default({ content, isSelected, onClick }: any) {
  return (
    <Slide className={'default'} isSelected={isSelected} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  templateName: 'Default',
  component: Default,
}
