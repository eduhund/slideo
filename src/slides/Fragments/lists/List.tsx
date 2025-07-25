export default function List({content, listType = 'ul', index = 0}) {
  return (content.lists[index] && ( listType == 'ol' ? (
    <ol>
      {content.lists[index].items.map((item, idx) => (
        <li key={idx}>{item.text}</li>
      ))}
    </ol>
  ) : (
    <ul>
      {content.lists[index].items.map((item, idx) => (
        <li key={idx}>{item.text}</li>
      ))}
    </ul>
  )));
}