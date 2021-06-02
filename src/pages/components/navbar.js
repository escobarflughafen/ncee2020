import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect, useContext } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, Badge, Image, InputGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import SVG from '../../utils/svg'
import constants from '../../utils/constants'
import App from '../../App'
import { UserAvatar } from './user'
import axios from 'axios'


const AppNavbar = (props) => {
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')));
  const [noticeCount, setNoticeCount] = useState(parseInt(window.localStorage.getItem('noticecount')))

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [window.localStorage.getItem('user')])

  useEffect(async () => {
    var user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      const url = `http://${document.domain}:${constants.serverPort}/user/noticecount`
      const res = await axios.post(url, { id: user._id })
      setNoticeCount(res.data.count)
      window.localStorage.setItem('noticecount', res.data.count)
      // loop
      setInterval(async () => {
        const res = await axios.post(url, { id: user._id })
        //console.log(res)
        setNoticeCount(res.data.count)
        window.localStorage.setItem('noticecount', res.data.count)
      }, Math.ceil(Math.random() * 1000 + 5000))
    }
  }, [])

  const [searchKW, setSearchKW] = useState("")

  return (
    <Router>

      <Navbar className="bg-dark shadow" variant="dark" expand="md">
        <Navbar.Brand href="#" onClick={() => { history.push('/'); history.go() }}>
          高校查询系统
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Nav.Link onClick={() => { history.push('/'); history.go() }}>{constants.title.homepage}</Nav.Link>
            </Nav.Item>
            {
              /*
            <Nav.Item>
              <Nav.Link onClick={() => { history.push('/stats'); history.go() }}>{constants.title.stats}</Nav.Link>
            </Nav.Item>
              */
            }
            <Nav.Item>
              <Nav.Link onClick={() => { history.push('/institute'); history.go() }}>{constants.title.institute}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link onClick={() => { history.push('/forum'); history.go() }}>{constants.title.forum}</Nav.Link>
            </Nav.Item >
          </Nav>
          <Form className="mr-2" onSubmit={(e) => {
            e.preventDefault()
            if (searchKW) {
              history.push({
                pathname: '/institute',
                state: {
                  queryParams: [{
                    category: 'keyword',
                    label: searchKW
                  }]
                }
              })
              history.go()
            }
          }}>
            <InputGroup>
              <FormControl type="text" placeholder="关键字..." value={searchKW} onChange={(e) => { setSearchKW(e.target.value) }} />
              <InputGroup.Append>
                <Button variant="success" type="submit">查询</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
          <Nav>
            {
              (user) ? (
                <Nav.Item>
                  <Nav.Link onClick={() => { history.push(`/user/${user.username}`); history.go() }}>
                    <UserAvatar className="mr-2" width={24} height={24} user={user} />
                    <b className="text-light">
                      {user.name}
                    </b>
                    {
                      (noticeCount > 0) ? (
                        <Badge
                          variant="light"
                          className="ml-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            history.push(`/user/${user.username}/notifications`)
                            history.go()
                          }}
                        >{noticeCount}</Badge>
                      ) : null
                    }
                  </Nav.Link>
                </Nav.Item>
              ) : (
                <Nav.Item>
                  <Nav.Link onClick={() => { history.push('/login'); history.go() }}>{constants.title.login}</Nav.Link>
                </Nav.Item>
              )
            }
            {
              (user) ? (
                <Nav.Item>
                  <Nav.Link onClick={() => { history.push('/logout'); history.go() }}>登出</Nav.Link>
                </Nav.Item>
              ) : null
            }
          </Nav >
        </Navbar.Collapse >
      </Navbar >
    </Router>
  )
}

export default AppNavbar;