import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import SVG from '../../utils/svg'
import constants from '../../utils/constants'
import App from '../../App'


const AppNavbar = (props) => {
  const history = useHistory();

  return (
    <Navbar className="bg-dark" variant="dark" expand="lg">
      <Navbar.Brand href="#" onClick={() => { history.push('/'); history.go() }}>
        高校录取分数线
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link onClick={() => { history.push('/'); history.go() }}>{constants.title.homepage}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { history.push('/stats'); history.go() }}>{constants.title.stats}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { history.push('/institute'); history.go() }}>{constants.title.institute}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { history.push('/forum'); history.go() }}>{constants.title.forum}</Nav.Link>
          </Nav.Item >
          <Nav.Item>
            <Nav.Link onClick={() => { history.push('/about'); history.go() }}>{constants.title.about}</Nav.Link>
          </Nav.Item >
        </Nav >
        <Form inline className="mr-2 d-none d-lg-block">
          <FormControl type="text" placeholder="..." className="mr-sm-2" />
          <Button variant="outline-success">搜索</Button>
        </Form>

        <Nav>
          <Nav.Item>
            <Nav.Link className="d-lg-none" onClick={() => { history.push('/search'); history.go() }}>{constants.title.search}</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => { history.push('/login'); history.go() }}>{constants.title.login}</Nav.Link>
          </Nav.Item>
        </Nav >
      </Navbar.Collapse >
    </Navbar >
  )
}

export default AppNavbar;