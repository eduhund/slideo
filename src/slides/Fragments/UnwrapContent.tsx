function mergeContent(content: any, fromParagraph: any, logo: any, logoPosition: any) {
  return (
    <>
      {content.lists[0]?.map((item: string, index: number) => (
        (logo && logoPosition == (index + ((fromParagraph <= content.paragraphsRaw?.length) ? content.paragraphsRaw?.length - fromParagraph : content.paragraphsRaw?.length)) ? (
          <li key={`li-${index}`} className="itemWithLogo"><img className="logo" src={logo} /> <span dangerouslySetInnerHTML={{ __html: item }} /></li>
        ) : (
          <li key={`li-${index}`} dangerouslySetInnerHTML={{ __html: item }}></li>
        )
      )))}
    </>
  );
}

export default function UnwrapContent({content, listType, fromParagraph, logo, logoPosition}: any) {
  return <>
    {(content.paragraphsRaw?.length > fromParagraph) && content.paragraphsRaw.slice(fromParagraph).map((item: string, index: number) => (
      (logo && logoPosition == index) ? (
        <p key={`p-${index}`} className="itemWithLogo"><img className="logo" src={logo} /> <span dangerouslySetInnerHTML={{ __html: item }} /></p>
      ) : (
        <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: item }}></p>
      )
    ))}
    {content.lists[0] && ('ul' == listType ? (
      <ul>
        {mergeContent(content, fromParagraph, logo, logoPosition)}
      </ul>
    ) : (
      <ol>
        {mergeContent(content, fromParagraph, logo, logoPosition)}
      </ol>
    ))}
  </>
}