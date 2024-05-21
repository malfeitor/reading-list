import { ReactNode } from 'react'
import { Row } from 'react-bootstrap'

type BookshelfProps = {
  children: ReactNode[]
}

export default function Bookshelf({ children }: BookshelfProps) {
  return <Row className="not-choosen">{children}</Row>
}
