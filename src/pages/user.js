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
import { UserListItem, UserList, SignupForm, UserCard, toggleFollowService, UserAvatar } from './components/user'
import axios from 'axios'
import { MsgAlert } from './components/msg'

const serverUrl = `http://${document.domain}:${constants.serverPort}`

const UserActivity = (props) => {
  return (
    <ListGroup variant="flush">

    </ListGroup>
  )
}

const UserHeader = (props) => {
  const user = props.user
  const loginAs = JSON.parse(window.localStorage.getItem('user'))
  const history = useHistory()
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const handleFollow = async (e) => {
    e.stopPropagation()
    try {
      const res = await toggleFollowService(user._id)
      setMsg({ type: 'success', text: res.data.msg })
      window.localStorage.setItem('user', JSON.stringify(res.data.user))
      setTimeout(() => { history.go() }, 1000)
    } catch (err) {
      console.log(err.response)
      setMsg({ type: 'danger', text: err.response.data.msg })
    }
  }
  return (
    <div className="mb-3">
      <MsgAlert msg={msg} />
      <Row>
        <Col xs="auto">
          <UserAvatar width={96} height={96} user={user} />
        </Col>
        <Col className="pl-0">
          <Row>
            <Col>
              <Row>
                <Col>
                  <div>
                    <b>
                      <big>{user.name}</big>
                    </b>
                  </div>
                  <span className="text-info">@{user.username}</span>
                </Col>
              </Row>
              <Row className="text-muted">
                <Col xs={12} sm="auto" className="pr-0">
                  <small>
                    <SVG variant="location" className="mr-1" />
                    <span>
                      {constants.regions.find(r => r.region_id === user.region.province).region_name}, {constants.cities.find(c => c.city_id === user.region.city).city_name}
                    </span>
                  </small>
                </Col>
                <Col xs={12} sm="auto" className="pr-0">
                  <small>
                    <SVG variant="calendar" className="mr-1" />
                    <span>
                      {new Date(user.registeredDate).toLocaleDateString('zh', constants.shortDateOptions)} 加入
                    </span>
                  </small>
                </Col>
              </Row>
            </Col>
          </Row>
          {
            (user.about) ? (
              <Row className="mt-3">
                <Col>
                  {user.about}
                </Col>
              </Row>
            ) : null
          }
        </Col>
        <Col xs="auto">
          {
            (loginAs && (loginAs._id != user._id)) ? ((loginAs.following.find(f => (f === user._id) || (f._id === user._id))) ?
              (<Button size="sm" variant="info" onClick={handleFollow}>已关注</Button>)
              :
              (<Button size="sm" variant="outline-info" onClick={handleFollow}>关注</Button>)
            ) : null
          }
        </Col>
      </Row>
    </div>
  )
}


const fetchUserService = async (username, port = constants.serverPort) => {
  const url = `http://${document.domain}:${constants.serverPort}/user/${username}/fetch`
  const res = await axios.post(url, { username })
  return res
}

const UserDetail = (props) => {
  const [user, setUser] = useState()
  const { url, path, params } = useRouteMatch()
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const username = useParams().username
  const [loginAs, setLoginAs] = useState()

  useEffect(async () => {
    setLoginAs(JSON.parse(window.localStorage.getItem('user')))
    
    try {
      const res = await fetchUserService(username)
      // hint: the setState can be proceed by a callback to synchronize the control of prevstate
      /*
      setUser((user) => {
        console.log(user)
        return res.data.user
      })
      */
      setUser(res.data.user)
      document.title = `${res.data.user.username} - ${constants.title.user} - ${constants.appName}`
    } catch (err) {
      setMsg({ type: 'danger', text: `找不到用户: ${username}` })
    }

  }, [username])

  return (
    <>
      <MsgAlert msg={msg} />
      {
        (user) ? (
          <>
            <UserHeader user={user} />

            <Router>
              <Card>
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <NavLink className="nav-link p-2" activeClassName="active" to={`activity`}>
                        活动
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink className="nav-link p-2" activeClassName="active" to={`following`}>
                        关注中
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink className="nav-link p-2" activeClassName="active" to={`follower`}>
                        关注者
                      </NavLink>
                    </Nav.Item>
                    {
                      (loginAs && (loginAs._id === user._id)) ? (
                        <Nav.Item>
                          <NavLink className="nav-link p-2" activeClassName="active" to={`profile`}>
                            个人资料
                      </NavLink>
                        </Nav.Item>
                      ) : null
                    }
                  </Nav>
                </Card.Header>
                <Switch>
                  <Route path={`${url}`} exact={true}>
                    <Redirect to={`${url}/activity`} />
                  </Route>
                  <Route path={`${url}/activity`}>
                    123
                    </Route>
                  <Route path={`${url}/following`}>
                    <UserList users={user.following} />
                  </Route>
                  <Route path={`${url}/follower`}>
                    <UserList users={user.follower} />
                  </Route>
                  <Route path={`${url}/profile`}>
                    <Card.Body>
                      <SignupForm modify />
                    </Card.Body>
                  </Route>
                </Switch>
              </Card>
            </Router>
          </>
        ) : null
      }
    </>
  )
}



const UserPage = (props) => {
  const history = useHistory();
  const username = useParams().username
  const [user, setUser] = useState()

  const { url, path, params } = useRouteMatch()

  return (
    <div className="container">
      {
        /*
        JSON.stringify({ url, path, params })
        */
      }
      <Router>
        <Switch>
          <Route path={`/user`} exact={true}>
            <div>
              hp of /user
            </div>
          </Route>
          <Route path={`/user/:username`}>
            <UserDetail />
          </Route>
        </Switch>
      </Router>

    </div>
  )
}

export default UserPage