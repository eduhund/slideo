function TitleV1({ content }: any) {
  return (
    <section className={`slide`}>
      <div dangerouslySetInnerHTML={{ __html: content.raw }} />
    </section>
  )
}

export default {
  templateName: 'TitleV1',
  isTitle: true,
  component: TitleV1,
}
