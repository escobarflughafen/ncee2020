import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup } from 'react-bootstrap'
import { Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import axios from 'axios'

// Utils
const makePaginations = (currentPage, setCurrentPage, totalPageNum, paginationNum) => {
    var paginations = []
    if (paginationNum < totalPageNum) {
        if (currentPage + paginationNum > totalPageNum) {
            for (let i = totalPageNum - paginationNum + 1; i <= totalPageNum; i++) {
                paginations.push(
                    (
                        <Pagination.Item
                            key={i}
                            active={i === currentPage}
                            onClick={() => setCurrentPage(i)}>
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
                        onClick={() => setCurrentPage(i)}>
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
                        onClick={() => setCurrentPage(i)}>
                        {i}
                    </Pagination.Item>
                )
            )
        }
    }
    return (
        <Pagination>
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev onClick={() => setCurrentPage((currentPage === 1) ? 1 : currentPage - 1)} />
            { paginations}
            <Pagination.Next onClick={() => setCurrentPage((currentPage === totalPageNum) ? totalPageNum : currentPage + 1)} />
            <Pagination.Last onClick={() => setCurrentPage(totalPageNum)} />
        </Pagination>
    )
}

const fetchAllInstitutesInfo = async (queryParams, cb, port = constants.serverPort) => {
    const url = `http://${document.domain}:${port}/institute/getallinfo`
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
    const url = `http://${document.domain}:${port}/institute/getinfo`

    try {
        let req = axios.post(url, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            data: {
                ...queryParams
            }
        })
        cb(await req.then())
    } catch (err) {
        console.error(err)
    }
}

const fetchInstituteInfo = async (instituteId, cb, port = constants.serverPort) => {
    const url = `http://${document.domain}:${port}/institute/${instituteId}/getinfo`
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

// Componenets

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

    const [queryTags, setQueryTags] = useState([])
    const [keyword, setKeyword] = useState("")


    useEffect(() => {
        fetchAllInstitutesInfo({}, (res) => {
            setInstitutes([...res.data.institutes])
        })
    }, [])

    const addTag = (category, label) => {
        if (!queryTags.find(t => (t.category === category) && (t.label === label))) {
            setQueryTags([
                ...queryTags,
                {
                    category: category,
                    label: label
                }
            ])
        }
    }

    const handleQuery = (e) => {
        e.preventDefault();
        queryInstitutesInfo({
            keywordconj: keywordConjunction,
            tags: queryTags
        }, (res) => {
            console.log(res.data.queryParams)
            setInstitutes([...res.data.institutes])
            setCurrentPage(1)
        })
    }

    const addKeyword = (kw) => {
        if (kw != '') {
            addTag('keyword', kw)
        }
    }

    const removeTag = (category, label) => {
        setQueryTags(queryTags.filter((t) => !((t.category === category) && (t.label === label))))
    }

    const [keywordConjunction, setKeywordConjunction] = useState(true)

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
                                    <Form.Group as={Col} controlId="instname" >
                                        <Form.Label>院校名称</Form.Label>
                                        <InputGroup size="sm">
                                            <Form.Control
                                                type="text"
                                                value={keyword}
                                                onChange={(e) => { setKeyword(e.target.value) }}
                                            />
                                            <InputGroup.Append>
                                                <Button
                                                    variant="outline-dark"
                                                    onClick={(e) => { addKeyword(keyword); setKeyword('') }}
                                                >
                                                    添加关键字
                                                </Button>
                                            </InputGroup.Append>
                                        </InputGroup>

                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="province">
                                        <Form.Label>地区</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            as="select"
                                            defaultValue="..."
                                            onChange={
                                                (e) => {
                                                    if (e.target.value !== "...") {
                                                        addTag("region", e.target.value)
                                                        e.target.value='...'
                                                    }
                                                }
                                            }>
                                            <option>...</option>
                                            {constants.regions.map((r) => {
                                                return (<option>{r.region_name}</option>)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="category">
                                        <Form.Label>类型</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            as="select"
                                            defaultValue="..."
                                            onChange={
                                                (e) => {
                                                    if (e.target.value !== "...") {
                                                        addTag("category", e.target.value)
                                                        e.target.value='...'
                                                    }
                                                }
                                            }
                                        >
                                            <option>...</option>
                                            {constants.instituteCategories.map((p) => {
                                                return (<option>{p}</option>)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="label">
                                        <Form.Label>标签</Form.Label>
                                        <Form.Control
                                            size="sm"
                                            as="select"
                                            defaultValue="..."
                                            onChange={
                                                (e) => {
                                                    if (e.target.value !== "...") {
                                                        addTag("tag", e.target.value)
                                                        e.target.value='...'
                                                    }
                                                }
                                            }>
                                            <option>...</option>
                                            {constants.instituteLabels.map((p) => {
                                                return (<option>{p}</option>)
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Row>
                                    <Col>
                                        {
                                            queryTags.map((tag) => {
                                                let tagBadge = {
                                                    'region': 'success',
                                                    'category': 'primary',
                                                    'tag': 'info',
                                                    'keyword': 'secondary'
                                                }
                                                return (
                                                    <Badge className="mr-2"
                                                        variant={tagBadge[tag.category]}
                                                        pill
                                                        onClick={() => removeTag(tag.category, tag.label)}
                                                    >
                                                        {(tag.category === 'keyword') ? '关键字：' : ''}{tag.label}
                                                        <SVG variant="x" />
                                                    </Badge>
                                                )
                                            })
                                        }
                                    </Col>
                                </Row>
                                <hr />
                                <ButtonGroup>
                                    <Button variant="primary" type="submit" size="sm">
                                        查询
                                </Button>
                                    <ButtonGroup toggle>
                                        <ToggleButton
                                            size="sm"
                                            type="checkbox"
                                            variant="outline-dark"
                                            checked={keywordConjunction}
                                            value={(keywordConjunction) ? "conjunction" : "disjunction"}
                                            onChange={(e) => {
                                                console.log(e.currentTarget.checked)
                                                setKeywordConjunction(!keywordConjunction)
                                            }}
                                        >
                                            {((keywordConjunction) ? "合取" : "析取") + "关键字"}
                                        </ToggleButton>
                                    </ButtonGroup>

                                </ButtonGroup>
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
                                (institutes.length > 0) ? (
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
                        return (
                            <ListGroup.Item action onClick={() => { history.push(`${path}/${i.id}`) }}>
                                <Row>
                                    <Col xs="auto" className="d-none d-sm-block">
                                        <Image fluid height={80} width={80} src={i.icon} />
                                    </Col>
                                    <Col sm>
                                        <Row>
                                            <Col xs>
                                                <Image className="d-xs-block d-sm-none mr-2" fluid height={24} width={24} src={i.icon} />
                                                <b>{i.instname}</b>
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
                    }
                    )
                }
            </ListGroup>
            <br />
            <Row>
                <Col>
                    {makePaginations(currentPage, setCurrentPage, totalPageNum, 4)}
                </Col>
                <Col xs={4}>
                    <Form.Control
                        as="select"
                        onChange={(e) => {
                            setCurrentPage(parseInt(e.target.value))
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