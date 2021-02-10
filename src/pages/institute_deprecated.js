import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { useState, useEffect } from 'react'
import { Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import axios from 'axios'

// Utils
const makePaginations = (currentPage, handlePagination, totalPageNum, paginationNum) => {
    var paginations = []
    if (paginationNum < totalPageNum) {
        if (currentPage + paginationNum > totalPageNum) {
            for (let i = totalPageNum - paginationNum + 1; i <= totalPageNum; i++) {
                paginations.push(
                    (
                        <Pagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => handlePagination(i)}>
                            {i}
                        </Pagination.Item>
                    )
                )
            }
        } else {
            for (let i = currentPage; i < currentPage + paginationNum; i++) {
                paginations.push(
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePagination(i)}>
                        {i}
                    </Pagination.Item>
                )
            }
        }
    } else {
        for (let i = 1; i <= totalPageNum; i++) {
            paginations.push(
                (
                    <Pagination.Item
                        key={i}
                        active={i === currentPage}
                        onClick={() => handlePagination(i)}>
                        {i}
                    </Pagination.Item>
                )
            )
        }
    }
    return (
        <Pagination>
            <Pagination.First onClick={() => handlePagination(1)} />
            <Pagination.Prev onClick={() => handlePagination((currentPage === 1) ? 1 : currentPage - 1)} />
            { paginations}
            <Pagination.Next onClick={() => handlePagination((currentPage === totalPageNum) ? totalPageNum : currentPage + 1)} />
            <Pagination.Last onClick={() => handlePagination(totalPageNum)} />
        </Pagination>
    )
}

const fetchAllInstitutesInfo = async (queryParams, cb, port = constants.serverPort) => {
    const url = `http://localhost:${port}/institute/getallinfo`
    try {
        let req = axios.post(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                ...queryParams,
            }
        })
        cb(await req.then())
    } catch (err) {
        console.error(err)
    }
}

const queryInstitutesInfo = async (queryParams, cb, port = constants.serverPort) => {
    const url = `http://localhost:${port}/institute/getinfo`
    try {
        let req = axios.post(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                query: queryParams
            }
        })
        cb(await req.then())
    } catch (err) {
        console.error(err)
    }
}

const fetchInstituteInfo = async (instituteId, cb, port = constants.serverPort) => {
    const url = `http://localhost:${port}/institute/${instituteId}/getinfo`
    try {
        let req = axios.post(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
        cb(await req.then())
    } catch (err) {
        console.error(err)
    }

}

const convertData = (raw) => {
    return {
        id: raw.school_id,
        icon: `https://static-data.eol.cn/upload/logo/${raw.school_id}.jpg`,
        labels: [
            (raw.f985 === '1') ? '985' : null,
            (raw.f211 === '1') ? '211' : null,
            raw.level_name,
            raw.type_name,
            raw.school_nature_name,
            raw.dual_class_name
        ],
        instname: raw.name,
        tel: raw.phone,
        email: raw.email,
        location: `${raw.province_name}，${raw.city_name}`,
        brief: raw.content
    }
}

// Componenets
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

    const [institute, setInstitute] = useState({})

    useEffect(() => {
        fetchInstituteInfo(id, (res) => {
            setInstitute(res.data.data)
        })
    }, [])

    return (
        <div>
            <span>
                {JSON.stringify(institute)}
                <hr />
            </span>
        </div>
    )
}

const InstituteTabs = (props) => {

}


// TODO
const InstituteCard = (props) => {

}

const InstituteTable = (props) => {
    const { path, url, params } = useRouteMatch()
    const history = useHistory()

    const [institutes, setInstitutes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const instPerPage = props.instperpage
    const totalPageNum = Math.ceil(institutes.length / instPerPage)

    var queryParams = {
        keyword: "",
        location: "",
        category: "",
        labels: "",
    }

    useEffect(() => {
        fetchAllInstitutesInfo(queryParams, (res) => {
            /*
            setInstitutes([...res.data.institutes.map((i) => {
                return {
                    id: i.data.school_id,
                    data: {}
                }
            })])
            */
            let inst = res.data.institutes.map((i) => {
                return {
                    id: i.data.school_id,
                    data: null
                }
            })
            setInstitutes([...inst])
        })
    }, [])

    useEffect(() => {
        handlePagination(1)
    }, [])


    const handleQuery = (e) => {
        e.preventDefault();
        queryInstitutesInfo(queryParams, (res) => {
            let institutes = res.data.map((i) => i.data)
            institutes = institutes.map((i) => convertData(i)).sort((a, b) => parseInt(a.id) - parseInt(b.id))
            setInstitutes(institutes)
        })
    }

    const handlePagination = (n) => {
        var startFrom = (n - 1) * instPerPage
        var endAt = n * instPerPage
        var currentPageInstitutes = [...institutes.slice(startFrom, endAt)]
        for (let i = 0; i < currentPageInstitutes.length; i++) {
            if (1) {
                let url = `http://localhost:${constants.serverPort}/institute/${currentPageInstitutes[i].id}/getinfo`
                axios.post(url, {
                    headers: {
                        'Access-Control-Allow-Origin': '*'
                    }
                }).then(res => {
                    currentPageInstitutes[i].data = convertData(res.data.data)
                    setInstitutes([...institutes.slice(0, startFrom + i), currentPageInstitutes[i], ...institutes.slice(startFrom + 2, institutes.length)])
                })
            }
        }
        setCurrentPage(n)
    }


    return (
        <div>
            <Accordion defaultActiveKey="0">
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        搜索条件
                </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Form onSubmit={handleQuery}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="instname">
                                        <Form.Label>院校名称</Form.Label>
                                        <Form.Control type="text" onChange={(e) => {
                                            queryParams.keyword = e.target.value
                                        }} />
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
            <hr />
            <ListGroup>
                <ListGroup.Item style={{ backgroundColor: "rgba(0,0,0,.03)" }}>
                    <Row>
                        <Col className="mr-auto">
                            搜索结果<span className="annotation">（共 {institutes.length} 项）</span>
                            <br />
                            {
                                (institutes.count > 0) ? (
                                    <span className="annotation">
                                        第 {(currentPage - 1) * instPerPage + 1}~{(currentPage * instPerPage > institutes.length) ? institutes.length : (currentPage * instPerPage)} 项
                                    </span>

                                ) :
                                    (<></>)
                            }
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
                                                    setInstitutes([...institutes.sort((a, b) => a.labels.join(',').localeCompare(b.labels.join(',')))])
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
                    institutes.slice((currentPage - 1) * instPerPage, currentPage * instPerPage).map((i, idx) => {
                        if (i.data) {
                            return (
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
                                                    <span className="annotation">
                                                        <SVG variant="location" />
                                                        {i.location}
                                                    </span>
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
                                                    {i.brief}...
                                        </span>
                                            </Row>
                                            <Row>

                                            </Row>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )
                        } else {
                            return "empty"

                        }
                    }
                    )
                }
            </ListGroup>
            <br />
            <Row>
                <Col>
                    {makePaginations(currentPage, handlePagination, totalPageNum, 4)}
                </Col>
                <Col xs={4}>
                    <Form.Control
                        as="select"
                        onChange={(e) => {
                            handlePagination(parseInt(e.target.value))
                        }}
                        value={currentPage}>
                        {
                            [...Array(totalPageNum).keys()].map((n, idx) => {
                                return (
                                    <option>{idx + 1}</option>
                                )
                            })
                        }
                    </Form.Control>
                </Col>
            </Row>
        </div>
    )
}



const InstitutePage = (props) => {
    const { path, url, params } = useRouteMatch()
    const [instperpage, setInstperpage] = useState(Math.floor(window.innerHeight / 40))

    return (
        <Router>
            <div>
                <Switch>
                    <Route path={`${path}/:id`}>
                        <Detail />
                    </Route>
                    <Route path={`${path}`} >
                        <InstituteTable inst={constants.sampleData} instperpage={instperpage} />
                    </Route>
                </Switch>

            </div>
        </Router>

    )
}

export default InstitutePage;