import { motion } from 'framer-motion'
import { Ref, forwardRef } from 'react'
// import { Col } from 'react-bootstrap'

type CSSObjectType = {
  [key: string]: string
}

type BookProps = {
  img: string
  style: CSSObjectType | void
  animation: CSSObjectType | void
  onClick: () => void
  mouseOver: () => void
  mouseOut: () => void
  //   [key: string]: any
}

const Book = forwardRef(function Book(
  {
    img,
    onClick,
    mouseOver,
    mouseOut,
    ...props
  }: // setDOMRect,
  // id,
  //   booksRectCallback,
  //   setBooksRectCallback,
  BookProps,
  ref: Ref<HTMLImageElement>
) {
  //   const [rect, setRect] = useState({})
  //   const bookRect = useMemo(() => {
  //     if (bookRef.current) {
  //       return (bookRef.current as HTMLElement).getBoundingClientRect()
  //     }
  //   }, [])

  //   useEffect(() => {
  //     if (bookRef.current) {
  //   console.log(booksRectCallback)
  //   const newBooksRectCallback = [...booksRectCallback]
  //   newBooksRectCallback[id] = () => {
  //     return (bookRef.current as HTMLElement).getBoundingClientRect
  //   }
  //   setBooksRectCallback(newBooksRectCallback)
  //   setDOMRect(id, (bookRef.current as HTMLElement).getBoundingClientRect)
  //     }
  //   }, [])

  //   console.log(bookRect)
  //   const [bookRect, setBookRect] = useState({})
  //   const [DOMRect, setDOMRect] = useState<DOMRect>()

  //   if (bookRef.current) {
  //     console.log(bookRef.current.getBoundingClientRect())
  // setDOMRect(bookRef.current.getBoundingClientRect())
  //   }

  //   useEffect(() => {
  // console.log(DOMRect)
  //     console.log(bookRef.current.getBoundingClientRect())
  //     console.log(DOMRect)
  //   }, DOMRect)
  //   useEffect(() => {
  // if (bookRect) {
  // setDOMRect(id, bookRect)
  //   setBookRect((bookRef.current as HTMLElement).getBoundingClientRect())
  //   setDOMRect(id, (bookRef.current as HTMLElement).getBoundingClientRect())
  //   rect = (bookRef.current as HTMLElement).getBoundingClientRect()
  // }
  //   })
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
