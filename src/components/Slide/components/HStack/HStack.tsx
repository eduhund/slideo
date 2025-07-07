import './HStack.scss'

export default function HStack({
  leftContent,
  rightContent,
  className = '',
}: any) {
  return (
    <div className={`hstack ${className}`}>
      <div className="hstack-left">{leftContent}</div>
      <div className="hstack-right">{rightContent}</div>
    </div>
  )
}
