import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup } from 'react-bootstrap'
import { Tabs, Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import axios from 'axios'

// Utils
const makePaginations = (currentPage, setCurrentPage, totalPageNum, paginationNum) => {
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
    <Pagination>
      <Pagination.First onClick={() => setCurrentPage(1)} />
      <Pagination.Prev onClick={() => setCurrentPage((currentPage === 1) ? 1 : currentPage - 1)} />
      { paginations}
      <Pagination.Next onClick={() => setCurrentPage((currentPage === totalPageNum) ? totalPageNum : currentPage + 1)} />
      <Pagination.Last onClick={() => setCurrentPage(totalPageNum)} />
    </Pagination>
  )
}

const fetchAllInstitutesInfo = async (queryParams, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/getallinfo`
  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        ...queryParams,
      }
    })
    cb(await req.then())
  } catch (err) {
    console.error(err)
  }
}

const queryInstitutesInfo = async (queryParams, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/getinfo`

  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      data: {
        ...queryParams
      }
    })
    cb(await req.then())
  } catch (err) {
    console.error(err)
  }
}

const fetchInstituteInfo = async (instituteId, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/${instituteId}/getinfo`
  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    cb(await req.then())
  } catch (err) {
    console.error(err)
  }

}

// Componenets

const InstituteTabs = (props) => {
  const institute = props.institute
  const [key, setKey] = useState('home')
  return (
    <div>
      <Tab.Container defaultActiveKey="general">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link eventKey="general">概览</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="data">数据</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Tab.Content>
            <Tab.Pane eventKey="general">
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
            </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Tab.Pane>

            <Tab.Pane eventKey="data">
              <Card.Body>
                <Card.Title>DATA</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Tab.Pane>
          </Tab.Content>
        </Card>
      </Tab.Container>
    </div>
  )

}


const Labels = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const labels = props.labels

  return (
    <div>
      {
        (labels) ?
          labels.map(
            (l, idx) => ((l) ? (<Badge variant={["primary", "secondary", "success", "info"][idx % 4]}
              className="mr-1"
              onClick={(e) => {
                history.push({
                  pathname: '/institute',
                  state: {
                    queryParams: [l]
                  }
                })
              }}
            >{l.label}</Badge>) : (<></>))
          ) : []
      }
    </div>
  )
}

const Detail = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const id = useParams().id

  const [institute, setInstitute] = useState()

  useEffect(() => {
    fetchInstituteInfo(id, (res) => {
      setInstitute(res.data)
    })
  }, [])

  const Header = () => {
    return (
      <div className="mb-3">
        <div className="container">
          <Row>
            <Col xs="auto">
              <Row className="mb-2">
                <Col>
                  <Image width={96} height={96} src={`https://static-data.eol.cn/upload/logo/${institute.id}.jpg`} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-success" size="sm" block>
                    关注
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <p>
                <Row>
                  <Col xs="auto">
                    <span className="institute-name-150">
                      {institute.name}
                      <a className="ml-1" href={institute.website}>
                        <SVG variant="link-45deg" />
                      </a>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="annotation">
                      <span className="mr-2">
                        <SVG variant="location" />
                      </span>
                      <span>
                        {institute.address}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="annotation">
                      <span className="mr-2">
                        <SVG variant="email" />
                      </span>
                      <a href={`mailto:${institute.email}`}>
                        {institute.email}
                      </a>
                    </div>
                  </Col>
                </Row>
              </p>
              <Row>
                <Col>
                  <p>
                    <Labels labels={institute.labels} />
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <u>
                    <b>{Math.floor(Math.random() * 1000)}</b>
                  </u> 人关注
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        (institute) ?
          (
            <>
              <Header />
              <InstituteTabs institute={institute} />
            </>
          ) : (<></>)
      }
    </div>
  )
}



// TODO: InstituteCard

const InstituteTable = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const location = useLocation()

  const [institutes, setInstitutes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const instPerPage = props.instperpage
  const totalPageNum = Math.ceil(institutes.length / instPerPage)

  const [queryTags, setQueryTags] = useState(location.state.queryParams || [])
  const [keyword, setKeyword] = useState("")

  const handleQuery = (e) => {
    if (e) e.preventDefault();
    queryInstitutesInfo({
      keywordconj: keywordConjunction,
      tags: queryTags
    }, (res) => {
      console.log(res.data.queryParams)
      setInstitutes([...res.data.institutes])
      setCurrentPage(1)
    })
  }

  const addTag = (category, label) => {
    if (!queryTags.find(t => (t.category === category) && (t.label === label))) {
      setQueryTags([
        ...queryTags.slice(0, -1),
        {
          category: category,
          label: label
        },
        {
          category: 'removeAll',
          label: '移除所有条件'
        }
      ])
    }
  }

  const addKeyword = (kw) => {
    if (kw != '') {
      addTag('keyword', kw)
    }
  }

  const removeTag = (tag) => {
    if (tag.category === 'removeAll') {
      setQueryTags([])
    } else {
      setQueryTags(queryTags.filter((t) => !((t.category === tag.category) && (t.label === tag.label))))
    }
  }

  const [keywordConjunction, setKeywordConjunction] = useState(true)

  useEffect(() => {
    console.log(queryTags)
    handleQuery()
  }, [queryTags])

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            搜索条件
                    </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <Form.Row>
                  <Form.Group as={Col} controlId="instname" >
                    <Form.Label>院校名称</Form.Label>
                    <InputGroup size="sm">
                      <Form.Control
                        type="text"
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                        onKeyPress={(e) => { if (e.code === 'Enter') { addKeyword(keyword); setKeyword('') } }}
                      />
                      <InputGroup.Append>
                        <Button
                          variant="dark"
                          onClick={(e) => { addKeyword(keyword); setKeyword('') }}
                        >
                          添加关键字
                        </Button>
                      </InputGroup.Append>
                    </InputGroup>

                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} controlId="province">
                    <Form.Label>地区</Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      defaultValue="..."
                      onChange={
                        (e) => {
                          if (e.target.value !== "...") {
                            addTag("region", e.target.value)
                            e.target.value = '...'
                          }
                        }
                      }>
                      <option>...</option>
                      {constants.regions.map((r) => {
                        return (<option>{r.region_name}</option>)
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="category">
                    <Form.Label>类型</Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      defaultValue="..."
                      onChange={
                        (e) => {
                          if (e.target.value !== "...") {
                            addTag("category", e.target.value)
                            e.target.value = '...'
                          }
                        }
                      }
                    >
                      <option>...</option>
                      {constants.instituteCategories.map((p) => {
                        return (<option>{p}</option>)
                      })}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="label">
                    <Form.Label>标签</Form.Label>
                    <Form.Control
                      size="sm"
                      as="select"
                      defaultValue="..."
                      onChange={
                        (e) => {
                          if (e.target.value !== "...") {
                            addTag("tag", e.target.value)
                            e.target.value = '...'
                          }
                        }
                      }>
                      <option>...</option>
                      {constants.instituteLabels.map((p) => {
                        return (<option>{p}</option>)
                      })}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Row>
                  <Col>
                    {
                      queryTags.map((tag) => {
                        let tagBadge = {
                          'region': 'success',
                          'category': 'primary',
                          'tag': 'info',
                          'keyword': 'dark',
                          'removeAll': 'danger'
                        }
                        return (
                          <Badge className="mr-2"
                            variant={tagBadge[tag.category]}
                            pill
                            onClick={() => removeTag(tag)}
                          >
                            {(tag.category === 'keyword') ? '关键字：' : ''}
                            {tag.label}
                            <SVG variant="x" />
                          </Badge>
                        )
                      })
                    }
                    {
                      (queryTags.length > 0) ? (
                        <Badge variant="danger" pill>
                          移除搜索条件
                          <SVG variant="trash" />
                        </Badge>
                      ) : (
                          <></>
                        )
                    }
                  </Col>
                </Row>
                <hr />
                <ButtonGroup>
                  <Button variant="primary" type="button" size="sm" onClick={handleQuery}>
                    查询
                                </Button>
                  <ButtonGroup toggle>
                    <ToggleButton
                      size="sm"
                      type="checkbox"
                      variant="outline-dark"
                      checked={keywordConjunction}
                      value={(keywordConjunction) ? "conjunction" : "disjunction"}
                      onChange={(e) => {
                        console.log(e.currentTarget.checked)
                        setKeywordConjunction(!keywordConjunction)
                      }}
                    >
                      {((keywordConjunction) ? "合取" : "析取") + "关键字"}
                    </ToggleButton>
                  </ButtonGroup>

                </ButtonGroup>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <hr />
      <ListGroup>
        <ListGroup.Item style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
          <Row>
            <Col className="mr-auto">
              搜索结果<span className="annotation">（共 {institutes.length} 项）</span>
              <br />
              {
                (institutes.length > 0) ? (
                  <span className="annotation">
                    第 {(currentPage - 1) * instPerPage + 1}~{(currentPage * instPerPage > institutes.length) ? institutes.length : (currentPage * instPerPage)} 项
                  </span>

                ) :
                  (<></>)
              }
            </Col>

            <Col xs="auto" sm="auto">
              <Row>
                <span>
                  <SVG variant="sort" />
                </span>
                <Col className="ml-auto">
                  <Form.Control as="select" defaultValue="名称" size="sm" onChange={
                    (e) => {
                      switch (e.target.value) {
                        case "校名":
                          setInstitutes([...institutes.sort((a, b) => a.name.localeCompare(b.name, 'zh'))])
                          break;
                        case "地区":
                          setInstitutes([...institutes.sort((a, b) => a.location.localeCompare(b.location, 'zh'))])
                          break;
                        case "类别":
                          setInstitutes([...institutes.sort((a, b) => a.labels.join(',').localeCompare(b.labels.join(','), 'zh'))])
                          break;
                        default:
                          return 0
                      }
                    }
                  }>
                    <option>校名</option>
                    <option>地区</option>
                    <option>类别</option>
                  </Form.Control>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
        {
          institutes.slice((currentPage - 1) * instPerPage, currentPage * instPerPage).map((i, idx) => {
            return (
              <ListGroup.Item action onClick={() => { history.push(`${path}/${i.id}`) }}>
                <Row>
                  <Col xs="auto" className="d-none d-sm-block">
                    <Image fluid height={80} width={80} src={i.icon} />
                  </Col>
                  <Col sm>
                    <Row>
                      <Col xs>
                        <Image className="d-xs-block d-sm-none mr-2" fluid height={24} width={24} src={i.icon} />
                        <b>{i.name}</b>
                      </Col>
                      <Col style={{ textAlign: "right" }} xs="auto">
                        <span className="annotation">
                          <SVG variant="location" />
                          {i.location}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Labels labels={i.labels} />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Nav fill>
                          <Nav.Item>
                            <Nav.Link className="" onClick={(e) => { e.stopPropagation(); alert(1234) }}>
                              <SVG variant="star" />
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className="">
                              <SVG variant="chat" />
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link className="">
                              <SVG variant="share" />
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="d-none d-lg-block">
                    <Row>
                      <span className="annotation">
                        {i.brief}...
                      </span>
                    </Row>
                    <Row>

                    </Row>
                  </Col>
                </Row>
              </ListGroup.Item>
            )
          }
          )
        }
      </ListGroup>
      <br />
      <Row>
        <Col>
          {makePaginations(currentPage, setCurrentPage, totalPageNum, 4)}
        </Col>
        <Col xs={4}>
          <Form.Control
            as="select"
            onChange={(e) => {
              setCurrentPage(parseInt(e.target.value))
            }}
            value={currentPage}>
            {
              [...Array(totalPageNum).keys()].map((n, idx) => {
                return (
                  <option>{idx + 1}</option>
                )
              })
            }
          </Form.Control>
        </Col>
      </Row>
    </div>
  )
}

const InstitutePage = ({ location }) => {
  const { path, url, params } = useRouteMatch()
  const [instperpage, setInstperpage] = useState(Math.floor(window.innerHeight / 40))

  return (
    <Router>
      <div>
        <Switch>
          <Route path={`${path}/:id`}>
            <Detail />
          </Route>
          <Route path={`${path}`} >
            <InstituteTable instperpage={instperpage} />
          </Route>
        </Switch>

      </div>
    </Router>

  )
}

export default InstitutePage;