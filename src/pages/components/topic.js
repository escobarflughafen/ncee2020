import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup } from 'react-bootstrap'
import { Tabs, Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import constants from '../../utils/constants'
import { timeStringConverter } from '../../utils/util'
import SVG from '../../utils/svg'
import axios from 'axios'
import { makePaginations } from './pagination'
import { UserLink } from './user'
import { MsgAlert } from './msg'
import { InstituteSelector } from './institute'

const TopicCard = (props) => {
  const history = useHistory()

  const topic = props.topic
  const viewMode = props.viewMode
  return (
    <ListGroup.Item
      action
      onClick={(e) => {
        history.push(`/forum/${topic._id}`);
        history.go()
      }}
    >
      <Row>
        <Col xs="auto" style={{ textAlign: "center" }}>
          <small>{constants.topicTypes.find(t => topic.category === t.id).name}</small>
        </Col>
        <Col>
          <Row>
            <Col className="">
              <a className=""><b>{topic.title}</b></a>
            </Col>
            <Col xs="auto">
              <Row>
                <Col>
                  <small>
                    <SVG variant="person" fill />
                    <span className="ml-1">
                      <UserLink user={topic.host}>{topic.host.name}</UserLink>
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
                  <>
                    <Badge
                      variant="primary"
                      className="mr-1"
                    >
                      {topic.relatedInstitute.data.name}
                    </Badge>
                  </>
                ) : (<></>)
              }
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
          </Row>
          <Row className={(viewMode === '紧凑') ? "d-none" : ""}>
            <Col>
              <small className="text-black-50">
                <span className="mr-1 d-inline-block">{topic.viewCount}次浏览・</span>
                <span className="mr-1 d-inline-block">{topic.posts.length}条回复・</span>
                <span className="mr-1 d-inline-block">创建于 {timeStringConverter(topic.createdAt)}・</span>
                <span className="mr-1 d-inline-block">最后回复于 {timeStringConverter(topic.lastUpdated)}</span>
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const TopicList = (props) => {
  const topics = props.topics
  const [viewMode, setViewMode] = useState(props.viewMode || '详细')
  const topicPerPage = props.topicPerPage || 12
  const [currentPage, setCurrentPage] = useState(1)
  const [displayTopics, setDisplayTopics] = useState([])

  useEffect(() => {
    if (topics) {
      setDisplayTopics([...topics])
    }
  }, [topics])

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row className="ml-auto">
            <Col>
              <small className="d-none d-sm-inline text-black-50">
                {
                  (displayTopics.length > 0) ? (
                    <>
                      共 {displayTopics.length} 条讨论，第 {(currentPage - 1) * topicPerPage + 1}~{(currentPage * topicPerPage) > displayTopics.length ? displayTopics.length : currentPage * topicPerPage} 项
                    </>
                  ) : (<>未能找到符合条件的讨论</>)
                }
              </small>
            </Col>
            <Col xs="auto">
              <Row>
                <SVG variant="column-gap" />
                <Col className="pl-2">
                  <FormControl
                    as="select"
                    size="sm"
                    value={viewMode}
                    onChange={e => { setViewMode(e.target.value) }}>
                    <option>详细</option>
                    <option>紧凑</option>
                  </FormControl>
                </Col>
              </Row>

            </Col>
            <Col xs="auto">
              <Row>
                <SVG variant="sort" />
                <Col className="pl-2">
                  <FormControl
                    as="select"
                    size="sm"
                    onChange={(e) => {
                      switch (e.target.value) {
                        case '0':
                          setDisplayTopics([...topics.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))])
                          break;
                        case '1':
                          setDisplayTopics([...topics.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))])
                          break;
                        case '2':
                          setDisplayTopics([...topics.sort((a, b) => b.posts.length - a.posts.length)])
                          break;
                        case '3':
                          setDisplayTopics([...topics.sort((a, b) => {
                            if (a.region) {
                              if (b.region) {
                                return a.region.localeCompare(b.region)
                              } else {
                                return -1
                              }
                            } else {
                              return 1
                            }
                          })])
                          break;
                        case '4':
                          setDisplayTopics([...topics.sort((a, b) => {
                            if (a.relatedInstitute) {
                              if(b.relatedInstitute) {
                                return a.relatedInstitute.data.school_id - b.relatedInstitute.data.school_id
                              } else {
                                return -1
                              }
                            } else {
                              return 1
                            }
                          })])
                        default:
                          return
                      }
                    }}
                  >
                    <option value={0}>最后回复</option>
                    <option value={1}>最新发起</option>
                    <option value={2}>回复数量</option>
                    <option value={3}>地区</option>
                    <option value={4}>相关院校</option>
                  </FormControl>
                </Col>
              </Row>
            </Col>
          </Row>
        </ListGroup.Item>
        {displayTopics.slice((currentPage - 1) * topicPerPage, (currentPage) * topicPerPage).map((topic) => {
          return (
            <TopicCard topic={topic} viewMode={viewMode} />
          )
        })}
        <ListGroup.Item>
          {makePaginations(currentPage, setCurrentPage, Math.ceil(topics.length / topicPerPage), 4)}
        </ListGroup.Item>
      </ListGroup>

    </>
  )
}


const NewTopicForm = (props) => {
  const [title, setTitle] = useState()
  const [category, setCategory] = useState(0)
  const [relatedInstitute, setRelatedInstitute] = useState(props.relatedInstitute)
  const [region, setRegion] = useState()
  const [tags, setTags] = useState()
  const [content, setContent] = useState()
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const token = (window.localStorage.getItem('token')) ? `bearer ${window.localStorage.getItem('token')}` : null
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg({ type: '', text: '' })
    const url = `http://${document.domain}:${constants.serverPort}/forum/newtopic`
    const token = window.localStorage.getItem('token')
    const auth = (token) ? `bearer ${token}` : null
    const body = {
      title: title,
      category: category,
      content: content,
      relatedInstitute: relatedInstitute,
      region: region,
      tags: tags,
    }
    try {
      const res = await axios.post(url, body, { headers: { auth } })
      console.log(res)
      setMsg({
        type: 'success',
        text: res.data.msg
      })
      setTimeout(() => {
        history.push(`/forum/${res.data.topic._id}`)
        history.go()
      }, 1000)
    } catch (err) {
      console.log(err.response)
      setMsg({
        type: 'danger',
        text: (err.response.data) ? err.response.data.msg : ''
      })
    }
  }

  return (
    <>
      <div className={props.className}>
        {token ? (
          <>
            <MsgAlert msg={msg} />
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Col>
                  <InputGroup className="mb-3" size="sm">
                    <InputGroup.Prepend>
                      <InputGroup.Text>标题</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      aria-label="title"
                      aria-describedby="basic-addon1"
                      required
                      value={title}
                      onChange={(e) => { setTitle(e.target.value) }}
                    />
                  </InputGroup>
                </Col>
                <Col xs="auto">
                  <InputGroup className="mb-3" size="sm">
                    <InputGroup.Prepend>
                      <InputGroup.Text>类型</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                      as="select"
                      value={category}
                      onChange={(e) => { setCategory(e.target.value) }}
                    >
                      {
                        constants.topicTypes.map((type) => (
                          <option value={type.id}>{type.name}</option>
                        ))
                      }
                    </FormControl>
                  </InputGroup>
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    as="textarea"
                    placeholder="内容"
                    rows={3}
                    required
                    id="topiccontent"
                    value={content}
                    onChange={(e) => { setContent(e.target.value) }}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row className="mb-3">
                <Col>
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <InputGroup.Text>地区</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      as="select"
                      value={region}
                      onChange={(e) => { setRegion(e.target.value) }}
                    >
                      <option value={false}>...</option>
                      {
                        constants.regions.map((region) => (<option value={region.region_id}>{region.region_name}</option>))
                      }
                    </Form.Control>
                  </InputGroup>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="outline-dark"
                    size="sm"
                  >上传图片</Button>
                </Col>
              </Form.Row>
              <Form.Row controlId="replyTo">
                <Col>
                  {
                    (props.relatedInstitute) ? null : (
                      <InstituteSelector
                        size="sm"
                        caption="相关院校"
                        onSelect={(i) => {
                          if (i) {
                            setRelatedInstitute(i._id)
                          } else {
                            setRelatedInstitute(null)
                          }
                        }
                        }
                      />
                    )
                  }
                </Col>
                <Col xs="auto">
                  <Button variant="success" type="submit" size="sm">发布</Button>
                </Col>
              </Form.Row>
            </Form>
          </>
        ) : (
          <Alert variant="info"><Alert.Link href="/login">登入</Alert.Link>后可以发起新讨论</Alert>
        )}
      </div>
    </>
  )
}

export { TopicCard, TopicList, NewTopicForm };
