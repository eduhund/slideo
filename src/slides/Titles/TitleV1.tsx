import Slide from '../../components/Slide/Slide'

function TitleV1({ content }: any) {
  return (
    <Slide>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  templateName: 'TitleV1',
  isTitle: true,
  component: TitleV1,
}
