import { motion } from 'framer-motion'
import { Ref, forwardRef } from 'react'

type BookProps = {
  img: string
  id: number
  onClick: (id: number) => void
  mouseOver: (id: number) => void
  mouseOut: (id: number) => void
}

const Book = forwardRef(function Book(
  { img, id, onClick, mouseOver, mouseOut, ...props }: BookProps,
  ref: Ref<HTMLImageElement>
) {
  const onBookClick = () => onClick(id)
  const onBookOver = () => mouseOver(id)
  const onBookOut = () => mouseOut(id)

  return (
    <motion.img
      src={img}
      className="book rounded-4"
      onClick={onBookClick}
      onMouseOver={onBookOver}
      onMouseOut={onBookOut}
      ref={ref}
      id={`book-${id}`}
      {...props}
    />
  )
})

export default Book
