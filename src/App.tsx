import { useEffect, useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import Book from './component/Book'
import Bookshelf from './component/Bookshelf'
import ReadingList from './component/ReadingList'
import { Container } from 'react-bootstrap'

const bookList = library.map((item) => item.book.cover)

type AnimationObject = {
  [key: string]: {
    [key: string]: number | number[] | string | string[]
  }
}

export default function App() {
  const [animList, setAnimList] = useState<AnimationObject[]>(
    bookList.map(() => ({
      transition: { ease: 'easeInOut', duration: 1 },
    }))
  )
  const [lastBookMoved, setLastBookMoved] = useState(-1)

  const [booksDOMRect, setBooksDOMRect] = useState<DOMRect[]>([])

  const booksRef: React.MutableRefObject<HTMLImageElement[]> = useRef([])
  let animationRunning = false

  const booksAvailable = bookList.map((item, index) => (
    <Book
      img={item}
      animation={animList[index]}
      key={index}
      onClick={() => bookClick(index)}
      mouseOut={() => bookOut(index)}
      mouseOver={() => bookOver(index)}
      ref={(e) => (booksRef.current[index] = e as HTMLImageElement)}
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
      newReadingBooks.push(bookIndex)
      newBookshelf.splice(newBookshelf.indexOf(bookIndex), 1)
    } else {
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
      readingBooks.map((item) => {
        newAnimation[item] = {
          ...newAnimation[item],
          animate: {},
        }
      })
      bookshelfBooks.map((item, index) => {
        newAnimation[item] = {
          ...newAnimation[item],
          animate: {
            x: [
              booksDOMRect[item].x -
                booksRef.current[item].getBoundingClientRect().x,
              0,
            ],
            y: [
              booksDOMRect[item].y -
                booksRef.current[item].getBoundingClientRect().y,
              0,
            ],
          },
        }
      })
      newAnimation[lastBookMoved] = {
        ...newAnimation[lastBookMoved],
        animate: {
          x: [
            booksDOMRect[lastBookMoved].x -
              booksRef.current[lastBookMoved].getBoundingClientRect().x,
            0,
          ],
          y: [
            booksDOMRect[lastBookMoved].y -
              booksRef.current[lastBookMoved].getBoundingClientRect().y,
            0,
          ],
        },
      }
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
      // debugger
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
