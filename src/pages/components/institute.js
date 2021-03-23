import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, ModalBody, Popover, Badge, OverlayTrigger, Image } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import constants from '../../utils/constants'
import makePagination from './pagination'
import axios from 'axios'
import SVG from '../../utils/svg'

const Labels = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const labels = props.labels

  return (
    <div className="d-inline-block" onClick={(e) => { e.stopPropagation() }}>
      {
        (labels) ?
          labels.map(
            (l, idx) => ((l) ? (
              <Button variant={["primary", "secondary", "success", "info"][idx % 4]}
                className="mr-1 py-0 px-1"
                size="sm"
                onClick={(e) => {
                  history.push({
                    pathname: '/institute',
                    state: {
                      queryParams: [l]
                    }
                  })
                  history.go()
                }}
              > 
                {l.label}
                </Button>
            ) : (<></>))
          ) : []
      }
    </div>
  )
}


const InstituteCard = (props) => {
  const { path, url, params } = useRouteMatch()
  const i = props.institute
  const history = useHistory()

  return (
    <ListGroup.Item action onClick={() => { history.push(`/institute/${i.id}`); history.go() }}>
      <Row>
        {
          (props.size === "sm") ? (<></>) : (
            <Col xs="auto" className="d-none d-sm-block">
              <Image fluid height={80} width={80} src={i.icon} />
            </Col>
          )
        }
        <Col sm>
          <Row >
            <Col xs>
              {
                (props.size === "sm") ? (
                  <Image className="mr-2" fluid height={24} width={24} src={i.icon} />
                ) : (
                  <Image className="d-xs-block d-sm-none mr-2" fluid height={24} width={24} src={i.icon} />
                )
              }
              <b className="mr-1">{i.name}</b>
              {(props.score) ? (<Badge variant="info">{props.score}分</Badge>) : (<></>)}
            </Col>
            <Col style={{ textAlign: "right" }} xs="auto">
              <span className="annotation">
                <SVG variant="location" />
                {i.location}
              </span>
            </Col>
          </Row>
          <Row>
            <Col >
              <Labels labels={i.labels} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Nav fill onClick={(e) => { e.stopPropagation(); }}>
                <Nav.Item>
                  <Nav.Link onClick={(e) => { alert(1234) }}>
                    <SVG variant="star" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <SVG variant="chat" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link>
                    <SVG variant="share" />
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
        </Col>
        {
          (props.size === 'sm') ? (<></>) : (
            <Col className="d-none d-lg-block">
              <Row>
                <span className="annotation">
                  {i.brief}...
                      </span>
              </Row>
              <Row>
              </Row>
            </Col>)
        }
      </Row>
    </ListGroup.Item>
  )
}

const InstituteList = (props) => {
  const [currentPage, setCurrentPage] = useState(0)


}

export { InstituteCard, InstituteList, Labels }