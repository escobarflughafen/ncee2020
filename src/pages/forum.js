import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import makePagination from './components/pagination'
import {timeStringConverter} from '../utils/util'

const demoTopics = [
  {
    id: 125,
    title: "689分能不能上北大",
    host: "haskell",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '31', img: 'https://static-data.eol.cn/upload/logo/31.jpg', name: '北京大学' },
    region: '广州',
    tags: ['理科', '分数线'],
    viewCount: 1231,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大有什么文科专业推荐",
    host: "Joel",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '北京大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大还是华工",
    host: "admin",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '广东工业大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "689分能不能上北大",
    host: "haskell",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '31', img: 'https://static-data.eol.cn/upload/logo/31.jpg', name: '北京大学' },
    region: '广州',
    tags: ['理科', '分数线'],
    viewCount: 1231,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大有什么文科专业推荐",
    host: "Joel",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '北京大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大还是华工",
    host: "admin",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '广东工业大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大还是华工",
    host: "admin",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '广东工业大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "689分能不能上北大",
    host: "haskell",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '31', img: 'https://static-data.eol.cn/upload/logo/31.jpg', name: '北京大学' },
    region: '广州',
    tags: ['理科', '分数线'],
    viewCount: 1231,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大有什么文科专业推荐",
    host: "Joel",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '北京大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大还是华工",
    host: "admin",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '广东工业大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大还是华工",
    host: "admin",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '广东工业大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "689分能不能上北大",
    host: "haskell",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '31', img: 'https://static-data.eol.cn/upload/logo/31.jpg', name: '北京大学' },
    region: '广州',
    tags: ['理科', '分数线'],
    viewCount: 1231,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大有什么文科专业推荐",
    host: "Joel",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '北京大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
  {
    id: 125,
    title: "中大还是华工",
    host: "admin",
    category: "提问",
    contents: ["1", "2", "3", "4"],
    relatedInstitute: { id: '104', img: 'https://static-data.eol.cn/upload/logo/104.jpg', name: '广东工业大学' },
    region: '广州',
    tags: ['文科', '分数线'],
    viewCount: 1124,
    createdAt: Date.now(),
    lastUpdated: Date.now() - Math.ceil(Math.random()*1000*60*60*24*2)
  },
]

const TopicDemo = (props) => {
  useEffect(() => {
    document.title = `话题 - ${constants.title.forum} - ${constants.appName}`
  }, [])

}

const ListDemo = (props) => {
  const history = useHistory();

  const topicPerPage = props.topicPerPage || 12

  useEffect(() => {
    document.title = `${constants.title.forum} - ${constants.appName}`
  }, [])

  const HotTopicCard = (props) => {
    const topic = props.topic

    return (
      <Card border='dark' text="dark">
        <Card.Body>
          <Card.Title>{topic.title}</Card.Title>
          <Card.Text>
            {topic.contents[0]}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{topic.viewCount}点击，{topic.contents.length - 1}回复</small>
          <br />
          {
            topic.tags.map((tag, idx) => (<Badge className="mr-1" variant={['primary', 'secondary', 'success', 'danger', 'dark'][idx % 5]}>{tag}</Badge>))
          }
        </Card.Footer>
      </Card>
    )
  }

  const TopicTabs = (props) => {
    const [key, setKey] = useState('topics')

    const TopicTab = (props) => {
      return (
        <>
          <ListGroup variant="flush">
            {demoTopics.map((topic) => {
              return (
                <ListGroup.Item action>
                  <Row>
                    <Col xs="auto" style={{ textAlign: "center" }}>
                      <small>{topic.category}</small>
                    </Col>
                    <Col className="">
                      <Row>
                        <Col className="">
                          <a><b>{topic.title}</b></a>
                        </Col>
                        <Col xs="auto">
                          <Row>
                            <Col>
                              <small>
                                <SVG variant="mic" />
                                <span className="ml-1">
                                  <a><b>{topic.host}</b></a>
                                </span>
                              </small>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {
                            (topic.relatedInstitute) ? (
                              <Badge variant="primary" className="mr-1">
                                {topic.relatedInstitute.name}
                              </Badge>
                            ) : (<></>)
                          }
                          {
                            (topic.region) ? (
                              <Badge variant="success" className="mr-1">
                                {topic.region}
                              </Badge>
                            ) : (<></>)
                          }
                          <small>
                            <span className="mr-1">{topic.viewCount}次浏览</span>
                            <span className="mr-1">{topic.contents.length}条回复</span>
                            <span className="mr-1">最后回复于 {timeStringConverter(topic.lastUpdated)}</span>
                          </small>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>

        </>
      )
    }

    const ReplyTab = (props) => {
      return (
        <>

        </>
      )
    }

    const [currentPage, setCurrentPage] = useState(1)

    return (
      <>
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <FormControl
                placeholder="关键字…"
                aria-label="keyword"
                aria-describedby="keyword"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">搜索</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
          <Col xs="auto">
            <ButtonGroup>
              <Button variant="success">发起新讨论</Button>
              <DropdownButton as={ButtonGroup} variant="success" id="bg-nested-dropdown">
                <Dropdown.Item eventKey="1">Dropdown link</Dropdown.Item>
                <Dropdown.Item eventKey="2">Dropdown link</Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          </Col>
        </Row>
        <Tab.Container defaultActiveKey="topics" activeKey={key} onSelect={(k) => setKey(k)}>
          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="topics">讨论</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="replies">互动</Nav.Link>
                </Nav.Item>
                <Nav.Item className="ml-auto">
                  <FormControl as="select" size="sm">
                    <option>最后回复</option>
                    <option>发布时间</option>
                    <option>地区</option>
                    <option>相关院校</option>
                  </FormControl>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Tab.Content>
              <Tab.Pane eventKey="topics">
                <TopicTab />
              </Tab.Pane>
              <Tab.Pane eventKey="replies">
                <ReplyTab />
              </Tab.Pane>
            </Tab.Content>
          </Card>
        </Tab.Container>
        <br />
        <Row>
          <Col xs="auto">
            {makePagination(currentPage, setCurrentPage, 10, 4)}
          </Col>
          <Col>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Control>
          </Col>
        </Row>
      </>
    )
  }

  const Filter = (props) => {
    return (
      <>
        <ListGroup>
          <ListGroup.Item>
            关键字
          </ListGroup.Item>
          <ListGroup.Item>
            相关院校
          </ListGroup.Item>
          <ListGroup.Item>
            地区
          </ListGroup.Item>
        </ListGroup>
      </>
    )
  }


  return (
    <>
      <div className="container d-none d-md-block">
        <h5>热门话题</h5>
        <CardGroup>
          {demoTopics.slice(0, 3).map((topic) => {
            return (
              <HotTopicCard topic={topic} />
            )
          })}
        </CardGroup>
        <br />
      </div>
      <div className="container">
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <TopicTabs />
          </Col>
          <Col md={4} className="d-none d-md-block">
            <div>
              <h5>筛选</h5>
              <Filter />
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}



const ForumPage = (props) => {
  useEffect(() => {
    document.title = `${constants.title.forum} - ${constants.appName}`
  }, [])

  return (
    <>
      <Router>
        <Switch>
          <Route path={`/forum/demo`} exact={true}>
            <ListDemo />
          </Route>
          <Route path={`/forum/:id`} exact={true}>
            <TopicDemo />
          </Route>
        </Switch>
      </Router>
    </>
  )

}

export default ForumPage;