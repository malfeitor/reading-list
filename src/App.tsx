import { useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import { computeAnimation } from './utils/animations'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [choosen, setChoosen] = useState([...bookList.map(() => false)])
  const bookRefs = useRef<HTMLImageElement[]>([])
  const notChoosenDiv = useRef<HTMLDivElement>(null)
  const choosenDiv = useRef<HTMLDivElement>(null)

  function toggleBook(index: number) {
    const oldRect = bookRefs.current.map((book) => book.getBoundingClientRect())
    if (choosen[index]) {
      bookRefs.current[index].classList.remove('selected')
      choosenDiv.current!.removeChild(bookRefs.current[index])
      notChoosenDiv.current!.append(bookRefs.current[index])
    } else {
      bookRefs.current[index].classList.add('selected')
      notChoosenDiv.current!.removeChild(bookRefs.current[index])
      choosenDiv.current!.append(bookRefs.current[index])
    }

    const newChoosen = [...choosen]
    newChoosen[index] = !newChoosen[index]
    setChoosen(newChoosen)

    const newRect = bookRefs.current.map((book) => book.getBoundingClientRect())
    bookRefs.current.forEach((book, index) => {
      computeAnimation({
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
            ? 'not-choosen d-flex flex-wrap col-sm-10'
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
          choosen.includes(true) ? 'choosen col-sm-2' : 'choosen hidden'
        }
      >
        <h2>Reading-List</h2>
        <hr />
        <div className="" ref={choosenDiv}></div>
      </div>
    </div>
  )
}
