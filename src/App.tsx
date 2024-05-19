import { useEffect, useState } from 'react'
import './App.scss'
import Card from './components/Card'
import { library } from './data/books.json'
import { LayoutGroup } from 'framer-motion'

type StyleType = {
  [key: string]: string | number | number[]
}

function App() {
  const READING_LIST_X = window.innerWidth * 0.875
  const [selectedList, updateList] = useState<number[]>([])
  const [unselectedList, updateUnselectedList] = useState<number[]>(
    library.map((item, index) => index)
  )
  // stylelist contiendra les Z-Index des livres choisis
  const [styleList, setStyleList] = useState<StyleType[]>([])
  // animlist contient les animations en cours
  const [animList, setAnimList] = useState<StyleType[]>([])

  // fonction appellée quand on click sur un livre non selectionné
  const selectCard = (key: number) => {
    const booksPerRow = selectedList.length > 0 ? 9 : 11
    const newAnimList = [...animList]
    newAnimList[key] = {
      ...animList[key],
      x: [124 * (unselectedList.indexOf(key) % booksPerRow), READING_LIST_X],
      y: [
        176 * Math.floor(unselectedList.indexOf(key) / booksPerRow),
        100 - 20 * selectedList.length,
      ],
      scale: 1.8 - 0.05 * selectedList.length,
    }
    setAnimList(newAnimList)
    const newStyles = [...styleList]
    newStyles[key] = {
      ...styleList[key],
      zIndex: bookList.length - selectedList.length,
    }
    setStyleList(newStyles)

    const oldUnselected = [...unselectedList]
    oldUnselected.splice(unselectedList.indexOf(key), 1)
    updateUnselectedList(oldUnselected)
    updateList([...selectedList, key])
  }

  // fonction appellée quand on click sur un livre déjà selectionné
  const removeCard = (key: number) => {
    const newList = [...selectedList]
    newList.splice(selectedList.indexOf(key), 1)
    updateList(newList)
    updateUnselectedList([...unselectedList, key])
    const newAnimList = [...animList]
    newAnimList[key] = {
      ...animList[key],
      x: 0,
      y: 0,
      scale: 1,
    }
    setAnimList(newAnimList)
  }

  // on crée la liste des livres
  const bookList = library.map((item, index) => (
    <Card
      img={item.book.cover}
      addInReadingList={selectCard}
      removeFromReadingList={removeCard}
      key={item.book.title}
      id={index}
      style={styleList[index]}
      anim={animList[index]}
    />
  ))

  // on initialise les array d'animation et de style
  useEffect(() => {
    const newStyleList: StyleType[] = []
    const newAnimList: StyleType[] = []
    library.forEach((item, index) => {
      newStyleList.push({})
      newAnimList.push({ x: 0, y: 0 })
    })
    setStyleList(newStyleList)
    setAnimList(newAnimList)
  }, [])

  return (
    <div className="container-fluid row">
      <div
        className={
          selectedList.length > 0
            ? 'row d-flex flex-wrap align-content-start col-sm-10 non-selected'
            : 'row non-selected align-items-start'
        }
      >
        <LayoutGroup>{bookList.map((book) => book)}</LayoutGroup>
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
