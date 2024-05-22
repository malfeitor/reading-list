import { AnimationControls } from 'motion'
import { animate } from 'motion'

type ComputeAnimationProps = {
  elem: HTMLElement
  oldRect: DOMRect
  newRect: DOMRect
}

export function moveBooks({ elem, oldRect, newRect }: ComputeAnimationProps) {
  const translate = { x: oldRect.x - newRect.x, y: oldRect.y - newRect.y }
  // translate from old place to new one
  animate(
    elem,
    { x: [translate.x, 0], y: [translate.y, 0], scale: 1 },
    { duration: 1 }
  )
}

export function updateReadingListBooksSize(
  choosenBooks: NodeListOf<ChildNode>,
  max: number
) {
  const animateStatus = <AnimationControls[]>[]
  choosenBooks.forEach((book, index) => {
    const reversedIndex = max - index
    const ratio = (reversedIndex * 2) / max
    const remainingBooks = choosenBooks.length - (index + 1)
    const heigthDiff = 7.5 * choosenBooks.length
    animateStatus.push(
      animate(
        book as Element,
        {
          zIndex: reversedIndex,
          scale: 1 + 0.05 * reversedIndex,
          y: 250 - heigthDiff + 20 * ratio * remainingBooks,
        },
        { duration: 1 }
      )
    )
  })
  return animateStatus
}
