import { useState } from 'react'
import './index.scss'

type CardProps = {
  img: string
  addInReadingList: (id: string) => void
  removeFromReadingList: (id: string) => void
  id: string
}

export default function Card({
  img,
  addInReadingList,
  removeFromReadingList,
  id,
}: CardProps) {
  const [selected, setSelected] = useState(false)

  function onClick() {
    if (selected) {
      removeFromReadingList(id)
    } else {
      addInReadingList(id)
    }
    setSelected(!selected)
  }

  return (
    <article
      className={selected ? 'book-card selected' : 'book-card'}
      onClick={onClick}
    >
      <img src={img} />
    </article>
  )
}
