import { ReactNode } from 'react'

import './Slide.css'

export default function Slide({ children }: { children: ReactNode }) {
  return <section className={`slide`}>{children}</section>
}
