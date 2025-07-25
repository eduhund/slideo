/*
 * Unwraps content of the document starting from the given paragraph
 * Parameters:
 * content - document content
 * fromParagraph - unwrap starting at the given paragraph number (zero-based)
 */
export default function Unlist({content, fromParagraph, fromImage = 0}: any) {
  return <div className="unlist">
    {(content.paragraphsRaw?.length > fromParagraph) && content.paragraphsRaw.slice(fromParagraph).map((item: string, index: number) => (
      <p key={`p-${index}`} dangerouslySetInnerHTML={{ __html: item }}></p>
    ))}
    {content.lists[0] && content.lists[0].items.map((li, index) => (
      <p key={`pli-${index}`} className={`as-list-item as-list-type-${content.lists[0].type}`} dangerouslySetInnerHTML={{ __html: li.text }}></p>
    ))}
    {(content.images?.length > fromImage) && content.images.slice(fromImage).map((item, index: number) => (
      <p><img src={item.src} /></p>
    ))}
  </div>
}