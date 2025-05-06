import './Slide.css'

export default function Slide({
  children,
  className,
  isSelected,
  onClick,
  ...props
}: any) {
  return (
    <section
      className={`slide ` + className + (isSelected ? ' _selected' : '')}
      onClick={onClick}
      {...props}
    >
      {children}
    </section>
  )
}
