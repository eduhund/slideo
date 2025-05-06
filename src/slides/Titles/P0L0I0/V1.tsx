import Slide from '../../../components/Slide/Slide'

const meta = {
  title: {
    level: 1,
    minLength: 10,
    maxLength: 24,
  },
}

export function Component({ content, isSelected, onClick }: any) {
  return (
    <Slide className={'p0l0i0_v1'} isSelected={isSelected} onClick={onClick}>
      <div>Title V1 (P0L0I0)</div>
      {
        //<div dangerouslySetInnerHTML={{ __html: content.raw }} />
      }
    </Slide>
  )
}

export default {
  meta,
  component: Component,
}
