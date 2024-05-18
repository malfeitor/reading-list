import { useEffect, useState } from 'react'
import './App.scss'
import Card from './components/Card'
import { library } from './data/books.json'
// import { animate } from 'motion'

function App() {
  const [selectedList, updateList] = useState<string[]>([])

  const selectCard = (key: string) => {
    updateList([...selectedList, key])
  }

  const removeCard = (key: string) => {
    const oldList = [...selectedList]
    oldList.splice(selectedList.indexOf(key), 1)
    updateList(oldList)
  }

  useEffect(() => {
    console.log(selectedList)
  }, [selectedList])

  return (
    <div className="container-fluid row">
      <div
        className={
          selectedList.length > 0
            ? 'row d-flex flex-wrap ali col-sm-10 non-selected'
            : 'row non-selected'
        }
      >
        {library.map((item) => (
          <Card
            img={item.book.cover}
            addInReadingList={selectCard}
            removeFromReadingList={removeCard}
            key={item.book.title}
            id={item.book.title}
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
