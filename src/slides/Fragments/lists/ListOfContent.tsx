function mergeContent(content: any, fromParagraph: any, logo: any, logoPosition: any) {
  return (
    <>
      {(content.paragraphsRaw?.length > fromParagraph) && content.paragraphsRaw.slice(fromParagraph).map((item: string, index: number) => (
        (logo && logoPosition == index) ? (
          <li key={`p-${index}`} className="itemWithLogo"><img className="logo" src={logo} /> <span dangerouslySetInnerHTML={{ __html: item }} /></li>
        ) : (
          <li key={`p-${index}`} dangerouslySetInnerHTML={{ __html: item }}></li>
        )
      ))}
      {content.lists[0]?.items.map((item: string, index: number) => (
        (logo && logoPosition == (index + ((fromParagraph <= content.paragraphsRaw?.length) ? content.paragraphsRaw?.length - fromParagraph : content.paragraphsRaw?.length)) ? (
          <li key={`li-${index}`} className="itemWithLogo"><img className="logo" src={logo} /> <span dangerouslySetInnerHTML={{ __html: item.text }} /></li>
        ) : (
          <li key={`li-${index}`} dangerouslySetInnerHTML={{ __html: item.text }}></li>
        )
      )))}
    </>
  );
}

export default function ListOfContent({content, listType, fromParagraph, logo, logoPosition}: any) {
  return 'ul' == listType ? (
    <ul>
      {mergeContent(content, fromParagraph, logo, logoPosition)}
    </ul>
  ) : (
    <ol>
      {mergeContent(content, fromParagraph, logo, logoPosition)}
    </ol>
  );
}