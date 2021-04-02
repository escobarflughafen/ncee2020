import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import React, { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import { makePaginations } from './components/pagination'
import { timeStringConverter } from '../utils/util'
import { TopicCard, TopicList } from './components/topic'
import { PostCard, NewPostForm } from './components/post'
import axios from 'axios'

const fetchPostService = async (id, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/post/${id}/fetch`
  const token = window.localStorage.getItem('token')
  const auth = (token) ? `bearer ${token}` : null

  const body = {
    id
  }

  const res = await axios.post(url, body, { headers: { auth } })
  return res
}

const PostView = (props) => {
  const { path, url, params } = useRouteMatch()
  const location = useLocation();
  const history = useHistory();
  const id = useParams().id
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const [post, setPost] = useState()


  useEffect(async () => {
    try {
      const res = await fetchPostService(id)
      console.log(res)
      document.title = `${res.data.post.content} - ${constants.title.post} - ${constants.appName}`
      setPost(res.data.post)
    } catch (err) {
      console.log(err.response)
      setMsg({ type: 'danger', text: '未能取得贴文内容' })
    }
  }, [id])

  /*
  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/post/${id}/fetch`
    axios.post(url).then(res => {
      console.log(res)
      document.title = `${res.data.post.content} - ${constants.title.post} - ${constants.appName}`
      setPost(res.data.post)
    })
  }, [id])
  */

  return (
    <>
      {(post) ? (
        <>
          <div>
            <Row className="mb-3">
              <Col>
                <Button
                  variant="outline-success"
                  size="sm"
                  onClick={() => {
                    history.goBack()
                  }}
                >←返回</Button>
              </Col>
            </Row>
            <Card>
              <ListGroup variant="flush">
                <PostCard
                  post={post}
                  expanded={true}
                />
                <ListGroup.Item>
                  {
                    <NewPostForm reply />
                  }
                </ListGroup.Item>
                {
                  (post.replies.length > 0) ? (
                    <>
                      <ListGroup.Item variant="light">
                        <Row>
                          <Col>
                            回复（{post.replies.length}）
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      {
                        post.replies.map((reply, idx) => {
                          return (
                            <PostCard
                              post={reply}
                              index={idx + 1}
                              expanded={false}
                              host={reply.author._id === post.author._id}
                            />
                          )
                        })
                      }
                    </>) : null
                }
              </ListGroup>
            </Card>
          </div>
        </>
      ) : null}
    </>
  )
}


const PostPage = (props) => {
  return (
    <>
      <Router>
        <div className="container mb-3">
          <Switch>
            <Route path={`/post/:id`}>
              <PostView />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}


export default PostPage;