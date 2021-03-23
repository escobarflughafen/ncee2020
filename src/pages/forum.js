import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import React, { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, ToggleButton, Modal, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import { makePaginations } from './components/pagination'
import { timeStringConverter } from '../utils/util'
import { TopicCard, TopicList, NewTopicForm } from './components/topic'
import { InstituteCard } from './components/institute'
import { PostCard, NewPostForm } from './components/post'
import axios from 'axios'


const ListPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    document.title = `${constants.title.forum} - ${constants.appName}`
  }, [])

  const TopicTabs = (props) => {
    const [topics, setTopics] = useState([])

    useEffect(() => {
      const url = `http://${document.domain}:${constants.serverPort}/forum/fetch`
      axios.post(url).then((res) => {
        console.log(res)
        setTopics(res.data.topics)
      })
    }, [])

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
            <NewTopicForm />
          </Modal.Body>
          <Modal.Footer>
            <ButtonGroup>
              <Button variant="secondary" onClick={props.onHide}>取消</Button>
            </ButtonGroup>
          </Modal.Footer>
        </Modal>
      )
    }

    const [newTopicModalShow, setNewTopicModalShow] = useState(false)
    const { url, path, params } = useRouteMatch()
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
        <Card>
          <Router>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <NavLink to={`${url}`} exact={true} className="nav-link" activeClassName="active">讨论</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={`${url}/filter`} className="nav-link" activeClassName="active">筛选</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={`${url}/reply`} className="nav-link" activeClassName="active">互动</NavLink>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Switch>
              <Route path={`${url}`} exact={true}>
                <TopicList topics={topics} />
              </Route>
              <Route path={`${url}/filter`}>
                <Card.Body>
                  <Form.Group>
                    <InputGroup size="sm">
                      <FormControl
                        placeholder="关键字…"
                        aria-label="keyword"
                        aria-describedby="keyword"
                      />
                      <InputGroup.Append>
                        <InputGroup.Text>合取</InputGroup.Text>
                        <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                      </InputGroup.Append>
                      <InputGroup.Append>
                        <Button variant="outline-success">添加</Button>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Row>
                      <Col>
                        <Form.Control size="sm" as="select">
                          <option>Small select</option>
                        </Form.Control>
                      </Col>
                      <Col>
                        <Form.Control size="sm" as="select">
                          <option>Small select</option>
                        </Form.Control>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Row>
                    <Col>
                      12312
                    <hr className="my-1" />
                    </Col>
                  </Form.Row>
                </Card.Body>
              </Route>
              <Route path={`${url}/reply`}>
                replies
              </Route>
            </Switch>
          </Router>
        </Card>
        <br />
      </>
    )
  }

  return (
    <>
      <div className="container">
        <Row>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            <TopicTabs />
          </Col>
        </Row>
      </div>
    </>
  )
}


const TopicPage = (props) => {
  const history = useHistory()
  const [id, setId] = useState(useParams().id)

  const postPerPage = props.postPerPage || 12

  // demo
  const [topic, setTopic] = useState()

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/forum/${id}/fetch`
    axios.post(url).then((res) => {
      console.log(res)
      document.title = `${res.data.topic.title} - ${constants.title.forum} - ${constants.appName}`
      setTopic(res.data.topic)
    })
  }, [])

  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/forum/${id}/fetch`
    axios.post(url).then((res) => {
      console.log(res)
      document.title = `${res.data.topic.title} - ${constants.title.forum} - ${constants.appName}`
      setTopic(res.data.topic)
    })
  }, [id])

  return (
    <>
      {(topic) ? (<>
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
                  <small>{constants.topicTypes.find(t => t.id === topic.category).name}</small>
                </Col>
                <Col>
                  <b>{topic.title}</b>
                </Col>
              </Row>
            </Card.Header>
            <ListGroup variant="flush">
              {
                (topic.relatedInstitute) ? (
                  <InstituteCard institute={topic.relatedInstitute} />
                ) : (<></>)
              }
              <ListGroup.Item>
                <Row>
                  <Col xs={12} sm="auto" className="mr-sm-auto">
                    {
                      (topic.region) ? (
                        <>
                          <Badge variant="success" className="mr-1">
                            {constants.regions.find(r => r.region_id === topic.region).region_name}
                          </Badge>
                        </>
                      ) : (<></>)
                    }
                  </Col>
                  <Col sm="auto">
                    <small>
                      <span className="d-inline-block">由 <a href={`/user/${topic.host.username}`}><b>{topic.host.name}</b></a> 在 {new Date(topic.createdAt).toLocaleDateString('zh')} 发起</span>
                    ・
                    <span className="d-inline-block">{topic.posts.length} 条回复</span>
                    ・
                    <span className="d-inline-block">{topic.viewCount} 次浏览</span>
                    </small>
                  </Col>
                </Row>
              </ListGroup.Item>
              {topic.posts.slice((currentPage - 1) * postPerPage, currentPage * postPerPage).map(
                (post, idx) => {
                  return (<PostCard
                    post={post}
                    index={(currentPage - 1) * postPerPage + idx + 1}
                    host={post.author.id === topic.host.id}
                    expanded={false}
                  />)
                }
              )}
              <ListGroup.Item>
                {makePaginations(currentPage, setCurrentPage, Math.ceil(topic.posts.length / postPerPage), 4)}
              </ListGroup.Item>
              <ListGroup.Item id="replyform">
                <NewPostForm relatedTopic={topic._id} />
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      </>
      ) : null}
    </>
  )
}

const ForumPage = (props) => {

  return (
    <>
      <div className="mb-3">
        <Router>
          <Switch>
            <Route path={`/forum/home`}>
              <ListPage />
            </Route>
            <Route path={`/forum/`} exact={true}>
              <Redirect to={`/forum/home`} />
            </Route>
            <Route path={`/forum/:id`} >
              <TopicPage />
            </Route>
          </Switch>
        </Router>
      </div>
    </>
  )

}

export default ForumPage;