import { motion } from 'framer-motion'
import { Ref, forwardRef } from 'react'

type BookProps = {
  img: string
  onClick: () => void
  mouseOver: () => void
  mouseOut: () => void
}

const Book = forwardRef(function Book(
  { img, onClick, mouseOver, mouseOut, ...props }: BookProps,
  ref: Ref<HTMLImageElement>
) {
  return (
    <motion.img
      src={img}
      className="book rounded-4"
      onClick={onClick}
      onMouseOver={mouseOver}
      onMouseOut={mouseOut}
      ref={ref}
      transition={{ ease: 'easeInOut', duration: 1 }}
      {...props}
    />
  )
})

export default Book
