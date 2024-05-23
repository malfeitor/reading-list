import { useEffect, useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import Book from './component/Book'
import Bookshelf from './component/Bookshelf'
import ReadingList from './component/ReadingList'
import { Container } from 'react-bootstrap'
import { useAnimate } from 'framer-motion'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [scope, animate] = useAnimate()
  const [lastBookMoved, setLastBookMoved] = useState(-1)
  const [booksDOMRect, setBooksDOMRect] = useState<DOMRect[]>([])
  const [bookshelfBooks, setBookshelfBooks] = useState<number[]>([
    ...bookList.keys(),
  ])
  const [readingBooks, setReadingBooks] = useState<number[]>([])

  const booksRef: React.MutableRefObject<HTMLImageElement[]> = useRef([])
  let animationRunning = false

  function getTranslate(id: number) {
    return {
      x: booksDOMRect[id].x - booksRef.current[id].getBoundingClientRect().x,
      y: booksDOMRect[id].y - booksRef.current[id].getBoundingClientRect().y,
    }
  }

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
    // save State
    setBookshelfBooks(newBookshelf)
    setReadingBooks(newReadingBooks)
    setLastBookMoved(bookIndex)
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
      let delay = 0.0
      const pendingAnimations = []
      bookshelfBooks.map((id) => {
        if (id !== lastBookMoved) {
          const translate = getTranslate(id)
          if (translate.x !== 0 || translate.y !== 0) {
            delay += 0.1

            pendingAnimations.push(
              animate(
                booksRef.current[id],
                {
                  x: [translate.x, 0],
                  y: [translate.y, 0],
                },
                { delay: delay }
              )
            )
          }
        }
      })
      delay += 0.1
      pendingAnimations.push(
        animate(
          booksRef.current[lastBookMoved],
          {
            x: [getTranslate(lastBookMoved).x, 0],
            y: [getTranslate(lastBookMoved).y, 0],
          }
          // { delay: delay }
        )
      )

      Promise.allSettled(pendingAnimations).then(() => {
        animationRunning = false
      })
    }
  }, [booksDOMRect])

  return (
    <Container fluid className="d-flex" ref={scope}>
      <Bookshelf collapsed={readingBooks.length > 0}>
        {bookshelfBooks.map((index) => (
          <Book
            img={bookList[index]}
            key={index}
            id={index}
            onClick={bookClick}
            mouseOut={bookOut}
            mouseOver={bookOver}
            ref={(e) => (booksRef.current[index] = e as HTMLImageElement)}
          />
        ))}
      </Bookshelf>
      <ReadingList>
        {readingBooks.map((index) => (
          <Book
            img={bookList[index]}
            key={index}
            id={index}
            onClick={bookClick}
            mouseOut={bookOut}
            mouseOver={bookOver}
            ref={(e) => (booksRef.current[index] = e as HTMLImageElement)}
          />
        ))}
      </ReadingList>
    </Container>
  )
}
