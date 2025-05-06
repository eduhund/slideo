import Slide from '../../components/Slide/Slide'

const meta = {
  title: {
    qt: 1,
    minLength: 10,
    maxLength: 24
  }
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide className={'t1h0p0l0i0_v1'} isSelected={isSelected} onClick={onClick}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </Slide>
  )
}

export default {
  meta, 
  component: Component
}