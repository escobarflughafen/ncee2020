import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import React, { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, ToggleButton, Modal, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup, ListGroupItem } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import { makePaginations } from './components/pagination'
import { timeStringConverter } from '../utils/util'
import { TopicCard, TopicList, NewTopicForm } from './components/topic'
import { InstituteCard, InstituteSelector } from './components/institute'
import { PostCard, NewPostForm } from './components/post'
import { MsgAlert } from './components/msg'
import axios from 'axios'

const fetchTopicService = async (id, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/topic/${id}/`
  const token = window.localStorage.getItem('token')
  const auth = (token) ? `bearer ${token}` : null

  const res = await axios.get(url,  { headers: { auth } })
  return res
}

const ListPage = (props) => {
  const history = useHistory();

  useEffect(() => {
    document.title = `${constants.title.forum} - ${constants.appName}`
  }, [])

  const TopicTabs = (props) => {
    const [topics, setTopics] = useState([])

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

    const [queryTags, setQueryTags] = useState([])

    const [keyword, setKeyword] = useState("")
    const [singleSearchKeyword, setSingleSearchKeyword] = useState("")

    const [msg, setMsg] = useState({
      type: '',
      text: ''
    })

    const handleQuery = async () => {
      console.log(queryTags)
      setMsg({type: 'info', text: '搜索中...'})
      const url = `http://${document.domain}:${constants.serverPort}/topic/fetch`
      try {
        const res = await axios.post(url, {
          queryTags
        })
        setTopics(res.data.topics)
        if (res.data.topics.length == 0) {
          setMsg({ type: 'warning', text: '未能找到符合条件的讨论' })
        } else {
          setMsg({ type: '', text: '' })
        }
      } catch (err) {
        console.log(err.response)
        setMsg({ type: 'danger', text: (err.response)?err.response.data.msg:'未能正确处理请求' })
      }
    }

    const addTag = (category, label, data) => {
      if (!queryTags.find(t => (t.category === category) && (t.label === label))) {
        setQueryTags([
          ...queryTags,
          {
            category,
            label,
            data
          }
        ])
      }
    }

    const addKeyword = (kw) => {
      if (kw != '') {
        addTag('keyword', kw, kw)
      }
    }

    const removeTag = (tag) => {
      setQueryTags(queryTags.filter((t) => !((t.category === tag.category) && (t.label === tag.label))))
    }

    const { url, path, params } = useRouteMatch()

    useEffect(() => {
      const url = `http://${document.domain}:${constants.serverPort}/topic/fetch`
      axios.post(url).then((res) => {
        console.log(res)
        setTopics(res.data.topics)
      })
    }, [])


    const [queryImmediately, setQueryImmediately] = useState(false)

    useEffect(() => {
      if (queryImmediately) {
        setQueryImmediately(false)
        handleQuery()
      }
    }, [queryImmediately])

    useEffect(() => {
      handleQuery()
    }, [queryTags])

    return (
      <>
        <MsgAlert msg={msg} />
        <Row className="mb-3">
          <Col>
            <InputGroup>
              <FormControl
                placeholder="关键字…"
                aria-label="keyword"
                aria-describedby="keyword"
                value={singleSearchKeyword}
                required
                onChange={(e) => { setSingleSearchKeyword(e.target.value) }}
                onKeyPress={(e) => {
                  if (e.code === 'Enter') {
                    if (singleSearchKeyword.length > 0) {
                      setQueryTags([
                        {
                          category: 'keyword',
                          label: singleSearchKeyword,
                          data: singleSearchKeyword
                        }
                      ])
                      setQueryImmediately(true)
                    }
                  }
                }}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    if (singleSearchKeyword.length > 0) {
                      setQueryTags([
                        {
                          category: 'keyword',
                          label: singleSearchKeyword,
                          data: singleSearchKeyword
                        }
                      ])
                      setQueryImmediately(true)
                    }
                  }}
                >搜索</Button>
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
                <Dropdown.Item
                  eventKey="1"
                  onClick={() => {
                    setQueryImmediately(true)
                  }}
                >刷新</Dropdown.Item>
                <Dropdown.Item
                  eventKey="2"
                  onClick={() => {
                    setQueryTags([])
                  }}
                >清空筛选条件</Dropdown.Item>
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
                {
                  /*
                <Nav.Item>
                  <NavLink to={`${url}/reply`} className="nav-link" activeClassName="active">互动</NavLink>
                </Nav.Item>
                  */
                }
              </Nav>
            </Card.Header>
            <Switch>
              <Route path={`${url}`} exact={true}>
                <TopicList topics={topics} />
              </Route>
              <Route path={`${url}/filter`}>
                <Row>
                  <Col xs={12} md={6}>
                    <Card.Body>
                      <Form.Group>
                        <InputGroup size="sm">
                          <FormControl
                            placeholder="关键字…"
                            aria-label="keyword"
                            aria-describedby="keyword"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.code === 'Enter') {
                                addTag('keyword', keyword, keyword)
                                setKeyword('')
                              }
                            }}
                          />
                          <InputGroup.Append>
                            <Button variant="outline-success" onClick={(e) => {
                              if (keyword != '') {
                                addKeyword(keyword)
                                setKeyword('')
                              }
                            }}>添加</Button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <InputGroup size="sm">
                              <InputGroup.Prepend>
                                <InputGroup.Text>类别</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control as="select"
                                onChange={(e) => {
                                  if (e.target.value != -1) {
                                    const value = JSON.parse(e.target.value)
                                    addTag('category', value.name, value.id)
                                  }
                                }}
                              >
                                <option value={-1}>...</option>
                                {
                                  constants.topicTypes.map(t => (
                                    <option value={JSON.stringify(t)}>{t.name}</option>
                                  ))
                                }
                              </Form.Control>
                            </InputGroup>
                          </Col>
                          <Col>
                            <InputGroup size="sm">
                              <InputGroup.Prepend>
                                <InputGroup.Text>地区</InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control as="select"
                                onChange={(e) => {
                                  console.log(e.target.value)
                                  if (e.target.value != -1) {
                                    const value = JSON.parse(e.target.value)
                                    addTag('region', value.region_name, value.region_id)
                                  }
                                }
                                }
                              >
                                <option value={-1}>...</option>
                                {
                                  constants.regions.map(r => (
                                    <option value={JSON.stringify(r)}>{r.region_name}</option>
                                  ))
                                }
                              </Form.Control>
                            </InputGroup>
                          </Col>
                        </Form.Row>
                      </Form.Group>
                      <InstituteSelector
                        multiple
                        size="sm"
                        onSelect={(i) => {
                          if (i) {
                            addTag('institute', `${i.name} [${i.id}]`, i._id)
                          }
                        }}
                        caption="关联院校"
                      />
                    </Card.Body>
                  </Col>
                  <Col xs={12} md={6}>
                    <Card.Body className="pt-0 pt-md-4 pl-md-0">
                      <Form.Row>
                        <Col>
                          {
                            queryTags.map((tag) => {
                              let badgeVariant = {
                                'keyword': 'dark',
                                'category': 'primary',
                                'region': 'success',
                                'institute': 'info'
                              }

                              return (
                                <Badge
                                  className="mr-2"
                                  variant={badgeVariant[tag.category]}
                                  pill
                                  onClick={() => removeTag(tag)}
                                >{tag.label}<SVG variant="x" /></Badge>
                              )
                            })
                          }
                          <hr className="my-3" />
                        </Col>
                      </Form.Row>
                      {
                        /*
                      <Row>
                        <Col>
                          <Button variant="primary" size="sm" onClick={() => {
                            handleQuery()
                          }}>
                            查询
                          </Button>
                        </Col>
                      </Row>
                        */
                      }
                    </Card.Body>
                  </Col>
                </Row>
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
        <TopicTabs />
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
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })


  useEffect(async () => {
    try {
      const res = await fetchTopicService(id)
      console.log(res)
      document.title = `${res.data.topic.title} - ${constants.title.forum} - ${constants.appName}`
      setTopic(res.data.topic)
    } catch (err) {
      console.log(err)
      setMsg({ type: 'danger', text: '未能取得讨论内容' })
    }
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
                  <strong>{topic.title}</strong>
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
                        <small>
                          <SVG variant="location" className="mr-1" />
                          {constants.regions.find(r => r.region_id === topic.region).region_name}
                        </small>
                      ) : (<></>)
                    }
                  </Col>
                  <Col sm="auto">
                    <small>
                      <span className="d-inline-block">由 <a href={`/user/${topic.host.username}`}><strong>{topic.host.name}</strong></a> 在 {new Date(topic.createdAt).toLocaleDateString('zh')} 发起</span>
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
                    host={post.author._id === topic.host._id}
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
  useEffect(() => {
    window.localStorage.removeItem('instituteIndices')
  }, [])

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