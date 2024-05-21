import { Col, Image } from 'react-bootstrap'

type BookProps = {
  img: string
}

export default function Book({ img }: BookProps) {
  return (
    <Col>
      <Image src={img} className="book rounded-4" />
    </Col>
  )
}
