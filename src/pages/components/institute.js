import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, ModalBody, Popover, Badge, OverlayTrigger, Image, InputGroup } from 'react-bootstrap'
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
                style={{
                  borderRadius: '0.25rem',
                  fontWeight: '600',
                  fontSize: '80%'
                }}
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
          <Row className="mb-2">
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
            <Col>
              <Labels labels={i.labels} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Nav fill onClick={(e) => { e.stopPropagation(); }}>
                <Nav.Item>
                  <Nav.Link onClick={(e) => { history.push(`/institute/${i.id}/discuss`);history.go() }}>
                    <SVG variant="chat" />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link onClick={(e) => {history.push(`/forum/`); history.go()}}>
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


/*
  props:
  @size: size of selector - 'sm' | 'lg'
  @onSelect: function of handling the selected institute -- function: (i: instituteObject) => {}
  @caption: caption of selector - String
  @nohide: don't hide the input area when institute is selected
  @multiple: decide whether this selector displays in a multiple selection fashion or not
*/

const InstituteSelector = (props) => {
  const [indices, setIndices] = useState([])
  const [keyword, setKeyword] = useState('')
  const [selected, setSelected] = useState()

  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/institute/indexlist`
    const localStorage = window.localStorage.getItem('instituteIndices')
    if (localStorage) {
      console.log('fetching instituteIndices from localStorage')
      setIndices(JSON.parse(localStorage))
    } else {
      axios.get(url).then((res) => {
        console.log(res.data)
        console.log('instituteIndices fetched, setting into localStorage')
        window.localStorage.setItem('instituteIndices', JSON.stringify(res.data.institutes))
        setIndices(res.data.institutes)
      })
    }
  }, [])

  return (
    <>
      <Form.Group>
        <InputGroup size={props.size}>
          <InputGroup.Prepend>
            <InputGroup.Text>{props.caption ? props.caption : '院校'}</InputGroup.Text>
          </InputGroup.Prepend>
          {
            (selected && !props.multiple) ? (
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <Alert.Link className="text-info" size="sm" onClick={() => {
                    setSelected(null)
                    if (props.onSelect) {
                      props.onSelect(null)
                    }
                  }}>
                    {selected.name} [{selected.id}]
                  </Alert.Link>
                </InputGroup.Text>
              </InputGroup.Prepend>
            ) : null
          }
          {
            (!props.multiple && !props.nohide && selected) ? null : (
              <FormControl
                value={keyword}
                onChange={(e) => { setKeyword(e.target.value) }} />
            )
          }
        </InputGroup>
        <ListGroup variant="flush">
          {
            (keyword) ?
              indices
                .filter(i => i.name.includes(keyword) || keyword === `${i.id}`)
                .map((i, idx) => (
                  <ListGroup.Item
                    className="py-1 px-2"
                    action
                    onClick={() => {
                      setKeyword('')
                      setSelected(i)
                      if (props.onSelect) {
                        props.onSelect(i)
                      }
                    }}
                  >
                    <small>
                      {idx + 1}. <strong>{i.name}</strong> [{i.id}]
                  </small>
                  </ListGroup.Item>
                ))
              : null
          }
        </ListGroup>
      </Form.Group>
    </>
  )
}


export { InstituteCard, InstituteList, Labels, InstituteSelector }