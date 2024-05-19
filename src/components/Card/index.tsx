import { useState } from 'react'
import { motion } from 'framer-motion'
import './index.scss'

type CardProps = {
  img: string
  addInReadingList: (id: number) => void
  removeFromReadingList: (id: number) => void
  id: number
  style: {
    [key: string]: string
  }
  anim: {
    [key: string]: string
  }
}

export default function Card({
  img,
  addInReadingList,
  removeFromReadingList,
  id,
  style,
  anim,
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
    <motion.article
      id={`book-${id}`}
      className={
        selected ? 'book-card col-sm-1 selected' : 'book-card col-sm-1 my-2'
      }
      onClick={onClick}
      style={style}
      animate={anim}
    >
      <motion.img src={img} />
    </motion.article>
  )
}
