import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import {createBrowserHistory} from 'history'
import SVG from './utils/svg'
import Homepage from './pages/homepage'
import InstitutePage from './pages/institute'
import StatsPage from './pages/statistics'
import LoginPage from './pages/login'
import ForumPage from './pages/forum'
import AboutPage from './pages/about'
import UserPage from './pages/user'
import PostPage from './pages/post'
import NavigationBar from './pages/components/navigation-bar'
import constants from './utils/constants'
import AppNavbar from './pages/components/navbar'

// components
const CNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">高校录取分数线</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/home">首页</Link>
          <Link to="/data">看数据</Link>
          <Link to="/institute">查学校</Link>
          <Link to="/forum">讨论区</Link>
          <Link to="/about">关于</Link>
        </Nav>
        <Form inline style={{ marginRight: 8 }}>
          <FormControl type="text" placeholder="..." className="mr-sm-2" />
          <Button variant="outline-success">搜索</Button>
        </Form>

        <Nav.Link href="/login">登入</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}


function App() {
  const [user, setUser] = useState(null);
  const history = createBrowserHistory();

  return (
    <div>
      <Router history={history}>
        {
          // TODO: change Link into history.push() components
        }
      <AppNavbar />
        <Switch>
          <div className="mt-3">
            <Route path="/" exact={true}>
              <Homepage />
            </Route>

            <Route path="/home">
              <Redirect to="/" />
            </Route>

            <Route path="/stats">
              <StatsPage />
            </Route>

            <Route path="/institute">
              <InstitutePage />
            </Route>

            <Route path="/forum">
              <ForumPage />
            </Route>

            <Route path="/about">
              <AboutPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route path="/user">
              <UserPage />
            </Route>

            <Route path="/post">
              <PostPage />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
