import { animate } from 'motion'

type ComputeAnimationProps = {
  elem: HTMLElement
  oldRect: DOMRect
  newRect: DOMRect
}

export function moveBooks({ elem, oldRect, newRect }: ComputeAnimationProps) {
  const translate = { x: oldRect.x - newRect.x, y: oldRect.y - newRect.y }
  // first we set it at his old place
  animate(elem, { x: translate.x, y: translate.y }, { duration: 0 })
  // then we move it
  animate(elem, { x: 0, y: 0, scale: 1 }, { duration: 1 })
}

export function updateReadingListBooksSize(
  choosenBooks: NodeListOf<ChildNode>,
  max: number
) {
  choosenBooks.forEach((book, index) => {
    const reversedIndex = max - index
    const ratio = (reversedIndex * 2) / max
    const remainingBooks = choosenBooks.length - (index + 1)
    const heigthDiff = 7.5 * choosenBooks.length
    animate(
      book as Element,
      {
        zIndex: reversedIndex,
        scale: 1 + 0.05 * reversedIndex,
        y: 250 - heigthDiff + 20 * ratio * remainingBooks,
      },
      { duration: 1 }
    )
  })
}
