import { useEffect, useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import { moveBooks, updateReadingListBooksSize } from './utils/animations'
import { animate } from 'motion'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [choosen, setChoosen] = useState([...bookList.map(() => false)])
  const [styleList, setStyleList] = useState([...bookList.map(() => {})])
  const [justAddedBook, setLastAction] = useState(-1)

  const [rectList, setRectList] = useState<DOMRect[]>([])

  const bookRefs = useRef<HTMLImageElement[]>([])
  const notChoosenDiv = useRef<HTMLDivElement>(null)
  const choosenDiv = useRef<HTMLDivElement>(null)

  const choosenBooksRect: DOMRect[] = []
  let animationRunning = false

  function hoverBook(bookOverIndex: number) {
    choosenDiv.current!.childNodes.forEach((book, index) => {
      if (index < bookOverIndex) {
        animate(
          book as HTMLElement,
          {
            y:
              choosenBooksRect[index].y +
              choosenBooksRect[index].height / 2 +
              30,
          },
          { duration: 1 }
        )
      }
    })
  }

  function blurBook() {
    choosenDiv.current!.childNodes.forEach((book, index) => {
      animate(
        book as HTMLElement,
        { y: choosenBooksRect[index].y + choosenBooksRect[index].height / 3 },
        { duration: 1 }
      )
    })
  }

  function toggleBook(index: number) {
    if (animationRunning) return
    // snapshot books positions for animation
    setRectList(bookRefs.current.map((book) => book.getBoundingClientRect()))

    const book = bookRefs.current[index]
    const newStyle = [...styleList]
    if (choosen[index]) {
      book.classList.remove('selected')
      choosenDiv.current!.removeChild(book)
      notChoosenDiv.current!.append(book)
      newStyle[index] = { zIndex: 0, margin: 0 }
      setLastAction(-1)
    } else {
      book.classList.add('selected')
      notChoosenDiv.current!.removeChild(book)
      choosenDiv.current!.append(book)
      setLastAction(index)
    }

    const newChoosen = [...choosen]
    newChoosen[index] = !newChoosen[index]
    setChoosen(newChoosen)
    setStyleList(newStyle)
  }

  useEffect(() => {
    if (rectList.length > 0) {
      animationRunning = true
      bookRefs.current.forEach((book, index) => {
        book.removeEventListener('mouseover', book.bookOver)
        book.removeEventListener('mouseout', book.bookOut)
        if (!choosen[index] || index === justAddedBook) {
          moveBooks({
            elem: book,
            oldRect: rectList[index],
            newRect: book.getBoundingClientRect(),
          })
        }
      })
      const updatingStatus = updateReadingListBooksSize(
        choosenDiv.current!.childNodes,
        bookList.length
      )
      updatingStatus.forEach(
        async (status, index) =>
          await status.finished.then(() => {
            if (index === updatingStatus.length - 1) {
              choosenDiv.current!.childNodes.forEach((book, index) => {
                choosenBooksRect[index] = (
                  book as HTMLElement
                ).getBoundingClientRect()
                book.addEventListener(
                  'mouseover',
                  (book.bookOver = () => hoverBook(index))
                )
                book.addEventListener(
                  'mouseout',
                  (book.bookOut = () => blurBook())
                )
              })
            }
            animationRunning = false
          })
      )
      if (updatingStatus.length === 0) animationRunning = false
    }
  }, [rectList, choosen, justAddedBook])

  return (
    <div className="container-fluid d-flex ">
      <div
        className={
          choosen.includes(true)
            ? 'not-choosen d-flex flex-wrap col-sm-9'
            : 'not-choosen d-flex flex-wrap col-sm-12'
        }
        ref={notChoosenDiv}
      >
        {bookList.map((book, index) => (
          <img
            className="book rounded-4"
            src={book}
            ref={(e) => (bookRefs.current[index] = e)}
            onClick={() => toggleBook(index)}
            key={index}
            style={styleList[index]}
          />
        ))}
      </div>
      <div
        className={
          choosen.includes(true) ? 'choosen col-sm-3' : 'choosen hidden'
        }
      >
        <h2>Reading-List</h2>
        <hr />
        <div
          className="reading-list d-flex flex-column justify-content-center align-items-center"
          ref={choosenDiv}
        ></div>
      </div>
    </div>
  )
}
