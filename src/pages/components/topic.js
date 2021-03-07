import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup } from 'react-bootstrap'
import { Tabs, Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import constants from '../../utils/constants'
import {timeStringConverter} from '../../utils/util'
import SVG from '../../utils/svg'
import axios from 'axios'

const TopicCard = (props) => {
  const history = useHistory()
  
  const topic = props.topic
  const viewMode = props.viewMode
  return (
    <ListGroup.Item
      action
      onClick={(e) => {
        history.push(`/forum/${topic.id}`);
        history.go()
      }}
    >
      <Row>
        <Col xs="auto" style={{ textAlign: "center" }}>
          <small>{topic.category}</small>
        </Col>
        <Col className="">
          <Row>
            <Col className="">
              <a><b>{topic.title}</b></a>
            </Col>
            <Col xs="auto">
              <Row>
                <Col>
                  <small>
                    <SVG variant="person" fill />
                    <span className="ml-1">
                      <a><b>{topic.host}</b></a>
                    </span>
                  </small>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={(viewMode === '紧凑') ? "d-none" : ""}>
            <Col>
              {
                (topic.relatedInstitute) ? (
                  <>
                    <Badge
                      variant="primary"
                      className="mr-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/institute/${topic.relatedInstitute.id}`);
                        history.go()
                      }}
                    >
                      {topic.relatedInstitute.name}
                    </Badge>
                  </>
                ) : (<></>)
              }
              {
                (topic.region) ? (
                  <>
                    <Badge variant="success" className="mr-1">
                      {topic.region}
                    </Badge>
                  </>
                ) : (<></>)
              }
              <small>
                <span className="mr-1 d-inline-block">{topic.viewCount}次浏览・</span>
                <span className="mr-1 d-inline-block">{topic.contents.length}条回复・</span>
                <span className="mr-1 d-inline-block">最后回复于 {timeStringConverter(topic.lastUpdated)}</span>
              </small>
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const TopicList = (props) => {
      const topics = props.topics
      const [viewMode, setViewMode] = useState('详细')
      return (
        <>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row className="ml-auto">
                <Col></Col>
                <Col xs="auto">
                  <Row>
                    <SVG variant="column-gap" />
                    <Col className="pl-2">
                      <FormControl
                        as="select"
                        size="sm"
                        value={viewMode}
                        onChange={e => { setViewMode(e.target.value) }}>
                        <option>详细</option>
                        <option>紧凑</option>
                      </FormControl>
                    </Col>
                  </Row>

                </Col>
                <Col xs="auto">
                  <Row>
                    <SVG variant="sort" />
                    <Col className="pl-2">
                      <FormControl as="select" size="sm">
                        <option>最后回复</option>
                        <option>发布时间</option>
                        <option>地区</option>
                        <option>相关院校</option>
                      </FormControl>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </ListGroup.Item>
            {topics.map((topic) => {
              return (
                <TopicCard topic={topic} viewMode={viewMode} />
              )
            })}
          </ListGroup>

        </>
      )
}

export {TopicCard, TopicList};
