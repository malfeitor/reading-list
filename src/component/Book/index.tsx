import { motion } from 'framer-motion'
import { Col } from 'react-bootstrap'

type CSSObjectType = {
  [key: string]: string
}

type BookProps = {
  img: string
  style: CSSObjectType | void
  animation: CSSObjectType | void
  onClick: () => void
  mouseOver: () => void
  mouseOut: () => void
}

export default function Book({
  img,
  style,
  animation,
  onClick,
  mouseOver,
  mouseOut,
}: BookProps) {
  return (
    <Col>
      <motion.img
        src={img}
        className="book rounded-4"
        style={style as CSSObjectType}
        animate={animation as CSSObjectType}
        onClick={onClick}
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      />
    </Col>
  )
}
