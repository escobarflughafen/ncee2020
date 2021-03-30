import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'
import React, { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup, ListGroupItem } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation, useParams } from 'react-router-dom'
import constants from '../../utils/constants'
import SVG from '../../utils/svg'
import { makePaginations } from './pagination'
import { timeStringConverter } from '../../utils/util'
import { TopicCard, TopicList } from './topic'
import { UserLink } from './user'
import axios from 'axios'
import { InstituteCard } from './institute'
import { MsgAlert } from './msg'



const PostCard = (props) => {
  const expanded = props.expanded || false
  const index = props.index
  const host = props.host
  const setReplyTo = props.setReplyTo

  const post = props.post
  const history = useHistory()

  // custom dropdown
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(e);
      }}
    >
      {children}
    </a>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  return (
    <>
      {(expanded && post.replyTo) ? (
        <ListGroup.Item variant="info">
          <Row>
            <Col>
              回复：<Alert.Link className="text-dark" onClick={() => { history.push(`/post/${post.replyTo._id}`); history.go() }}><b>{post.replyTo.content}</b></Alert.Link>
            </Col>
          </Row>
        </ListGroup.Item>
      ) : null}
      {(expanded && post.relatedTopic) ? (
        <ListGroup.Item variant="success">
          <Row>
            <Col>
              回复：<Alert.Link className="text-dark" onClick={() => { history.push(`/forum/${post.relatedTopic._id}`); history.go() }}><b>{post.relatedTopic.title}</b></Alert.Link>
            </Col>
          </Row>
        </ListGroup.Item>
      ) : null}
      {
        /*
      (expanded && post.relatedInstitute) ? (
        <InstituteCard institute={post.relatedInstitute} />
      ) : null
      */
      }
      <ListGroup.Item action={!expanded} onClick={(expanded) ? null : () => { history.push(`/post/${post._id}`); history.go() }}>
        <Row>
          <Col xs="auto" className="pr-0">
            <Image width={48} height={48} />
          </Col>
          <Col>
            <Row>
              <Col>
                <small>
                  {(host) ? (<SVG className="mr-2" variant="person" fill />) : (<></>)}
                  <UserLink user={post.author}>{post.author.name}</UserLink>
                  {
                    (expanded) ? null : (
                      <span className="d-inline-block">
                        ・{timeStringConverter(post.createdAt)}
                      </span>
                    )
                  }
                </small>
              </Col>
              <Col xs="auto">
                {
                  (index) ? (
                    <code>
                      #{index}
                    </code>
                  ) : null
                }
              </Col>
            </Row>
            <Row>
              <Col>
                {post.content}
              </Col>
            </Row>
            <Row>
              {
                // photos columns
              }
            </Row>
            <Row>
              <Col style={{ textAlign: "right" }}>
              </Col>
              {
                (setReplyTo) ? (
                  <Col xs="auto">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} className="pl-2 pr-2">
                        <SVG variant="three-dots" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu as={CustomMenu}>
                        <Dropdown.Item eventKey="1"
                          href="#replytextarea"
                          onClick={(e) => { e.stopPropagation(); setReplyTo(post._id) }}
                        >
                          回复
                                  </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          转发
                                  </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                          关注此用户
                                  </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                ) : null
              }
            </Row>
            {
              (expanded) ? (
                <Row>
                  <Col>
                    <small>
                      {new Date(post.createdAt).toString()}
                    </small>
                  </Col>
                </Row>
              ) : null
            }
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

const PostList = (props) => {
  const posts = props.posts
  const postPerPage = props.postPerPage || 12
  const [currentPage, setCurrentPage] = useState(1)
  const paginationNum = props.paginationNum || 3

  return (
    <>
      <ListGroup variant="flush">
        {posts.slice((currentPage - 1) * postPerPage, (currentPage) * postPerPage).map((post, idx) => {
          return (
            <PostCard
              post={post}
              index={(currentPage - 1) * postPerPage + idx + 1}
              expanded={false}
            />
          )
        })}
        <ListGroupItem>
          {makePaginations(currentPage, setCurrentPage, Math.ceil(posts.length / postPerPage), paginationNum)}
        </ListGroupItem>
      </ListGroup>
    </>
  )
}

const NewPostForm = (props) => {
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const id = useParams().id
  const token = (window.localStorage.getItem('token')) ? `bearer ${window.localStorage.getItem('token')}` : null
  // states
  const [content, setContent] = useState()
  const [relatedInstitute, setRelatedInstitute] = useState(props.relatedInstitute)
  const [relatedTopic, setRelatedTopic] = useState((props.topic) ? props.topic._id : props.relatedTopic)
  const [replyTo, setReplyTo] = useState((props.reply) ? id : null)
  const [region, setRegion] = useState()
  const [tags, setTags] = useState()
  const [photos, setPhotos] = useState()

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // add here to prevent logout activity
    const token = (window.localStorage.getItem('token')) ? `bearer ${window.localStorage.getItem('token')}` : null
    setMsg({
      type: '',
      text: ''
    })
    const url = `http://${document.domain}:${constants.serverPort}/post/newpost`
    const body = {
      content: content,
      relatedInstitute: relatedInstitute,
      relatedTopic: relatedTopic,
      region: region,
      replyTo: replyTo,
      tags: tags,
      photos: photos
    }
    try {
      const res = await axios.post(url, body, { headers: { auth: token } })
      setMsg({
        type: 'success',
        text: res.data.msg
      })

      setTimeout(() => {
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


  useEffect(() => {
    if (!props.relatedInstitute && !props.relatedTopic) {
      setReplyTo(id)
    }
  }, [id])

  return (
    <div className={props.className}>
      {token ? (
        <>
      <MsgAlert msg={msg} />
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} >
            <Form.Label>回复内容</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="..."
              rows={3}
              id="replytextarea"
              value={content}
              onChange={(e) => { setContent(e.target.value) }} />
          </Form.Group>
        </Form.Row>

        <Form.Group as={Row} controlId="replyTo">

          <Col xs="auto">
            <ButtonGroup aria-label="reply" size="sm">
              <Button variant="outline-dark">添加图片</Button>
              <Button variant="primary" type="submit">
                发布
          </Button>
            </ButtonGroup>
          </Col>
        </Form.Group>

      </Form>
      </>
      ) : (
        <Alert variant="info"><Alert.Link href="/login">登入</Alert.Link>后可以进行回复</Alert>
      )}
    </div>
  )
}



export { PostCard, PostList, NewPostForm };