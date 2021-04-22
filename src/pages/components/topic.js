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
import {PostImage, imageStyle} from './post'

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
              <a className=""><strong>{topic.title}</strong></a>
            </Col>
            <Col xs="auto">
              <Row>
                <Col>
                  <small>
                    <SVG variant="person" fill />
                    <span className="ml-1">
                      <UserLink user={topic.host}>{topic.host.name || `@${topic.host.username}`}</UserLink>
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
              <small className="text-muted">
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
        {
          (props.trends) ? null : (
            <ListGroup.Item>
              <Row className="ml-auto">
                <Col>
                  <small className="d-none d-sm-inline text-muted">
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
                                  if (b.relatedInstitute) {
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
          )
        }
        {displayTopics.slice((currentPage - 1) * topicPerPage, (currentPage) * topicPerPage).map((topic) => {
          return (
            <TopicCard topic={topic} viewMode={viewMode} />
          )
        })}
        {
          (props.trends) ? null : (
            <ListGroup.Item>
              {makePaginations(currentPage, setCurrentPage, Math.ceil(topics.length / topicPerPage), 4)}
            </ListGroup.Item>
          )
        }
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


  const [photos, setPhotos] = useState([])
  const [photoPreviews, setPhotoPreviews] = useState([])
  const maxPhotoCount = 4
  const [reachedPhotoCountLimit, setReachedPhotoCountLimit] = useState(false)

  const handlePhotos = async (e) => {
    e.preventDefault()
    setMsg({ type: '', text: '' })

    if (photos.length >= maxPhotoCount) {
      return setMsg({ type: 'warning', text: '已达到图片上传张数限制' })
    }

    if (e.target.files) {
      var reader = new FileReader()
      var photo = e.target.files[0]

      if (photo.type.includes('image')) {
        reader.onloadend = () => {
          console.log('result', reader.result)
          if (photos.length == 3) {
            setReachedPhotoCountLimit(true)
          }
          setPhotoPreviews([...photoPreviews, reader.result])
          setPhotos([...photos, photo])
        }

        reader.readAsDataURL(photo)
      } else {
        setMsg({ type: 'warning', text: '格式有误，请上传图片' })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg({ type: '', text: '' })

    const token = window.localStorage.getItem('token')
    const auth = (token) ? `bearer ${token}` : null
    if (!auth) {
      return setMsg({ type: 'danger', text: '登入信息失效，请重新登入' })
    }

    var uploadedPhotos = []
    if (photos.length) {
      const uploadURL = `http://${document.domain}:${constants.serverPort}/image/upload`
      let formData = new FormData()
      photos.forEach((photoFile) => formData.append('images', photoFile))

      try {
        const res = await axios.post(uploadURL, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(res.data)
        uploadedPhotos = [...res.data.path]
      } catch (err) {
        console.log(err)
        setMsg({ type: 'danger', text: 'failed to upload photos' })
      }
    }

    const url = `http://${document.domain}:${constants.serverPort}/topic/`
    const body = {
      title: title,
      category: category,
      content: content,
      relatedInstitute: relatedInstitute,
      region: region,
      tags: tags,
      photos: uploadedPhotos,
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
              <Form.Row>
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
              </Form.Row>
              <Form.Row controlId="replyTo">
                <Col>
                  <Form.File
                    id="photos"
                    name="photos"
                    label={`添加图片(${photos.length})`}
                    size="sm"
                    onChange={handlePhotos}
                    custom
                    disabled={reachedPhotoCountLimit}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="success" type="submit">发布</Button>
                </Col>
              </Form.Row>
              <Form.Row className="mt-2">
                {
                  photoPreviews.map((photo, idx) => {
                    return (
                      <Col xs={6} lg={3} className="p-1">
                        <div style={{
                          backgroundImage: `url(${photo})`,
                          ...imageStyle
                        }}
                          className="img-thumbnail d-block"
                          onClick={() => {
                            setPhotos([...photos.filter((p, i) => i != idx)])
                            setPhotoPreviews([...photoPreviews.filter((p, i) => i != idx)])
                            setReachedPhotoCountLimit(false)
                          }}
                        ></div>
                      </Col>
                    )
                  })
                }
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
