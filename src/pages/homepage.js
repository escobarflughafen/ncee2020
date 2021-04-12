import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import React, { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup, Carousel } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import { makePaginations } from './components/pagination'
import { timeStringConverter } from '../utils/util'
import { TopicCard, TopicList } from './components/topic'
import { PostCard, NewPostForm, PostList } from './components/post'
import { LoginForm, UserActivity } from './components/user'
import axios from 'axios'

const HomePage = (props) => {
  const today = new Date()
  const [user, setUser] = useState()
  const history = useHistory()
  const [posts, setPosts] = useState()
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const [trends, setTrends] = useState([])
  const [institutes, setInstitutes] = useState([])

  useEffect(async () => {
    const url = `http://${document.domain}:${constants.serverPort}/forum/trends`
    try {
      const res = await axios.post(url)
      console.log(res.data)
      setTrends(res.data.trends)
    } catch (err) {
      console.log(err)
      setMsg({
        type: 'danger',
        text: err.response.data.msg
      })
    }

  }, [])

  /*
  useEffect(async () => {
    const url = `http://${document.domain}:${constants.serverPort}/institute/recommended`
    try{
      const res = await axios.post(url)
      console.log(res.data)
      setInstitutes(res.data.institutes)
    } catch(err) {
      console.log(err)
      setMsg({
        type: 'danger',
        text: err.response?.data?.msg
      })
    }
  }, [])
  */

  useEffect(() => {
    const loginAs = window.localStorage.getItem('user')
    if (loginAs) {
      setUser(JSON.parse(loginAs))
      document.title = `${constants.title.homepage} - ${constants.appName}`
    }
  }, [])

  /*
  useEffect(async () => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const auth = `bearer ${token}`
      const url = `http://${document.domain}:${constants.serverPort}/post/fetchfollowedpost`

      try {
        const res = await axios.post(url, {}, { headers: { auth } })
        console.log(res)
        setPosts(res.data.posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      } catch (err) {
        console.log(err.response)
        setMsg({
          type: 'danger',
          text: (err.response.data) ? err.response.data.req : '未能找到关注中用户的贴文'
        })
      }
    }
  }, [user])
  */
  return (
    <>
      <div className="container">
        <Card.Body>
          <Row>
            <Col>
              <Card.Title as="h3">
                {
                  (user) ? (<><a href={`/user/${user.username}`}>{user.name}</a>，</>) : null
                }
                欢迎使用
              </Card.Title>
            </Col>
            {
              (user) ? null : (
                <Col className="d-lg-none" xs="auto">
                  <Card.Text>
                    <Button variant="link" className="p-0 text-success" onClick={() => { history.push('/login'); history.go() }}>
                      登入
                    </Button>
                  </Card.Text>
                </Col>
              )
            }
          </Row>
          <Card.Text>
            <p>
              <Alert variant="info">
                今天是 <strong>{today.toLocaleString('zh', constants.shortDateOptions)}</strong>，距离高考还有 <b className="text-primary">{Math.floor((constants.dayOfNCEE.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))}</b> 天
                </Alert>
              {
                (!user) ? (
                  <>
                    <Button variant="link" size="sm" className="text-success"
                      onClick={() => {
                        history.push('/institute')
                      }}
                    >查学校→</Button>
                    <br />
                    <Button variant="link" size="sm" className="text-success"
                      onClick={() => {
                        history.push('/forum')
                      }}
                    >讨论区→</Button>
                    <br />
                    <Button variant="link" size="sm" className="text-success"
                      onClick={() => {
                        history.push('/stats')
                      }}
                    >看数据→</Button>
                  </>
                ) : null
              }
            </p>
          </Card.Text>
          <Row>
            {
              (user) ? (
                <Col xs={12} lg={6} className="">
                  <CardGroup>

                    <Card className="mb-3">
                      <Card.Header>
                        <strong>
                          你关注的
                      </strong>
                      </Card.Header>
                      <UserActivity users={user.following} limit={400} />
                    </Card>
                  </CardGroup>
                </Col>
              ) : null
            }
            <Col xs={12} lg={(user) ? 6 : 12} className="">
              <Row>
                <Col xs={12} lg={(user) ? 12 : 6}>
                  <Card className="mb-3">
                    <Card.Header>
                      <strong>
                        热门讨论
                      </strong>
                    </Card.Header>
                    <TopicList topics={trends} viewMode={'紧凑'} trends />
                  </Card>
                </Col>
                <Col xs={12} lg={(user) ? 12 : 6}>
                  <Card className="mb-3">
                    <Card.Header>
                      <strong>
                        推荐院校
                      </strong>
                    </Card.Header>
                    <ListGroup variant="flush">
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>

        </Card.Body>
      </div>
    </>
  )
}

export default HomePage