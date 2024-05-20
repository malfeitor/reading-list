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
  animate(elem, { x: 0, y: 0 }, { duration: 1 })
}

// export function resizeAnimation({elem, })
