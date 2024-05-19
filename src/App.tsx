import { useEffect, useState } from 'react'
import './App.scss'
import Card from './components/Card'
import { library } from './data/books.json'
import { animate } from 'motion'

function App() {
  const [selectedList, updateList] = useState<number[]>([])
  const READING_LIST_X = window.innerWidth * 0.875

  const selectCard = (key: number) => {
    // console.log(key)
    // console.log(READING_LIST_X)
    animate(
      `#book-${key}`,
      {
        x: READING_LIST_X,
        y: 100 + 10 * selectedList.length,
        scale: 1.8 - 0.05 * selectedList.length,
      },
      { duration: 0.5 }
    )
    // selectedList.map((item) => {
    //   animate(`#book-${item}`, { y: +10 * selectedList.length })
    // })
    updateList([...selectedList, key])
  }

  const removeCard = (key: number) => {
    const newList = [...selectedList]
    newList.splice(selectedList.indexOf(key), 1)
    updateList(newList)
    animate(`#book-${key}`, { transform: 'translate(0px)' }, { duration: 0.5 })
  }

  useEffect(() => {
    // console.log(selectedList)
  }, [selectedList])

  return (
    <div className="container-fluid row">
      <div
        className={
          selectedList.length > 0
            ? 'row d-flex flex-wrap align-content-start col-sm-10 non-selected'
            : 'row non-selected align-items-start'
        }
      >
        {library.map((item, index) => (
          <Card
            img={item.book.cover}
            addInReadingList={selectCard}
            removeFromReadingList={removeCard}
            key={item.book.title}
            id={index}
          />
        ))}
      </div>
      {selectedList.length > 0 ? (
        <div className="reading-list col-sm-2 ">
          <h2>Reading-List</h2>
          <hr className="dashed" />
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

export default App
