import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import constants from '../data/constants'


const QueryPanel = (props) => {
    return (
        <Accordion defaultActiveKey="0">
            <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    搜索条件
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                    <Card.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="instname">
                                    <Form.Label>院校名称</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="province">
                                    <Form.Label>地区</Form.Label>
                                    <Form.Control as="select" defaultValue="...">
                                        <option>...</option>
                                        {constants.provinces.map((p) => {
                                            return (<option>{p}</option>)
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="category">
                                    <Form.Label>类型</Form.Label>
                                    <Form.Control as="select" defaultValue="...">
                                        <option>...</option>
                                        {constants.instituteCategories.map((p) => {
                                            return (<option>{p}</option>)
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="label">
                                    <Form.Label>属性</Form.Label>
                                    <Form.Control as="select" defaultValue="...">
                                        <option>...</option>
                                        {constants.instituteLabels.map((p) => {
                                            return (<option>{p}</option>)
                                        })}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit">
                                查询
                            </Button>
                        </Form>

                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

const Detail = (props) => {
    const id = useParams().id

    return (
        <div>
            {id}
        </div>
    )
}

const InstituteTabs = (props) => {
}

const InstituteTable = (props) => {
    const { path, url, params } = useRouteMatch()
    const history = useHistory()

    const inst = props.inst.sort((a, b) => a.id - b.id)
    const [currentPage, setCurrentPage] = useState(1)
    const instPerPage = props.instperpage


    return (
        <div>
            <ListGroup>
                {
                    inst.slice((currentPage - 1) * instPerPage, currentPage * instPerPage).map((i) => (
                        <ListGroup.Item action onClick={() => { history.push(`${path}/${i.id}`) }}>
                            <Row>
                                <Col sm="auto">
                                    <Image height={80} width={80} src={i.icon} roundedCircle />
                                </Col>
                                <Col>
                                    <Row>
                                        <Col sm="auto">
                                            <b className="mr-2">{i.instname}</b>
                                            <span>
                                                {
                                                    /*
                                                <a href={i.homepage}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
                                                        <path d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.001 1.001 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                                        <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 0 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 0 0-4.243-4.243L6.586 4.672z" />
                                                    </svg>
                                                </a>
    
                                                    */
                                                }
                                            </span>
                                        </Col>
                                        <Col style={{ textAlign: "right" }}>
                                            <span style={{ marginRight: 4 }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                                    <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                                </svg>
                                            </span>
                                            {i.location}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {i.labels.map(
                                                (l) => (<Badge variant="primary" className="mr-1">{l}</Badge>)
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Nav fill>
                                                <Nav.Item>
                                                    <Nav.Link onClick={(e) => { e.stopPropagation(); alert(1234) }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                                                            <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                                                        </svg>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                        </svg>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                                            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                                                        </svg>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <br />
            <Pagination>
                <Pagination.First />
                <Pagination.Prev />
                <Pagination.Item onClick={() => setCurrentPage(1)}>{1}</Pagination.Item>
                <Pagination.Item onClick={() => setCurrentPage(2)}>{2}</Pagination.Item>
                <Pagination.Item onClick={() => setCurrentPage(3)}>{3}</Pagination.Item>
                <Pagination.Next />
                <Pagination.Last />
            </Pagination>
        </div>
    )
}



const InstitutePage = (props) => {
    const { path, url, params } = useRouteMatch()

    return (
        <Router>
            <div>
                <Switch>
                    <Route path={`${path}/:id`}>
                        <Detail />
                    </Route>
                    <Route path={`${path}`} >
                        <QueryPanel />
                        <hr />
                        <InstituteTable inst={constants.sampleData} instperpage={8} />
                    </Route>
                </Switch>

            </div>
        </Router>

    )
}

export default InstitutePage;