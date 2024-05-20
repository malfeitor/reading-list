import { useEffect, useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import { moveBooks, updateReadingListBooksSize } from './utils/animations'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [choosen, setChoosen] = useState([...bookList.map(() => false)])
  const [styleList, setStyleList] = useState([...bookList.map(() => {})])
  const choosenQuantity = () =>
    choosen.reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
  const [rectList, setRectList] = useState<DOMRect[]>([])

  const bookRefs = useRef<HTMLImageElement[]>([])
  const notChoosenDiv = useRef<HTMLDivElement>(null)
  const choosenDiv = useRef<HTMLDivElement>(null)

  function toggleBook(index: number) {
    // snapshot books positions for animation
    setRectList(bookRefs.current.map((book) => book.getBoundingClientRect()))

    const book = bookRefs.current[index]
    const newStyle = [...styleList]
    if (choosen[index]) {
      book.classList.remove('selected')
      choosenDiv.current!.removeChild(book)
      notChoosenDiv.current!.append(book)
      newStyle[index] = {}
    } else {
      book.classList.add('selected')
      notChoosenDiv.current!.removeChild(book)
      choosenDiv.current!.append(book)
      newStyle[index] = {
        zIndex: bookList.length - choosenQuantity(),
        margin: `${200 + (index / bookList.length) * 50}px 0 -550px`,
      }
    }

    const newChoosen = [...choosen]
    newChoosen[index] = !newChoosen[index]
    setChoosen(newChoosen)
    setStyleList(newStyle)
  }

  useEffect(() => {
    if (rectList.length > 0) {
      bookRefs.current.forEach((book, index) => {
        moveBooks({
          elem: book,
          oldRect: rectList[index],
          newRect: book.getBoundingClientRect(),
        })
      })
      updateReadingListBooksSize(
        choosenDiv.current!.childNodes,
        bookList.length
      )
    }
  }, [rectList])

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
            className="book "
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
        <div className="reading-list d-flex flex-column" ref={choosenDiv}></div>
      </div>
    </div>
  )
}
