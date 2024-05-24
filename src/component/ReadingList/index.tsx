import { ReactNode } from 'react'
import { Col } from 'react-bootstrap'
import './index.scss'

type ReadingListProps = {
  children: ReactNode[]
}

export default function ReadingList({ children }: ReadingListProps) {
  return (
    <Col sm={3} className={children.length > 0 ? 'choosen' : 'choosen hidden'}>
      <h2>Reading-list</h2>
      <hr />
      {children}
    </Col>
  )
}
