function mergeContent(content: any, fromParagraph: any, logo: any, logoPosition: any) {
  return (
    <>
      {content.lists[0]?.items.map((item, index) => (
        (logo && logoPosition == (index + ((fromParagraph <= content.paragraphsRaw?.length) ? content.paragraphsRaw?.length - fromParagraph : content.paragraphsRaw?.length)) ? (
          <li key={`li-${index}`} className="itemWithLogo"><img className="logo" src={logo} /> <span dangerouslySetInnerHTML={{ __html: item.text }} /></li>
        ) : (
          <li key={`li-${index}`} dangerouslySetInnerHTML={{ __html: item.text }}></li>
        )
      )))}
    </>
  );
}

/*
 * Unwraps content of the document starting from the given paragraph
 * Parameters:
 * content - document content
 * listType - type of the list to render, 'ol' for ordered, 'ul' for ordered. Leave empty to determine based on the original list type
 * fromParagraph - unwrap starting at the given paragraph number (zero-based)
 * logo - to add logo to one of the items
 * logoPosition - the number of the item to add logo to (zero-based)
 */
export default function UnwrapContent({content, listType, fromParagraph, logo, logoPosition}: any) {
  return <div className="unwrapContent">
    {(content.paragraphsRaw?.length > fromParagraph) && content.paragraphsRaw.slice(fromParagraph).map((item: string, index: number) => (
      (logo && logoPosition == index) ? (
        <p key={`p-${index}`} className="itemWithLogo"><img className="logo" src={logo} /> <span dangerouslySetInnerHTML={{ __html: item }} /></p>
      ) : (
        <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: item }}></p>
      )
    ))}
    {content.lists[0] && (('ul' == listType || !listType && content.lists[0].type == 'ul') ? (
      <ul>
        {mergeContent(content, fromParagraph, logo, logoPosition)}
      </ul>
    ) : (
      <ol>
        {mergeContent(content, fromParagraph, logo, logoPosition)}
      </ol>
    ))}
  </div>
}