import { useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import { moveBooks } from './utils/animations'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [choosen, setChoosen] = useState([...bookList.map(() => false)])
  const bookRefs = useRef<HTMLImageElement[]>([])
  const notChoosenDiv = useRef<HTMLDivElement>(null)
  const choosenDiv = useRef<HTMLDivElement>(null)

  function toggleBook(index: number) {
    const oldRect = bookRefs.current.map((book) => book.getBoundingClientRect())
    const book = bookRefs.current[index]
    if (choosen[index]) {
      book.classList.remove('selected')
      choosenDiv.current!.removeChild(book)
      notChoosenDiv.current!.append(book)
    } else {
      book.classList.add('selected')
      notChoosenDiv.current!.removeChild(book)
      choosenDiv.current!.append(book)
    }

    const newChoosen = [...choosen]
    newChoosen[index] = !newChoosen[index]
    setChoosen(newChoosen)

    const newRect = bookRefs.current.map((book) => book.getBoundingClientRect())
    bookRefs.current.forEach((book, index) => {
      moveBooks({
        elem: book,
        oldRect: oldRect[index],
        newRect: newRect[index],
      })
    })
  }

  return (
    <div className="container-fluid d-flex flex-direction-row">
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
            className="book"
            src={book}
            ref={(e) => (bookRefs.current[index] = e)}
            onClick={() => toggleBook(index)}
            key={index}
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
