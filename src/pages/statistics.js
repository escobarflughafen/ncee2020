import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'

const Statistics = (props) => {
  return (
    <div>
      <Tab.Container defaultActiveKey="general">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="#first">
              <Nav.Item>
                <Nav.Link eventKey="general">概览</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="data">数据</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Tab.Content>
            <Tab.Pane eventKey="general">
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
            </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Tab.Pane>

            <Tab.Pane eventKey="data">
              <Card.Body>
                <Card.Title>DATA</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Tab.Pane>
          </Tab.Content>
        </Card>
      </Tab.Container>
    </div>
  )

}

export default Statistics;