import { motion } from 'framer-motion'
import { Col } from 'react-bootstrap'

type CSSObjectType = {
  [key: string]: string
}

type BookProps = {
  img: string
  style: CSSObjectType | void
  animation: CSSObjectType | void
}

export default function Book({ img, style, animation }: BookProps) {
  return (
    <Col>
      <motion.img
        src={img}
        className="book rounded-4"
        style={style as CSSObjectType}
        animate={animation as CSSObjectType}
      />
    </Col>
  )
}
