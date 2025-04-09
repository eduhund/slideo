import './Slide.css'

export default function Slide({
  children,
  className,
  isSelected,
  onClick,
}: any) {
  return (
    <section
      className={`slide ` + className + (isSelected ? ' _selected' : '')}
      onClick={onClick}
    >
      {children}
    </section>
  )
}
