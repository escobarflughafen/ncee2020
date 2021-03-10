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


const PostView = (props) => {
  const { path, url, params } = useRouteMatch()
  const location = useLocation();
  const history = useHistory();
  const id = useParams().id

  const [post, setPost] = useState()

  /*
  useEffect(()=>{
    fetchPost(id, ((res) => {
      setPost(res.data) 
    }))     
  },[])

  useEffect(()=> {
    document.title = `${post.content} - ${constants.appName}`
  }, [post])
  */

  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/post/${id}/fetch`
    axios.post(url).then(res => {
      console.log(res)
      document.title = `${res.data.post.content} - ${constants.title.post} - ${constants.appName}`
      setPost(res.data.post)
    })
  }, [])

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
                  <NewPostForm replyTo={post._id} />
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
            <Route path={`/post/:id`} exact={true}>
              <PostView />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  )
}


export default PostPage;