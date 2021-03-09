import { Form, Pagination, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

/*
  currentPage: 当前页state
  setCurrentPage: 设置当前页
  totalPageNum: 总页数
  paginationNum: 导览按钮个数
*/
const makePaginations = (currentPage, setCurrentPage, totalPageNum, paginationNum, size = 'sm') => {
  var paginations = []
  if (paginationNum < totalPageNum) {
    if (currentPage + paginationNum > totalPageNum) {
      for (let i = totalPageNum - paginationNum + 1; i <= totalPageNum; i++) {
        paginations.push(
          (
            <Pagination.Item
              key={i}
              active={i === currentPage}
              onClick={() => setCurrentPage(i)}>
              {i}
            </Pagination.Item>
          )
        )
      }
    } else {
      for (let i = currentPage; i < currentPage + paginationNum; i++) {
        paginations.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}>
            {i}
          </Pagination.Item>
        )
      }
    }
  } else {
    for (let i = 1; i <= totalPageNum; i++) {
      paginations.push(
        (
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => setCurrentPage(i)}>
            {i}
          </Pagination.Item>
        )
      )
    }
  }

  return (
    <Row>
      <Col xs="auto">
        <Pagination className="mb-0" size={(size) ? size : ""}>
          <Pagination.First onClick={() => setCurrentPage(1)} />
          <Pagination.Prev onClick={() => setCurrentPage((currentPage === 1) ? 1 : currentPage - 1)} />
          {paginations}
          <Pagination.Next onClick={() => setCurrentPage((currentPage === totalPageNum) ? totalPageNum : currentPage + 1)} />
          <Pagination.Last onClick={() => setCurrentPage(totalPageNum)} />
        </Pagination>
      </Col>
      <Col xs="auto" className="ml-auto">
        <Form.Control
          as="select"
          size={(size) ? size : ""}
          onChange={(e) => {
            setCurrentPage(parseInt(e.target.value))
          }}
          value={currentPage}
          className="mb-0"
        >
          {
            [...Array(totalPageNum).keys()].map((p) => {
              return (<option>{p + 1}</option>)
            })
          }
        </Form.Control>
      </Col>
    </Row>
  )
}

export { makePaginations };