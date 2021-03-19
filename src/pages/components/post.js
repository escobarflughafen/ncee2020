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
import axios from 'axios'



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
              回复：<a onClick={() => { history.push(`/post/${post.replyTo._id}`); history.go() }}><b>{post.replyTo.content}</b></a>
            </Col>
          </Row>
        </ListGroup.Item>
      ) : null}
      {(expanded && post.relatedTopic) ? (
        <ListGroup.Item variant="success">
          <Row>
            <Col>
              回复：<a onClick={() => { history.push(`/forum/${post.relatedTopic._id}`); history.go()}}><b>{post.relatedTopic.title}</b></a>
            </Col>
          </Row>
        </ListGroup.Item>
      ) : null}
      {(expanded && post.relatedInstitute) ? (
        <ListGroup.Item variant="primary">
          <Row>
            <Col>
            </Col>
          </Row>
        </ListGroup.Item>
      ) : null}
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
                  <a href={`/user/${post.author.username}`}><b>{post.author.name}</b></a>
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

  const id = useParams().id
  // states
  const [content, setContent] = useState()
  const [relatedInstitute, setRelatedInstitute] = useState(props.relatedInstitute)
  const [relatedTopic, setRelatedTopic] = useState((props.topic) ? props.topic._id : props.relatedTopic)
  const [replyTo, setReplyTo] = useState((props.reply) ? id : null)
  const [region, setRegion] = useState()
  const [tags, setTags] = useState()
  const [photos, setPhotos] = useState()


  const handleSubmit = (e) => {
    console.log(replyTo)
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

    axios.post(url, body).then((res) => {
      console.log(res)
    })
  }

  useEffect(()=>{
    if(!props.relatedInstitute) {
      setReplyTo(id)
    }
  }, [id])

  return (
    <div className={props.className}>
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
        <Col>
          {
            /*
            (props.topic) ? (
              <>
                <InputGroup className="mb-3" size="sm">
                  <InputGroup.Prepend>
                    <InputGroup.Text>回复</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    as="select"
                    defaultValue={replyTo}
                    onChange={(e) => { setReplyTo(e.target.value) }}
                  >
                    <option value={-1}>...</option>
                    {props.topic.posts.map((post, idx) => {
                      return (
                        <option value={post.id}>{idx + 1} - {post.content}</option>
                      )
                    })}
                  </Form.Control>
                </InputGroup>
              </>
            ) : null
            */
          }
        </Col>

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
    </div>
  )


}

export { PostCard, PostList, NewPostForm };