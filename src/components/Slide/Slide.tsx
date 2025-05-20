import { useEffect, useRef, useState } from 'react'
import './Slide.css'

export default function Slide({
  children,
  className,
  isSelected,
  onClick,
  ...props
}: any) {
  const slideRef = useRef<HTMLElement | null>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    if (slideRef.current) {
      const isContentOverflowing =
        slideRef.current.scrollHeight > slideRef.current.clientHeight
      setIsOverflowing(isContentOverflowing)
    }
  }, [children])

  return (
    <section
      ref={slideRef}
      className={`slide ${className} ${
        isSelected ? '_selected' : ''
      } ${isOverflowing ? '_overflowing' : ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </section>
  )
}
