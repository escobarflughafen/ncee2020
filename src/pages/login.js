import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Card, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useRouteMatch } from 'react-router-dom'
import constants from '../utils/constants'
import { ExampleForm, LoginForm, SignupForm, UserLink } from './components/user'
import {InstituteCard, InstituteSelector} from './components/institute'

const LoginPage = (props) => {
  useEffect(() => {
    document.title = `${constants.title.login} - ${constants.appName}`
  }, [])

  const { url, path, params } = useRouteMatch()
  //const [institute, setInstitute] = useState()
  return (
    <div className="container">
      <div>
        {
          /*
        <div>
          {JSON.stringify(institute)} 
        </div>
        <div>
          <InstituteSelector 
          onSelect={(i) => setInstitute(i)}
          />
        </div>
          */
        }
        <Router>
          <Card>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <NavLink to={`${url}`} className="nav-link" activeClassName="active" exact={true}>
                    登入
              </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={`${url}/signup`} className="nav-link" activeClassName="active">
                    注册
              </NavLink>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              <Switch>
                <Route path={`${url}`} exact={true}>
                  <LoginForm />
                </Route>
                <Route path={`${url}/signup`}>
                  <SignupForm />
                </Route>
              </Switch>
            </Card.Body>
          </Card>
        </Router>
      </div>
    </div>
  )
}

export default LoginPage;