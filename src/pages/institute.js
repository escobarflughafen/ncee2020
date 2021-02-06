import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { useState } from 'react'
import { Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'

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
    const [institutes, setInstitutes] = useState(inst)
    const [currentPage, setCurrentPage] = useState(1)
    const instPerPage = props.instperpage
    const totalPageNum = Math.ceil(institutes.length / instPerPage)
    return (
        <div>
            <ListGroup>
                <ListGroup.Item style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
                    <Row>
                        <Col className="mr-auto">
                            搜索结果<span className="annotation">（共 {institutes.length} 项）</span>
                            <br />
                            <span className="annotation">
                                第 {(currentPage - 1) * instPerPage + 1}~{(currentPage * instPerPage > institutes.length) ? institutes.length : (currentPage * instPerPage)} 项
                            </span>
                        </Col>
                        <Col xs="auto" sm="auto">
                            <Row>
                                <span>
                                    <SVG variant="sort" />
                                </span>
                                <Col className="ml-auto">
                                    <Form.Control as="select" defaultValue="名称" size="sm" onChange={
                                        (e) => {
                                            switch (e.target.value) {
                                                case "校名":
                                                    setInstitutes([...institutes.sort((a, b) => a.instname.localeCompare(b.instname))])
                                                    break;
                                                case "地区":
                                                    setInstitutes([...institutes.sort((a, b) => a.location.localeCompare(b.location))])
                                                    break;
                                                case "类别":
                                                    setInstitutes([...institutes.sort((a, b) => a.labels[0].localeCompare(b.labels[0]))])
                                                    break;
                                                default:
                                                    return 0
                                            }
                                        }
                                    }>
                                        <option>校名</option>
                                        <option>地区</option>
                                        <option>类别</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </ListGroup.Item>
                {
                    institutes.slice((currentPage - 1) * instPerPage, currentPage * instPerPage).map((i) => (
                        <ListGroup.Item action onClick={() => { history.push(`${path}/${i.id}`) }}>
                            <Row>
                                <Col xs="auto" className="d-none d-sm-block">
                                    <Image fluid height={80} width={80} src={i.icon} />
                                </Col>
                                <Col sm>
                                    <Row>
                                        <Col xs>
                                            <b>{i.instname}</b>
                                        </Col>
                                        <Col style={{ textAlign: "right" }} xs>
                                            <Badge>
                                            <SVG variant="location" />
                                            {i.location}
                                            </Badge>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {i.labels.map(
                                                (l, idx) => (<Badge variant={["primary", "secondary", "success", "info"][idx % 4]} className="mr-1">{l}</Badge>)
                                            )}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Nav fill>
                                                <Nav.Item>
                                                    <Nav.Link onClick={(e) => { e.stopPropagation(); alert(1234) }}>
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
                                <Col className="d-none d-lg-block">
                                    <Row>
                                        <span className="annotation">
                                也就是说，我们将使用axios库来代替浏览器和服务器之间的通信。 它的功能类似于fetch，但是使用起来更友好。 使用 axios 的另一个很好的理由是，我们已经熟悉了为 React 项目添加外部库，即使用所谓的npm 包。
                                        </span>
                                    </Row>
                                    <Row>

                                    </Row>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            <br />
            <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={() => setCurrentPage((currentPage === 1) ? 1 : currentPage - 1)} />
                {
                    [...Array(totalPageNum).keys()].map((n, idx) => {
                        return (
                            <Pagination.Item key={idx} active={currentPage === idx + 1} onClick={() => setCurrentPage(idx + 1)}>
                                {idx + 1}
                            </Pagination.Item>
                        )
                    })
                }
                <Pagination.Next onClick={() => setCurrentPage((currentPage === totalPageNum) ? totalPageNum : currentPage + 1)} />
                <Pagination.Last onClick={() => setCurrentPage(totalPageNum)} />
            </Pagination>
        </div>
    )
}



const InstitutePage = (props) => {
    const { path, url, params } = useRouteMatch()
    const [instperpage, setInstperpage] = useState(Math.floor(window.innerHeight / 100))

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
                        <InstituteTable inst={constants.sampleData} instperpage={instperpage} />
                    </Route>
                </Switch>

            </div>
        </Router>

    )
}

export default InstitutePage;