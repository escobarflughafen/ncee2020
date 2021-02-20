import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup } from 'react-bootstrap'
import { Tabs, Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import constants from '../../utils/constants'
import SVG from '../../utils/svg'
import axios from 'axios'


const goBack = (path) => {
  let patharr = path.split('/')
  let newPath = patharr.slice(0, -1)
  return (newPath.length <= 1) ? '/' : newPath.join('/')
}

const makeBreadcrumb = (path) => {
  let patharr = path.split('/')
  return (
    <Breadcrumb>
      {patharr.map((p) => {
        return (
          <Breadcrumb.Item href="#">
            {p}
          </Breadcrumb.Item>
        )
      })}
    </Breadcrumb>
  )
}


const NavigationBar = (props) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    console.log(history)
  }, [location])

  return (
    <div>
      <Navbar variant="light" bg="light">
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => { history.goBack() }}><SVG variant="chevron-left" /></Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {makeBreadcrumb(history.location.pathname)}
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>
  )
}

export default NavigationBar;