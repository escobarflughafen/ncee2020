import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup, Modal } from 'react-bootstrap'
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
import { PostImage, imageStyle } from './post'
import * as Yup from 'yup'
import { Formik } from 'formik'

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
                    <SVG variant="person" fill className="align-text-bottom"/>
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
              <Badge variant={(topic.closed?.status) ? 'danger' : 'success'} className="mr-1">
                {(topic.closed?.status) ? '?????????' : '?????????'}
              </Badge>
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
                    <Badge variant="info" className="mr-1">
                      {constants.regions.find(r => r.region_id === topic.region).region_name}
                    </Badge>
                  </>
                ) : (<></>)
              }
            </Col>
          </Row>
          <Row className={(viewMode === '??????') ? "d-none" : ""}>
            <Col>
              <small className="text-muted">
                <span className="mr-1 d-inline-block">{topic.viewCount}????????????</span>
                <span className="mr-1 d-inline-block">{topic.posts.length}????????????</span>
                <span className="mr-1 d-inline-block">????????? {timeStringConverter(topic.createdAt)}???</span>
                <span className="mr-1 d-inline-block">??????????????? {timeStringConverter(topic.lastUpdated)}</span>
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
  const [viewMode, setViewMode] = useState(props.viewMode || '??????')
  const [showClosed, setShowClosed] = useState(props.showClosed || '????????????')
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
                <Col className="d-none d-md-block">
                  <small className="d-inline text-muted">
                    {
                      (displayTopics.length > 0) ? (
                        <>
                          ??? {displayTopics.length} ??????????????? {(currentPage - 1) * topicPerPage + 1}~{(currentPage * topicPerPage) > displayTopics.length ? displayTopics.length : currentPage * topicPerPage} ???
                    </>
                      ) : (<>?????????????????????????????????</>)
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
                        <option>??????</option>
                        <option>??????</option>
                      </FormControl>
                    </Col>
                  </Row>
                </Col>
                <Col xs="auto">
                  <Row>
                    <SVG variant="check-square" />
                    <Col className="pl-2">
                      <FormControl
                        as="select"
                        size="sm"
                        onChange={e => {
                          switch (e.target.value) {
                            case '?????????':
                              return setDisplayTopics([...topics.filter((t) => !t.closed?.status)])
                            case '?????????':
                              return setDisplayTopics([...topics.filter((t) => t.closed?.status)])
                            case '????????????':
                            default:
                              return setDisplayTopics([...topics])
                          }
                        }}>
                        <option>????????????</option>
                        <option>?????????</option>
                        <option>?????????</option>
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
                        <option value={0}>????????????</option>
                        <option value={1}>????????????</option>
                        <option value={2}>????????????</option>
                        <option value={3}>??????</option>
                        <option value={4}>????????????</option>
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
      return setMsg({ type: 'warning', text: '?????????????????????????????????' })
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
        setMsg({ type: 'warning', text: '??????????????????????????????' })
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg({ type: '', text: '' })

    const token = window.localStorage.getItem('token')
    const auth = (token) ? `bearer ${token}` : null
    if (!auth) {
      return setMsg({ type: 'danger', text: '????????????????????????????????????' })
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
                      <InputGroup.Text>??????</InputGroup.Text>
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
                      <InputGroup.Text>??????</InputGroup.Text>
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
                    placeholder="??????"
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
                      <InputGroup.Text>??????</InputGroup.Text>
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
                        caption="????????????"
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
                    label={`????????????(${photos.length})`}
                    size="sm"
                    onChange={handlePhotos}
                    custom
                    disabled={reachedPhotoCountLimit}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="success" type="submit">??????</Button>
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
          <Alert variant="info"><Alert.Link href="/login">??????</Alert.Link>????????????????????????</Alert>
        )}
      </div>
    </>
  )
}


const TopicCloseModal = (props) => {
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const topic = props.topic
  const history = useHistory()

  const closeTopicSchema = Yup.object().shape({
    title: Yup.string()
      .equals([topic.title], "?????????????????????????????????"),
    reason: Yup.string()
      .max(10000, '???????????????10000?????????')
      .required('?????????????????????????????????')
  })



  const handleSubmit = async (body) => {
    console.log(body)
    const url = `http://${document.domain}:${constants.serverPort}/topic/close`
    const token = window.localStorage.getItem('token')
    if (!token) {
      return setMsg({ type: 'danger', text: '???????????????' })
    }
    const auth = `bearer ${token}`
    try {
      const res = await axios.post(url, { ...body, id: topic._id }, { headers: { auth } })
      console.log(res)
      setMsg({ type: 'success', text: res.data.msg || '???????????????' })
      setTimeout(() => { history.go() }, 1000)
    } catch (err) {
      console.log(err.response)
      setMsg({ type: 'danger', text: err.response?.data.msg || '????????????????????????' })
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          ????????????
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MsgAlert msg={msg} />
        <Formik
          onSubmit={handleSubmit}
          validationSchema={closeTopicSchema}
          initialValues={
            {
              title: "",
              reason: ""
            }
          }
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
          }) => {
            return (
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                  <InputGroup size="sm" hasValidation>
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        ????????????
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      as="input"
                      name="title"
                      placeholder={props.topic.title}
                      value={values.title}
                      onChange={handleChange}
                      isValid={touched.title && !errors.title}
                      isInvalid={!!errors.title}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.title}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
                <Form.Group>
                  <InputGroup size="sm" hasValidation>
                    <InputGroup.Prepend>
                      <InputGroup.Text>??????</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      as="textarea"
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      isValid={touched.reason && !errors.reason}
                      isInvalid={!!errors.reason}
                    />
                  </InputGroup>
                  <Form.Control.Feedback type="Invalid">
                    <small className="text-danger">
                      {errors.reason}
                    </small>
                  </Form.Control.Feedback>
                </Form.Group>
                <Row>
                  <Col>
                  </Col>
                  <Col xs="auto">
                    <Button type="submit" variant="danger">??????</Button>
                  </Col>
                </Row>
              </Form>
            )
          }
          }
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

const TopicCloseButton = (props) => {

  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <Button {...props} onClick={
        () => { setModalShow(true) }
      }>
        <strong>
          {props.children || '????????????'}
        </strong>
      </Button>

      <TopicCloseModal
        show={modalShow}
        onHide={() => { setModalShow(false) }}
        topic={props.topic}
      />
    </>
  )
}


export { TopicCard, TopicList, NewTopicForm, TopicCloseModal, TopicCloseButton };
