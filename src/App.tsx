import { useRef, useState } from 'react'
import './App.scss'
import { library } from './data/books.json'
import { animate } from 'motion'

const bookList = library.map((item) => item.book.cover)

export default function App() {
  const [choosen, setChoosen] = useState([...bookList.map(() => false)])
  const bookRefs = useRef<HTMLImageElement[]>([])
  const notChoosenDiv = useRef<HTMLDivElement>(null)
  const choosenDiv = useRef<HTMLDivElement>(null)

  function toggleBook(index: number) {
    console.log(bookRefs)
    const oldRect = bookRefs.current.map((book) => book.getBoundingClientRect())
    if (choosen[index]) {
      choosenDiv.current!.removeChild(bookRefs.current[index])
      notChoosenDiv.current!.append(bookRefs.current[index])
    } else {
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

  type ComputeAnimationProps = {
    elem: HTMLElement
    oldRect: DOMRect
    newRect: DOMRect
  }

  function computeAnimation({ elem, oldRect, newRect }: ComputeAnimationProps) {
    console.log(oldRect)
    const translate = { x: oldRect.x - newRect.x, y: oldRect.y - newRect.y }
    // first we set it at his old place
    animate(elem, { x: translate.x, y: translate.y }, { duration: 0 })
    // then we move it
    animate(elem, { x: 0, y: 0 }, { duration: 1 })
  }

  return (
    <div className="container">
      <div className="not-choosen" ref={notChoosenDiv}>
        {bookList.map((book, index) => (
          <img
            className="col-sm-1 book"
            src={book}
            ref={(e) => (bookRefs.current[index] = e)}
            onClick={() => toggleBook(index)}
            key={index}
          />
        ))}
      </div>
      <div className="choosen" ref={choosenDiv}></div>
    </div>
  )
}
