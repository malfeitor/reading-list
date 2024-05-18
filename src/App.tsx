import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import { library } from './data/books.json'

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
    <>
      {library.map((item) => (
        <Card
          img={item.book.cover}
          addInReadingList={selectCard}
          removeFromReadingList={removeCard}
          key={item.book.title}
          id={item.book.title}
        />
      ))}
    </>
  )
}

export default App
