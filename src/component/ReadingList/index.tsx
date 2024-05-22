import { ReactNode } from 'react'
import { Col } from 'react-bootstrap'

type ReadingListProps = {
  children: ReactNode[]
}

export default function ReadingList({ children }: ReadingListProps) {
  return (
    <Col sm={3} className={children.length > 0 ? 'choosen' : 'choosen hidden'}>
      {children}
    </Col>
  )
}
