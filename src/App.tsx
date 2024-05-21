import { useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
// import { animate } from 'framer-motion'
// import { moveBooks, updateReadingListBooksSize } from './utils/animations'
import Book from './component/Book'
import Bookshelf from './component/Bookshelf'
import ReadingList from './component/ReadingList'
import { Container } from 'react-bootstrap'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [styleList, setStyleList] = useState([...bookList.map(() => {})])
  const [animList, setAnimList] = useState([...bookList.map(() => {})])

  const booksAvailable = bookList.map((item, index) => (
    <Book
      img={item}
      style={styleList[index]}
      animation={animList[index]}
      key={index}
      onClick={() => bookClick(index)}
      mouseOut={() => bookOut(index)}
      mouseOver={() => bookOver(index)}
    />
  ))

  const [bookshelfBooks, setBookshelfBooks] = useState<number[]>(
    booksAvailable.map((item, index) => index)
  )
  const [readingBooks, setReadingBooks] = useState<number[]>([])

  function bookClick(bookIndex: number) {
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
    //   if (animationRunning) return
    //   // snapshot books positions for animation
    //   setRectList(bookRefs.current.map((book) => book.getBoundingClientRect()))

    //   const book = bookRefs.current[index]
    //   const newStyle = [...styleList]
    //   if (choosen[index]) {
    //     book.classList.remove('selected')
    //     choosenDiv.current!.removeChild(book)
    //     notChoosenDiv.current!.append(book)
    //     newStyle[index] = { zIndex: 0, margin: 0 }
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
    //   setStyleList(newStyle)
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
  // const [justAddedBook, setLastAction] = useState(-1)

  // const [rectList, setRectList] = useState<DOMRect[]>([])

  // const bookRefs = useRef<HTMLImageElement[]>([])
  // const notChoosenDiv = useRef<HTMLDivElement>(null)
  // const choosenDiv = useRef<HTMLDivElement>(null)

  // const choosenBooksRect: DOMRect[] = []
  // let animationRunning = false

  // useEffect(() => {
  //   if (rectList.length > 0) {
  //     animationRunning = true
  //     bookRefs.current.forEach((book, index) => {
  //       book.removeEventListener('mouseover', book.bookOver)
  //       book.removeEventListener('mouseout', book.bookOut)
  //       if (!choosen[index] || index === justAddedBook) {
  //         moveBooks({
  //           elem: book,
  //           oldRect: rectList[index],
  //           newRect: book.getBoundingClientRect(),
  //         })
  //       }
  //     })
  //     const updatingStatus = updateReadingListBooksSize(
  //       choosenDiv.current!.childNodes,
  //       bookList.length
  //     )
  //     updatingStatus.forEach(
  //       async (status, index) =>
  //         await status.finished.then(() => {
  //           if (index === updatingStatus.length - 1) {
  //             choosenDiv.current!.childNodes.forEach((book, index) => {
  //               choosenBooksRect[index] = (
  //                 book as HTMLElement
  //               ).getBoundingClientRect()
  //               book.addEventListener(
  //                 'mouseover',
  //                 (book.bookOver = () => hoverBook(index))
  //               )
  //               book.addEventListener(
  //                 'mouseout',
  //                 (book.bookOut = () => blurBook())
  //               )
  //             })
  //           }
  //           animationRunning = false
  //         })
  //     )
  //     if (updatingStatus.length === 0) animationRunning = false
  //   }
  // }, [rectList, choosen, justAddedBook])

  return (
    <Container fluid className="d-flex">
      <Bookshelf>
        {bookshelfBooks.map((index) => booksAvailable[index])}
      </Bookshelf>
      <ReadingList>
        {readingBooks.map((index) => booksAvailable[index])}
      </ReadingList>
      {/* <div
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
      </div> */}
    </Container>
  )
}
