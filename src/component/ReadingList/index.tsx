import { ReactNode } from 'react'
import { Row } from 'react-bootstrap'

type ReadingListProps = {
  children: ReactNode[]
}

export default function ReadingList({ children }: ReadingListProps) {
  return (
    <Row className={children.length > 0 ? 'choosen' : 'choosen hidden'}>
      {children}
    </Row>
  )
}
