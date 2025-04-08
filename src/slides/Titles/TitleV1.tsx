function TitleV1({ content }: any) {
  return <section className={`slide`}>{content.title}</section>
}

export default {
  templateName: 'TitleV1',
  isTitle: true,
  component: TitleV1,
}
