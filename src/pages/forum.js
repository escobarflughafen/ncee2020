import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import React, { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Modal, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import { makePaginations } from './components/pagination'
import { timeStringConverter } from '../utils/util'
import { TopicCard, TopicList } from './components/topic'
import { PostCard } from './components/post'
import axios from 'axios'


//requests


const demoContents = [
  {
    id: 1,
    author: 'jack',
    content: 'lorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    id: 1,
    author: 'jack',
    content: 'lorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    id: 1,
    author: 'jack',
    content: 'lorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem ipslorem ipsum dolorlorem ipsum dolorum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem iplorem ipsum dolorlorem ipsum dolorsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorelorem ipsum dolorlorem ipsum dolorlorem ipsum dolorm ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem ipsum dolorlorem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorelorem ipsum dolorlorem ipsum dolorm ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'lorem ipsum dollorem ipsum doloror',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
  {
    author: 'jack',
    content: 'llorem ipsum dolorlorem ipsum dolorlorem ipsum dolorlorem ipsum dolororem ipsum dolor',
    relatedInstitute: 104,
    relatedTopic: 123,
    region: '44',
    viewCount: 1234,
    createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  },
]

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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
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
    lastUpdated: Date.now() - Math.ceil(Math.random() * 1000 * 60 * 60 * 24 * 2)
  },
]


const ListPage = (props) => {
  const history = useHistory();

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

    const ReplyTab = (props) => {
      return (
        <>

        </>
      )
    }

    const NewTopicModal = (props) => {

      return (
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              发起新讨论
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text>标题</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="title"
                      aria-describedby="basic-addon1"
                      required
                    />
                  </InputGroup>
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="content">
                  <Form.Control
                    as="textarea"
                    placeholder="内容"
                    rows={3}
                    required
                    id="topiccontent"
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Col>
                <div style={{ textAlign: "right" }}>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    >上传图片</Button>
                </div>
                </Col>
              </Form.Row>
              <Form.Row controlId="replyTo">
                <Col>
                  <Form.Label>相关学校</Form.Label>
                  <Form.Control as="input" size="sm" />
                </Col>
                <Col>
                  <Form.Label>地区</Form.Label>
                  <Form.Control as="select" size="sm">
                    <option value={false}>...</option>
                    {
                      constants.regions.map((region) => (<option value={region.region_id}>{region.region_name}</option>))
                    }
                  </Form.Control>
                </Col>
                <Col xs="auto">
                  <Form.Group>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button variant="success">发布</Button>
              <Button variant="secondary" onClick={props.onHide}>取消</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      )
    }

    const [newTopicModalShow, setNewTopicModalShow] = useState(false)

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
              {
                // TODO: create compose post view by react-bootstrap.Modal
              }
              <Button
                variant="outline-success"
                onClick={() => setNewTopicModalShow(true)}>发起新讨论</Button>
              <NewTopicModal
                show={newTopicModalShow}
                onHide={() => setNewTopicModalShow(false)}
              />
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
              </Nav>
            </Card.Header>
            <Tab.Content>
              <Tab.Pane eventKey="topics">
                <TopicList topics={demoTopics} />
              </Tab.Pane>
              <Tab.Pane eventKey="replies">
                <ReplyTab />
              </Tab.Pane>
            </Tab.Content>
          </Card>
        </Tab.Container>
        <br />
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


const TopicPage = (props) => {
  const history = useHistory()
  const id = useParams().id

  const postPerPage = props.postPerPage || 12

  // demo
  const topic = demoTopics.find((t) => t.id == parseInt(id))
  const contents = demoContents

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    document.title = `${topic.title} - ${constants.title.forum} - ${constants.appName}`
  }, [])


  const [replyTo, setReplyTo] = useState(-1)

  return (
    <>
      <div className="container">
        <Row className="mb-3">
          <Col>
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => {
                history.goBack();
              }}
            >←返回</Button>
          </Col>
          <Col className="mb-0" xs="auto">
            <Button
              variant="info"
              size="sm"
              href="#replytextarea"
            >
              回复
            </Button>
          </Col>
        </Row>
        <Card>
          <Card.Header>
            <Row>
              <Col xs="auto">
                <small>{topic.category}</small>
              </Col>
              <Col>
                <b>{topic.title}</b>
              </Col>
            </Row>
          </Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col xs={12} sm="auto" className="mr-sm-auto">
                  {
                    (topic.relatedInstitute) ? (
                      <>
                        <Badge
                          variant="primary"
                          className="mr-1"
                        >
                          {topic.relatedInstitute.name}
                        </Badge>
                      </>
                    ) : (<></>)
                  }
                  {
                    (topic.region) ? (
                      <>
                        <Badge variant="success" className="mr-1">
                          {topic.region}
                        </Badge>
                      </>
                    ) : (<></>)
                  }
                </Col>
                <Col sm="auto">
                  <small>
                    <span className="d-inline-block">由 <a href={`/user/${topic.host}`}><b>{topic.host}</b></a> 在 {new Date(topic.createdAt).toLocaleDateString('zh')} 发起</span>
                    ・
                    <span className="d-inline-block">{topic.contents.length} 条回复</span>
                    ・
                    <span className="d-inline-block">{topic.viewCount} 次浏览</span>
                  </small>
                </Col>
              </Row>
            </ListGroup.Item>
            {contents.slice((currentPage - 1) * postPerPage, currentPage * postPerPage).map(
              (post, idx) => {
                return (<PostCard
                  post={post}
                  index={(currentPage - 1) * postPerPage + idx + 1}
                  host={post.author === topic.host}
                  setReplyTo={setReplyTo}
                  expanded={false}
                />)
              }
            )}
            <ListGroup.Item>
              {makePaginations(currentPage, setCurrentPage, Math.ceil(contents.length / postPerPage), 4)}
            </ListGroup.Item>
            {
              //  reply use popup(modal) 
            }
            <ListGroup.Item id="replyform">
              <Form>
                <Form.Row>
                  <Form.Group as={Col} controlId="content">
                    <Form.Label>留言</Form.Label>
                    <Form.Control as="textarea" placeholder="..." rows={3} id="replytextarea" />
                  </Form.Group>
                </Form.Row>

                <Form.Group as={Row} controlId="replyTo">
                  <Form.Label column xs="auto">回复</Form.Label>
                  <Col>
                    <Form.Control
                      as="select"
                      defaultValue={replyTo}
                      onChange={(e) => { setReplyTo(e.target.value) }}
                    >
                      <option value={-1}>...</option>
                      {contents.map((post, idx) => {
                        return (
                          <option value={post.id}>{idx + 1} - {post.content}</option>
                        )
                      })}
                    </Form.Control>
                  </Col>

                  <Col xs="auto">
                    <ButtonGroup aria-label="reply" >
                      <Button variant="outline-dark">添加图片</Button>
                      <Button variant="primary" type="submit">
                        发布
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Form.Group>

              </Form>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </>
  )
}

const ForumPage = (props) => {

  return (
    <>
      <div className="mb-3">
        <Router>
          <Switch>
            <Route path={`/forum/`} exact={true}>
              <ListPage />
            </Route>
            <Route path={`/forum/:id`} exact={true}>
              <TopicPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  )

}

export default ForumPage;