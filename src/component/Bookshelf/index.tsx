import { ReactNode } from 'react'
import { Col } from 'react-bootstrap'
import './index.scss'

type BookshelfProps = {
  children: ReactNode[]
  collapsed: boolean
}

export default function Bookshelf({ children, collapsed }: BookshelfProps) {
  return (
    <Col sm={collapsed ? 9 : 12} className="not-choosen d-flex flex-wrap">
      {children}
    </Col>
  )
}
