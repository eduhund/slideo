import './Slide.css'

export default function Slide({ children, isSelected, onClick }: any) {
  return (
    <section
      className={`slide` + (isSelected ? ' _selected' : '')}
      onClick={onClick}
    >
      {children}
    </section>
  )
}
