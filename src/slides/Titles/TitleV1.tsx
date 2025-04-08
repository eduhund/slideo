function TitleV1({ content }: any) {
  return <div>{content.title}</div>
}

export default {
  templateName: 'TitleV1',
  isTitle: true,
  component: TitleV1,
}
