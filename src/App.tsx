import { useEffect, useMemo, useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
// import { animate } from 'framer-motion'
// import { moveBooks, updateReadingListBooksSize } from './utils/animations'
import Book from './component/Book'
import Bookshelf from './component/Bookshelf'
import ReadingList from './component/ReadingList'
import { Container } from 'react-bootstrap'
import { AnimatePresence } from 'framer-motion'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  // const [styleList, setStyleList] = useState(bookList.map(() => {}))
  const [animList, setAnimList] = useState(bookList.map(() => {}))
  const [lastBookMoved, setLastBookMoved] = useState(-1)

  const [booksDOMRect, setBooksDOMRect] = useState<DOMRect[]>([])

  const booksRef: React.MutableRefObject<HTMLImageElement[]> = useRef([])
  let animationRunning = false
  // const setDOMRect = (id: number, rect: DOMRect) => {
  // console.log('domrect index ' + id)
  // console.log(rect)
  // getBooksDOMRect[id] = rect
  // setBooksDOMRect(newBooksBOMRect)
  // }

  // const [booksRectCallback, setBooksRectCallback] = useState([])

  const booksAvailable = bookList.map((item, index) => (
    <Book
      img={item}
      // style={styleList[index]}
      animation={animList[index]}
      key={index}
      onClick={() => bookClick(index)}
      mouseOut={() => bookOut(index)}
      mouseOver={() => bookOver(index)}
      ref={(e) => (booksRef.current[index] = e as HTMLImageElement)}
      // booksRectCallback={booksRectCallback}
      // setBooksRectCallback={setBooksRectCallback}
      {...animList[index]}
    />
  ))

  const [bookshelfBooks, setBookshelfBooks] = useState<number[]>(
    booksAvailable.map((item, index) => index)
  )
  const [readingBooks, setReadingBooks] = useState<number[]>([])

  function bookClick(bookIndex: number) {
    // dont do anything when animation running
    if (animationRunning) return
    // snapshot DOMRects
    setBooksDOMRect(
      booksRef.current.map((book) => book.getBoundingClientRect())
    )
    // reorganize books
    const newReadingBooks = [...readingBooks]
    const newBookshelf = [...bookshelfBooks]
    if (bookshelfBooks.includes(bookIndex)) {
      console.log('Bookshelf contains ' + bookIndex)
      newReadingBooks.push(bookIndex)
      newBookshelf.splice(newBookshelf.indexOf(bookIndex), 1)
    } else {
      console.log('Reading list contains ' + bookIndex)
      newBookshelf.push(bookIndex)
      newReadingBooks.splice(newReadingBooks.indexOf(bookIndex), 1)
    }
    setBookshelfBooks(newBookshelf)
    setReadingBooks(newReadingBooks)

    // // styling books
    // const newStyle = [...styleList]
    // bookshelfBooks.map((index) => (styleList[index] = { zIndex: 0 }))

    setLastBookMoved(bookIndex)
    //   const book = booksRef.current[index]
    //   const newStyle = [...styleList]
    //     newStyle[index] = , margin: 0 }
    //     setLastAction(-1)
    //   } else {
    //     book.classList.add('selected')
    //     notChoosenDiv.current!.removeChild(book)
    //     choosenDiv.current!.append(book)
    //     setLastAction(index)
    //   }

    //   const newChoosen = [...choosen]
    //   newChoosen[index] = !newChoosen[index]
    //   setChoosen(newChoosen)
  }

  function bookOver(bookIndex: number) {
    if (readingBooks.includes(bookIndex)) {
      console.log('Over ' + bookIndex)
    }
    // choosenDiv.current!.childNodes.forEach((book, index) => {
    //     if (index < bookOverIndex) {
    //       animate(
    //         book as HTMLElement,
    //         {
    //           y:
    //             choosenBooksRect[index].y +
    //             choosenBooksRect[index].height / 2 +
    //             30,
    //         },
    //         { duration: 1 }
    //       )
    //     }
    //   })
  }

  function bookOut(bookIndex: number) {
    if (readingBooks.includes(bookIndex)) {
      console.log('Out')
    }
    //   choosenDiv.current!.childNodes.forEach((book, index) => {
    //     animate(
    //       book as HTMLElement,
    //       { y: choosenBooksRect[index].y + choosenBooksRect[index].height / 3 },
    //       { duration: 1 }
    //     )
    //   })
  }

  useEffect(() => {
    if (booksDOMRect.length > 0) {
      animationRunning = true
      const newAnimation = [...animList]
      booksAvailable.map((item, index) => {
        newAnimation[index] = {
          animate: {
            x: [
              booksDOMRect[index].x -
                booksRef.current[index].getBoundingClientRect().x,
              0,
            ],
            y: [
              booksDOMRect[index].y -
                booksRef.current[index].getBoundingClientRect().y,
              0,
            ],
          },
        }
      })

      // bookshelfBooks.map((index) => {
      //   const translate = {
      //     x:
      //       booksDOMRect[index].x -
      //       booksRef.current[index].getBoundingClientRect().x,
      //     y:
      //       booksDOMRect[index].y -
      //       booksRef.current[index].getBoundingClientRect().y,
      //   }
      //   // // first we set it at his old place
      //   // animate(elem, { x: translate.x, y: translate.y }, { duration: 0 })
      //   // // then we move it
      //   // animate(elem, { x: 0, y: 0, scale: 1 }, { duration: 1 })
      //   animList[index] = { x: [translate.x, 0], y: [translate.y, 0], scale: 1 }
      //   console.log(animList[index])
      // })
      // animList[lastBookMoved] = {
      //   x: [
      //     booksDOMRect[lastBookMoved].x -
      //       booksRef.current[lastBookMoved].getBoundingClientRect().x,
      //     0,
      //   ],
      //   y: [
      //     booksDOMRect[lastBookMoved].y -
      //       booksRef.current[lastBookMoved].getBoundingClientRect().y,
      //     0,
      //   ],
      //   scale: 1,
      // }
      // booksRef.current.forEach((book, index) => {
      //   if (!choosen[index] || index === justAddedBook) {
      //     moveBooks({
      //       elem: book,
      //       oldRect: rectList[index],
      //       newRect: book.getBoundingClientRect(),
      //     })
      //   }
      // })
      // const updatingStatus = updateReadingListBooksSize(
      //   choosenDiv.current!.childNodes,
      //   bookList.length
      // )
      // updatingStatus.forEach(
      //   async (status, index) =>
      //     await status.finished.then(() => {
      //       if (index === updatingStatus.length - 1) {
      //         choosenDiv.current!.childNodes.forEach((book, index) => {
      //           choosenBooksRect[index] = (
      //             book as HTMLElement
      //           ).getBoundingClientRect()
      //           book.addEventListener(
      //             'mouseover',
      //             (book.bookOver = () => hoverBook(index))
      //           )
      //           book.addEventListener(
      //             'mouseout',
      //             (book.bookOut = () => blurBook())
      //           )
      //         })
      //       }
      //       animationRunning = false
      //     })
      // )
      // if (updatingStatus.length === 0) animationRunning = false
      setAnimList(newAnimation)
      animationRunning = false
    }
  }, [booksDOMRect])

  return (
    <Container fluid className="d-flex">
      <Bookshelf collapsed={readingBooks.length > 0}>
        {bookshelfBooks.map((index) => booksAvailable[index])}
      </Bookshelf>
      <ReadingList>
        {readingBooks.map((index) => booksAvailable[index])}
      </ReadingList>
    </Container>
  )
}
