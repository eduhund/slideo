import { ReactNode, useState } from 'react'

import './Slide.css'

export default function Slide({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState(false)
  return (
    <section
      className={`slide` + (selected ? ' _selected' : '')}
      onClick={() => setSelected(!selected)}
    >
      {children}
    </section>
  )
}
