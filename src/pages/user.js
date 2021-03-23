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
import { UserListItem } from './components/user'
import axios from 'axios'

const demoUser = {
  username: 'user',
  name: 'John Smith',
  avatar: '',
  year: '2021',
  region: {
    province: '44',
    city: '4401'
  },
  score: 632,
  about: 'feeling good today',
  registeredDate: new Date(Date.now()),
  isAdmin: false,
  follower: [1, 2, 3],
  following: [1, 2, 3]
}

const UserList = (props) => {
  return (
    <ListGroup variant="flush">

    </ListGroup>
  )
}

const UserActivity = (props) => {
  return (
    <ListGroup variant="flush">

    </ListGroup>
  )
}

const UserHeader = (props) => {
  const user = props.user
  return (
    <div className="mb-3">
      <Row>
        <Col xs="auto">
          <Image height={96} width={96} className="d-md-block d-none"/>
          <Image height={64} width={64} className="d-none d-md-none d-sm-block"/>
          <Image height={48} width={48} className="d-sm-none"/>
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
                <Col xs="auto">
                  <Button variant="info" size="sm">编辑</Button>
                </Col>
              </Row>
              <Row className="text-muted">
                <Col xs="auto" className="pr-0">
                  <small>
                    <SVG variant="location" className="mr-1" />
                    {constants.regions.find(r => r.region_id === user.region.province).region_name}, {constants.cities.find(c => c.city_id === user.region.city).city_name}
                  </small>
                </Col>
                <Col xs="auto" className="pr-0">
                  <small>
                    <SVG variant="calendar" className="mr-1" />
                    {user.registeredDate.toLocaleString('zh', constants.shortDateOptions)} 加入
                    </small>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className="my-1" />
              {user.about}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}



const UserDetail = (props) => {
  const [user, setUser] = useState()
  const { url, path, params } = useRouteMatch()

  useEffect(() => {
    const url = '123'
    setUser({ ...demoUser })
  }, [useParams().username])

  return (
    <>
      {
        (user) ? (
          <>
            <UserHeader user={user} />
            <Router>
              <Card>
                <Card.Header>
                  <Nav variant="tabs">
                    <Nav.Item>
                      <NavLink className="nav-link" activeClassName="active" to={`activity`}>
                        活动
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink className="nav-link" activeClassName="active" to={`following`}>
                        关注中 ({user.following.length})
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                      <NavLink className="nav-link" activeClassName="active" to={`follower`}>
                        关注者 ({user.follower.length})
                      </NavLink>
                    </Nav.Item>
                  </Nav>
                </Card.Header>
                <Card.Body>
                  <Switch>
                    <Route path={`${url}`} exact={true}>
                      <Redirect to={`${url}/activity`} />
                    </Route>
                    <Route path={`${url}/activity`}>
                      <UserActivity />
                    </Route>
                    <Route path={`${url}/following`}>
                      <UserList users={user.following} />
                    </Route>
                    <Route path={`${url}/follower`}>
                      <UserList users={user.follower} />
                    </Route>
                  </Switch>
                </Card.Body>
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