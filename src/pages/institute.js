import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup } from 'react-bootstrap'
import { Tabs, Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import axios from 'axios'
import makePaginations from './components/pagination'
import Comments from './components/comments'
import Topics from './components/topics'
import NavigationBar from './components/navigation-bar'


// Utils

const fetchAllInstitutesInfo = async (cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/getallinfo`
  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
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

const fetchInstituteMajors = async (instituteId, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/${instituteId}/fetchmajors`
  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    cb(await req.then())
  } catch (err) {
    console.log(err)
  }
}

// Componenets

const Faculty = (props) => {
  const faculty = props.data

  return (
    <ListGroup.Item>
      <Row>
        <Col >
          <p><b>{faculty.name}</b></p>
        </Col>
      </Row>
      <Row>
        <Col>
          {
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>系别</th>
                  <th>年限</th>
                </tr>
              </thead>
              <tbody>
                {
                  faculty.special.map((major) => (
                    <tr>
                      <td>{major.special_name}</td>
                      <td>{major.limit_year}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          }
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

const InstituteTabs = (props) => {
  const { path, url, params } = useRouteMatch()
  const institute = props.institute
  const [key, setKey] = useState('home')
  const [majors, setMajors] = useState()

  const id = useParams().id

  useEffect(() => {
    fetchInstituteMajors(id, (majors) => {
      setMajors(majors.data)
      console.log(majors.data)
    })
  }, [])

  const MajorTable = (props) => {

    return (
      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>系别</th>
              <th>院系</th>
              <th>年限</th>
            </tr>
          </thead>
          <tbody>
            {
              (majors) ? majors.data.special.map(
                (faculty) =>
                  faculty.special.map((major) => (
                    <tr>
                      <td>
                        {major.special_name}
                        {
                          (major.nation_feature === '1') ? (<Badge className="ml-1" variant="success">国家级特色专业</Badge>) : (<></>)
                        }
                      </td>
                      <td>{faculty.name}</td>
                      <td>{(major.limit_year) ? major.limit_year : "四年"}</td>
                    </tr>
                  ))
              ) : (<></>)
            }
          </tbody>
        </Table>
      </div>
    )
  }

  const ScoreTable = (props) => {
    const [region, setRegion] = useState('44')
    return (
      <div>
        <Row className="mb-2">
          <Col>
            <Card.Title>历年录取分数</Card.Title>
          </Col>
          <Col xs="auto">
            <FormControl
              as="select"
              size="sm"
              value={constants.regions.find(r => r.region_id === region).region_name}
              onChange={(e) => {
                setRegion(constants.regions.find(r => r.region_name === e.target.value).region_id)
              }}
            >
              {constants.regions.map(region => (
                <option>{region.region_name}</option>
              ))}
            </FormControl>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>年份</th>
                  <th>理科</th>
                  <th>文科</th>
                </tr>
              </thead>
              <tbody>
              {
                (institute.raw.pro_type_min[region]) ?
                  institute.raw.pro_type_min[region].map((score) => (
                    <tr>
                      <td>{score.year}</td>
                      <td>{score.type['1'] || score.type['2'] || score.type['3']}</td>
                      <td>{score.type['2'] || score.type['3']}</td>
                    </tr>
                  ))
                  : (<tr><td colSpan={3}>暂无数据</td></tr>)
              }
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }

  return (
    <div>
      <Tab.Container defaultActiveKey="general">
        <Card>
          <Card.Header>
            <Nav variant="tabs" defaultActiveKey="general">
              <Nav.Item>
                <Nav.Link eventKey="general">概览</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="major">开设专业</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="data">数据</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="comments">讨论</Nav.Link>
              </Nav.Item>
            </Nav>
          </Card.Header>
          <Tab.Content>
            <Tab.Pane eventKey="general">
              <Card.Body>
                <Card.Title>介绍</Card.Title>
                <Card.Text>
                  {institute.raw.content}...
                </Card.Text>
                <hr />
                <Card.Title>规模</Card.Title>
                <Card.Text>
                  <div>
                    <Row>
                      {
                        [
                          { variant: 'Primary', data: (majors) ? majors.data.special_detail["1"].length : institute.raw.num_subject, title: "开设专业" },
                          { variant: 'Warning', data: institute.raw.num_master, title: "硕士点" },
                          { variant: 'Success', data: institute.raw.num_doctor, title: "博士点" },
                          { variant: 'Light', data: institute.raw.num_library + "册", title: "图书馆藏" },
                          { variant: 'Dark', data: institute.raw.num_lab, title: "重点实验室" },
                        ].map((feature, idx) => (
                          <Col xs="auto">
                            <Card
                              bg={feature.variant.toLowerCase()}
                              key={idx}
                              text={feature.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                              style={{ textAlign: "center", width: "fit-content" }}
                              className="mt-2"
                            >
                              <Card.Header>{feature.title}</Card.Header>
                              <Card.Body>
                                <h3>{feature.data}</h3>
                              </Card.Body>
                            </Card>
                          </Col>
                        ))}

                    </Row>
                  </div>
                </Card.Text>
                <hr />
                <ScoreTable />
                <hr />
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Tab.Pane>
            <Tab.Pane eventKey="major">
              <Card.Body>
                <Card.Title>专业列表</Card.Title>
                <Card.Text>
                  <MajorTable />
                </Card.Text>
              </Card.Body>
            </Tab.Pane>
            <Tab.Pane eventKey="data">
              <Card.Body>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Tab.Pane>

            <Tab.Pane eventKey="comments">
              <Card.Body>
                <Card.Title>院校评价</Card.Title>
                <Card.Text>
                  <Comments itemperpage={8} />
                  <ListGroup variant="flush">
                    {['123', '666', '111'].map(p => (<ListGroup.Item>
                      <Row>
                        <Col>
                          {p}
                        </Col>
                      </Row>
                      <Row>
                        <Col className="annotation">
                          {Math.floor(Math.random() * 1000)}
                        </Col>
                      </Row>
                    </ListGroup.Item>))}
                  </ListGroup>
                </Card.Text>
                <Card.Title>相关讨论</Card.Title>
                <Card.Text>
                  <Topics itemperpage={8} />
                  <ListGroup variant="flush">
                    {['[讨论]123', '[讨论]666', '[讨论]111'].map(p => (<ListGroup.Item>
                      <Row className="align-items-center">
                        <Col xs="auto">
                          {p}
                        </Col>
                        <Col>
                        </Col>
                        <Col xs="auto" className="annotation">
                          {new Date().toUTCString()}
                        </Col>
                      </Row>
                    </ListGroup.Item>))}
                  </ListGroup>
                </Card.Text>
              </Card.Body>
            </Tab.Pane>
          </Tab.Content>
        </Card>
      </Tab.Container>
    </div>
  )
}

const Labels = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const labels = props.labels

  return (
    <div>
      {
        (labels) ?
          labels.map(
            (l, idx) => ((l) ? (<Badge variant={["primary", "secondary", "success", "info"][idx % 4]}
              className="mr-1"
              onClick={(e) => {
                history.push({
                  pathname: '/institute',
                  state: {
                    queryParams: [l]
                  }
                })
              }}
            >{l.label}</Badge>) : (<></>))
          ) : []
      }
    </div>
  )
}


const Detail = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const id = useParams().id

  const [institute, setInstitute] = useState()

  useEffect(() => {
    fetchInstituteInfo(id, (institute) => {
      setInstitute(institute.data)
      console.log(institute.data)
    })
  }, [])

  const Header = () => {
    return (
      <div className="mb-3">
        <div className="container">
          <Row>
            <Col xs="auto">
              <Row className="mb-2">
                <Col>
                  <Image width={96} height={96} src={`https://static-data.eol.cn/upload/logo/${institute.id}.jpg`} />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="outline-success" size="sm" block>
                    关注
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <p>
                <Row>
                  <Col xs="auto">
                    <span className="institute-name-150">
                      {institute.name}
                      <span className="annotation mx-1" style={{ fontFamily: 'monospace' }}>
                        #{institute.raw.code_enroll}
                      </span>
                      <a className="ml-1" href={institute.website}>
                        <SVG variant="link-45deg" />
                      </a>
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="annotation">
                      <span className="mr-2">
                        <SVG variant="location" />
                      </span>
                      <span>
                        {institute.address}
                      </span>
                    </div>
                    {
                      (institute.email) ? (
                        <div className="annotation">
                          <span className="mr-2">
                            <SVG variant="email" />
                          </span>
                          <a href={`mailto:${institute.email}`}>
                            {institute.email}
                          </a>
                        </div>
                      ) : (<></>)
                    }
                  </Col>
                </Row>
              </p>
              <Row>
                <Col>
                  <p>
                    <Labels labels={institute.labels} />
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <u>
                    <b>{Math.floor(Math.random() * 1000)}</b>
                  </u> 人关注
                </Col>
              </Row>
            </Col>
            <Col className="d-none d-lg-block">
              //desc
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  return (
    <div>
      {
        (institute) ?
          (
            <>
              <Header />
              <InstituteTabs institute={institute} />
            </>
          ) : (<></>)
      }
    </div>
  )
}

// TODO: InstituteCard

const InstituteTable = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const location = useLocation()

  const [institutes, setInstitutes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const instPerPage = props.instperpage
  const totalPageNum = Math.ceil(institutes.length / instPerPage)

  const [queryTags, setQueryTags] = useState((location.state) ? location.state.queryParams : [])
  const [keyword, setKeyword] = useState("")

  const [allInstituteInfo, setAllInstituteInfo] = useState([])

  const handleQuery = (e) => {
    if (e) e.preventDefault();
    if (queryTags.length == 0) {
      if (allInstituteInfo.length == 0) {
        fetchAllInstitutesInfo((res) => {
          console.log('fetching all data')
          setAllInstituteInfo([...res.data.institutes])
          setInstitutes([...res.data.institutes])
          setCurrentPage(1)
        })
      } else {
        console.log('getting data from cache')
        setInstitutes([...allInstituteInfo])
        setCurrentPage(1)
      }
    } else {
      queryInstitutesInfo({
        keywordconj: keywordConjunction,
        tags: queryTags
      }, (res) => {
        console.log(res.data.queryParams)
        setInstitutes([...res.data.institutes])
        setCurrentPage(1)
      })
    }
  }

  useEffect(() => {
    handleQuery()
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

  const addKeyword = (kw) => {
    if (kw != '') {
      addTag('keyword', kw)
    }
  }

  const removeTag = (tag) => {
    if (tag.category === 'removeAll') {
      setQueryTags([])
    } else {
      setQueryTags(queryTags.filter((t) => !((t.category === tag.category) && (t.label === tag.label))))
    }
  }

  const [keywordConjunction, setKeywordConjunction] = useState(true)

  useEffect(() => {
    handleQuery()
  }, [queryTags])

  return (
    <div>
      <Card className="mb-3">
        <Accordion defaultActiveKey="0">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            搜索条件
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div>
                <Form.Row>
                  <Form.Group as={Col} controlId="instname" >
                    <Form.Label>院校名称</Form.Label>
                    <InputGroup size="sm">
                      <Form.Control
                        type="text"
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}
                        onKeyPress={(e) => { if (e.code === 'Enter') { addKeyword(keyword); setKeyword('') } }}
                      />
                      <InputGroup.Append>
                        <Button
                          variant="dark"
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
                            e.target.value = '...'
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
                            e.target.value = '...'
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
                            e.target.value = '...'
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
                          'keyword': 'dark',
                          'removeAll': 'danger'
                        }
                        return (
                          <Badge className="mr-2"
                            variant={tagBadge[tag.category]}
                            pill
                            onClick={() => removeTag(tag)}
                          >
                            {(tag.category === 'keyword') ? '关键字：' : ''}
                            {tag.label}
                            <SVG variant="x" />
                          </Badge>
                        )
                      })
                    }
                    {
                      (queryTags.length > 0) ? (
                        <Badge
                          variant="danger"
                          onClick={() => { removeTag({ category: 'removeAll' }) }}
                          pill>
                          移除搜索条件
                          <SVG variant="trash" />
                        </Badge>
                      ) : (
                          <></>
                        )
                    }
                  </Col>
                </Row>
                <hr />
                <ButtonGroup>
                  <Button variant="primary" type="button" size="sm" onClick={handleQuery}>
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
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Accordion>
      </Card>

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
                          setInstitutes([...institutes.sort((a, b) => a.name.localeCompare(b.name, 'zh'))])
                          break;
                        case "地区":
                          setInstitutes([...institutes.sort((a, b) => a.location.localeCompare(b.location, 'zh'))])
                          break;
                        case "类别":
                          setInstitutes([...institutes.sort((a, b) => a.labels.join(',').localeCompare(b.labels.join(','), 'zh'))])
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
                    <Row >
                      <Col xs>
                        <Image className="d-xs-block d-sm-none mr-2" fluid height={24} width={24} src={i.icon} />
                        <b>{i.name}</b>
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
  const location = useLocation();
  const [instperpage, setInstperpage] = useState(Math.floor(window.innerHeight / 40))

  return (
    <Router>
      <div>
        <Switch>
          <Route path={`${path}/:id`}>
            <Detail />
          </Route>
          <Route path={`${path}`} exact={true}>
            <InstituteTable instperpage={instperpage} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default InstitutePage;