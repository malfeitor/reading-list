import { useState } from 'react'
import './index.scss'

type CardProps = {
  img: string
  addInReadingList: (id: number) => void
  removeFromReadingList: (id: number) => void
  id: number
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
      id={`book-${id}`}
      className={
        selected ? 'book-card col-sm-1 selected' : 'book-card col-sm-1 my-2'
      }
      onClick={onClick}
    >
      <img src={img} />
    </article>
  )
}
