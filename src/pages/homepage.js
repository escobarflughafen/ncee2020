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
import { InstituteCard } from './components/institute'

const HomePage = (props) => {
  const today = new Date()
  const user = JSON.parse(window.localStorage.getItem('user'))
  const history = useHistory()
  const [posts, setPosts] = useState()
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const [trends, setTrends] = useState([])
  const [institutes, setInstitutes] = useState()

  useEffect(async () => {
    const url = `http://${document.domain}:${constants.serverPort}/topic/trends`
    try {
      const res = await axios.get(url)
      console.log(res.data)
      setTrends(res.data.trends)
    } catch (err) {
      console.log(err)
      setMsg({
        type: 'danger',
        text: err.response?.data?.msg
      })
    }

  }, [])

  useEffect(async () => {
    const allInstitutes = JSON.parse(window.localStorage.getItem('allInstitutes'))
    const url = `http://${document.domain}:${constants.servicePort}/recommend`
    if (allInstitutes) {
      let randArr1 = [...(new Set([...Array(100)].map(v => Math.floor(Math.random() * 150))))]
      let randArr2 = [...(new Set([...Array(100)].map(v => Math.floor(Math.random() * 150 + 50))))]
      let randArr = [...(new Set([...randArr1, ...randArr2]))].slice(0, 10)
      console.log(randArr)
      setInstitutes([...allInstitutes.filter((i, idx) => randArr.includes(idx))])
    }
    if (user) {
      const res = await axios.post(url, { user: user._id }, { header: { 'Content-Type': 'application/json; charset=utf-8' } })
      console.log(res)
      if (allInstitutes && res.data.instpred.length) {
        const randIdx = [...(new Set([...Array(400)].map(v => Math.floor(Math.random() * 20))))].slice(0, 10).sort((a, b) => a - b)
        console.log(randIdx)
        let ids = res.data.instpred.slice(0, 20).filter((i, idx) => randIdx.includes(idx)).map(i => i[1])
        console.log(ids)
        setInstitutes([...allInstitutes.filter(i => ids.includes(i._id))])
      }
    }
  }, [])


  useEffect(() => {
    document.title = `${constants.title.homepage} - ${constants.appName}`
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
                      <UserActivity users={[...user.following, user._id]} homepage limit={1000} />
                    </Card>
                  </CardGroup>
                </Col>
              ) : null
            }
            <Col xs={12} lg={(user) ? 6 : 12} className="">
              <Row>
                <Col xs={12}>
                  <Card className="mb-3">
                    <Card.Header>
                      <strong>
                        热门讨论
                      </strong>
                    </Card.Header>
                    <TopicList topics={trends} viewMode={'紧凑'} trends />
                  </Card>
                </Col>
                {
                  (user) ? (
                    <Col xs={12} lg={(user) ? 12 : 6}>
                      <Card className="mb-3">
                        <Card.Header>
                          <strong>
                            推荐院校
                      </strong>
                        </Card.Header>
                        <ListGroup variant="flush">
                          {
                            (institutes?.map(i => (
                              <InstituteCard institute={i} size="sm" />
                            )))
                          }
                        </ListGroup>
                      </Card>
                    </Col>

                  ) : null
                }
              </Row>
            </Col>
          </Row>

        </Card.Body>
      </div>
    </>
  )
}

export default HomePage