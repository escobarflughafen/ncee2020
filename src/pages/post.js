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

// utils
const fetchPost = async (id, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/post/${id}/fetchpost`

  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: {
        id: id
      }
    })
    cb(await req.then())
  } catch (err) {
    console.log(err)
  }
}

const demoData = {
  id: 123,
  author: 'jack',
  content: 'lorem iplorem ipsum dolorlorem ipsum dolorsum dolor',
  relatedInstitute: 104,
  relatedTopic: 123,
  region: '44',
  viewCount: 1234,
  createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
  replyTo: { content: "123", id: 123 },
  replies: [
    {
      id: 123,
      author: 'alice',
      content: 'lorem iplorem ipsum dolorlorem ipsum dolorsum dolor',
      relatedInstitute: 104,
      relatedTopic: 123,
      region: '44',
      viewCount: 1234,
      createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
    },
    {
      id: 123,
      author: 'bob',
      content: 'lorem iplorem ipsum dolorlorem ipsum dolorsum dolor',
      relatedInstitute: 104,
      relatedTopic: 123,
      region: '44',
      viewCount: 1234,
      createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
    },
    {
      id: 123,
      author: 'douglas',
      content: 'lorem iplorem ipsum dolorlorem ipsum dolorsum dolor',
      relatedInstitute: 104,
      relatedTopic: 123,
      region: '44',
      viewCount: 1234,
      createdAt: Date.now() - Math.ceil(Math.random() * 1000 * 3600 * 72),
    },
  ]
}

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



  useEffect(()=>{
    setPost(demoData)
  },[])
  return (
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
              post={demoData}
              expanded={true}
            />
            <ListGroup.Item>
              <NewPostForm replyTo={demoData.id} />
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Row>
                <Col>
                  回复（{demoData.replies.length}）
                  </Col>
              </Row>
            </ListGroup.Item>
            {
              demoData.replies.map((reply, idx) => {
                return (
                  <PostCard
                    post={reply}
                    index={idx + 1}
                    expanded={false}
                  />
                )
              })
            }
          </ListGroup>
        </Card>
      </div>
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