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


const UserHeader = (props) => {

  return (
    <>
      <Row>
        <Col>
          123
        </Col>
        <Col>
          <Row>
            <Col>
              456
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

const UserPage = (props) => {
  const history = useHistory();
  const username = useParams().username
  const [user, setUser] = useState()

  return (
    <>
      <div className="container">
        <UserHeader />
      </div>
    </>
  )
}

export default UserPage