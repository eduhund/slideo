import './VStack.scss'

export default function VStack({
  topContent,
  bottomContent,
  className = '',
}: any) {
  return (
    <div className={`vstack ${className}`}>
      <div className="vstack-top">{topContent}</div>
      <div className="vstack-bottom">{bottomContent}</div>
    </div>
  )
}
