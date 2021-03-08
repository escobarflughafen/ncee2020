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

const PostView = (props) => {
  const { path, url, params } = useRouteMatch()
  const location = useLocation();
  const history = useHistory();
  const id = useParams().id

  const [post, setPost] = useState(null)

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
          <ListGroup variant="flush">
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
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
        <div className="container">
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