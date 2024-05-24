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

  function bookClick(bookIndex: number) {
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

  function bookOver(bookId: number) {
    if (readingBooks.includes(bookId)) {
      bookOverAnimation(bookId)
    }
  }

  function bookOut(bookIndex: number) {
    if (readingBooks.includes(bookIndex)) {
      updateReadingListBooks()
    }
  }

  useEffect(() => {
    if (booksDOMRect.length > 0) {
      let delay = 0.0
      const pendingAnimations = []
      // animate Bookshelfs's books
      pendingAnimations.push(
        bookshelfBooks.map((id) => {
          if (id !== lastBookMoved) {
            const translate = getTranslate(id)
            if (translate.x !== 0 || translate.y !== 0) {
              delay += 0.05
              return animate(
                booksRef.current[id],
                {
                  x: [translate.x, 0],
                  y: [translate.y, 0],
                },
                { delay: delay }
              )
            }
          }
        })
      )
      delay += 0.1
      // animate the clicked book
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
      // animate Reading list books
      pendingAnimations.push(updateReadingListBooks())
    }
  }, [booksDOMRect])

  function updateReadingListBooks(duration = 1) {
    return readingBooks.map((id, index) => {
      return animate(booksRef.current[id], getReadingListBookAnimation(index), {
        duration: duration,
      })
    })
  }

  function bookOverAnimation(bookId: number) {
    const bookIndex = readingBooks.indexOf(bookId)
    readingBooks.forEach((id, index) => {
      if (index < bookIndex) {
        const currentBook = booksRef.current[id]
        animate(
          currentBook,
          {
            y:
              getReadingListBookAnimation(index).y +
              currentBook.height -
              7.5 * index,
          },
          { duration: 0.5 }
        )
      }
    })
  }

  function getReadingListBookAnimation(index: number) {
    const reversedIndex = bookList.length - index
    const ratio = (reversedIndex * 2) / bookList.length
    const remainingBooks = readingBooks.length - (index + 1)
    const heigthDiff = 7.5 * readingBooks.length
    return {
      zIndex: reversedIndex,
      scale: 1 + 0.05 * reversedIndex,
      y: 250 - heigthDiff + 20 * ratio * remainingBooks,
    }
  }

  function getTranslate(id: number) {
    return {
      x: booksDOMRect[id].x - booksRef.current[id].getBoundingClientRect().x,
      y: booksDOMRect[id].y - booksRef.current[id].getBoundingClientRect().y,
    }
  }

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
