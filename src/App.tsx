import { useRef, useState } from 'react'
import './App.scss'
// import Card from './components/Card'
import { library } from './data/books.json'
// import { motion } from 'framer-motion'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [choosen, setChoosen] = useState([...bookList.map(() => false)])
  const bookRefs = useRef([])
  const notChoosenDiv = useRef(null)
  const choosenDiv = useRef(null)

  function toggleBook(index) {
    if (choosen[index]) {
      choosenDiv.current.removeChild(bookRefs[index])
      notChoosenDiv.current.append(bookRefs[index])
    } else {
      notChoosenDiv.current.removeChild(bookRefs[index])
      choosenDiv.current.append(bookRefs[index])
    }
    const newChoosen = [...choosen]
    newChoosen[index] = !newChoosen[index]
    setChoosen(newChoosen)
    computeAnimation(bookRefs[index])
  }

  function computeAnimation(elem: HTMLElement) {
    console.log(elem.getBoundingClientRect())
    return
  }

  return (
    <div className="container">
      <div className="not-choosen" ref={notChoosenDiv}>
        {bookList.map((book, index) => (
          <img
            className="col-sm-1"
            src={book}
            ref={(e) => (bookRefs[index] = e)}
            onClick={() => toggleBook(index)}
            key={index}
          />
        ))}
      </div>
      <div className="choosen" ref={choosenDiv}></div>
    </div>
  )
}
