import { ReactNode } from 'react'
import { Row } from 'react-bootstrap'

type BookshelfProps = {
  children: ReactNode[]
}

export default function Bookshelf({ children }: BookshelfProps) {
  return <div className="not-choosen d-flex flex-wrap col-sm-9">{children}</div>
}
