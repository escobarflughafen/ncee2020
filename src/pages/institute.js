import 'bootstrap/dist/css/bootstrap.min.css'
import '../style.css'
import { useState, useEffect } from 'react'
import { ButtonGroup, ToggleButton, Accordion, Card, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, InputGroup, CardColumns } from 'react-bootstrap'
import { Tabs, Image, Badge, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useParams, useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import constants from '../utils/constants'
import SVG from '../utils/svg'
import axios from 'axios'
import { makePaginations } from './components/pagination'
import { TopicList, NewTopicForm } from './components/topic'
import { PostList, NewPostForm } from './components/post'
import { InstituteCard, Labels, InstituteFollowButton, InstitutePredictionForm } from './components/institute'
import { Bar, Line } from 'react-chartjs-2'

// Utils

const fetchAllInstitutesInfo = async (cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/getallinfo`
  try {
    let req = axios.get(url, {
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
  const url = `http://${document.domain}:${port}/institute/${instituteId}/`
  try {
    const token = window.localStorage.getItem('token')
    const auth = (token) ? `bearer ${token}` : null
    let req = axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'auth': auth
      }
    })
    cb(await req.then())
  } catch (err) {
    console.error(err)
  }

}

const fetchInstituteMajors = async (instituteId, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/${instituteId}/majors`
  try {
    let req = axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
    cb(await req.then())
  } catch (err) {
    console.log(err)
  }
}

/*
  instituteId: 学校ID,
  type: 文理科, 在utils/constants.js 有定义,
  score: 分数,
  region: 区域,
  cb: 回调函数,
  port: 服务器端口
*/

const fetchInstitutesWithinScoreRange = async (instituteId, type, region, cb, range = 5, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/${instituteId}/fetchinstitutebyscore`
  try {
    let req = axios.post(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      id: instituteId,
      range: range,
      type: type,
      region: region
    })
    cb(await req.then())
  } catch (err) {
    console.log(err)
  }
}


const fetchInstituteEnrollData = async (instituteId, cb, port = constants.serverPort) => {
  const url = `http://${document.domain}:${port}/institute/${instituteId}/enroll`
  try {
    let req = axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      id: instituteId,
    })
    cb(await req.then())
  } catch (err) {
    console.log(err)
  }
}

const MajorTable = (props) => {

  const majors = props.majors
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

const EnrollTable = (props) => {
  const id = props.iid
  const [data, setData] = useState([])
  const [region, setRegion] = useState(constants.regions.find((r) => r.region_id === '44'))
  const [year, setYear] = useState('2019')
  const [type, setType] = useState()
  const [enroll, setEnroll] = useState()
  const [regionData, setRegionData] = useState([])
  const [selectedMajor, setSelectedMajor] = useState('')
  const institute = props.institute

  useEffect(() => {
    fetchInstituteEnrollData(id, (res) => {
      if (res.data) {
        console.log(res.data)
        setData(res.data)
        setType([...res.data.filter((d) => d.region === region.region_id && d.year === year).map((d) => d.type).sort((a, b) => a.length - b.length)][0])
      }
    })
  }, [])

  useEffect(() => {
    if (data.length) {
      setType([...data.filter((d) => d.region === region.region_id && d.year === year).map((d) => d.type).sort((a, b) => a.length - b.length)][0])
    }
  }, [year, region])

  useEffect(() => {
    setEnroll(data.find(d => d.region === region.region_id && d.type === type && d.year === year))
  }, [region, year, type])

  useEffect(() => {
    if (data.length) {
      setRegionData(data
        .filter(d => d.region === region.region_id && d.type === type)
        .flatMap(yearData => yearData.scores
          .map(s => { return { ...s, year: yearData.year } })))
    }
  }, [region, type])

  return (
    <div>
      <Card.Title>各专业录取数据</Card.Title>
      <Row className="mb-2">
        <Col className="pr-0">
          <FormControl
            as="select"
            size="sm"
            value={year}
            onChange={(e) => {
              setYear(e.target.value)
            }}
          >
            {['2019', '2018', '2017', '2016'].map(yr => (
              <option>{yr}</option>
            ))}
          </FormControl>
        </Col>
        <Col className="pr-0">
          <FormControl
            as="select"
            size="sm"
            value={type}
            onChange={(e) => {
              setType(e.target.value)
            }}
          >
            {[...data.filter((d) => d.region === region.region_id && d.year === year).map((d) => d.type).sort((a, b) => a.length - b.length)].map(t => (
              <option>{t}</option>
            ))}
          </FormControl>
        </Col>
        <Col >
          <FormControl
            as="select"
            size="sm"
            value={region.region_name}
            onChange={(e) => {
              setRegion(constants.regions.find(r => r.region_name === e.target.value))
            }}
          >
            {constants.regions.map(region => (
              <option>{region.region_name}</option>
            ))}
          </FormControl>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 12, order: 1 }} lg={{ span: 6, order: 12 }} className="mb-3">
          <Row className="mb-3">
            <Col>
              <Bar data={
                {
                  labels: (enroll) ? enroll.scores.map(score => score.major_name.split('（')[0]) : [],
                  datasets: [
                    {
                      label: '平均分',
                      yAxisID: 'score',
                      backgroundColor: 'rgba(76, 159, 182, 0.5)',
                      borderWidth: 1,
                      data: (enroll) ? enroll.scores.map(score => (score.score_avg) ? score.score_avg : 0) : []
                    },
                    {
                      label: '最低分',
                      yAxisID: 'score',
                      backgroundColor: 'rgba(40, 167, 69, 0.5)',
                      borderWidth: 1,
                      data: (enroll) ? enroll.scores.map(score => (score.score_min) ? score.score_min : 0) : []
                    },
                    {
                      label: '最低排名',
                      yAxisID: 'rank',
                      backgroundColor: 'rgba(255, 193, 8, 0.5)',
                      borderWidth: 1,
                      data: (enroll) ? enroll.scores.map(score => (score.rank_min) ? score.rank_min : 0) : []
                    },
                  ],
                }
              }
                options={
                  (() => {
                    let min_score_avg = (enroll) ? enroll.scores
                      .map(s => s.score_avg)
                      .sort((a, b) => a - b)[0] : -1;
                    let max_score_avg = (enroll) ? enroll.scores
                      .map(s => s.score_avg)
                      .sort((a, b) => b - a)[0] : -1;
                    let min_score_min = (enroll) ? enroll.scores
                      .map(s => s.score_min)
                      .sort((a, b) => a - b)[0] : -1;
                    let max_score_min = (enroll) ? enroll.scores
                      .map(s => s.score_min)
                      .sort((a, b) => b - a)[0] : -1;
                    let min_rank_min = (enroll) ? enroll.scores
                      .map(s => s.rank_min)
                      .sort((a, b) => a - b)[0] : -1;
                    let max_rank_min = (enroll) ? enroll.scores
                      .map(s => s.rank_min)
                      .sort((a, b) => b - a)[0] : -1;

                    let min_score;

                    if (max_score_min === -1) {
                      min_score = min_score_avg
                    } else {
                      min_score = min_score_min
                    }

                    let max_score = max_score_avg


                    let padding_score = Math.round((max_score - min_score) / 10)
                    let padding_rank = Math.round((max_rank_min - min_rank_min) / 10)
                    return {
                      scales: {
                        xAxes: [
                          {
                            stacked: true
                          }
                        ],
                        yAxes: [
                          {
                            id: 'score',
                            position: 'left',
                            stacked: true,
                            ticks: {
                              min: Math.max(0, min_score - padding_score),
                              max: Math.max(0, max_score + padding_score)
                            }
                          },
                          {
                            id: 'rank',
                            position: 'right',
                            stacked: false,
                            ticks: {
                              min: Math.max(0, min_rank_min - padding_rank),
                              max: Math.max(0, max_rank_min + padding_rank)
                            }
                          },
                        ]
                      }
                    }
                  })()
                } />
            </Col>
          </Row>
          <Row>
            <Col>
              <Row>
                <Col>
                  <h6>专业最低排名变化</h6>
                </Col>
                <Col>
                  <Form.Control
                    as="select"
                    size="sm"
                    value={selectedMajor}
                    onChange={(e) => { setSelectedMajor(e.target.value) }}
                  >
                    <option value=''>选择专业...</option>
                    {
                      [...new Set(regionData
                        .map(d => d.major_name.split('（')[0]))]
                        .filter(d => d !== '-')
                        .map(majorName => (<option>{majorName}</option>))
                    }
                  </Form.Control>
                </Col>
              </Row>
              {
                (selectedMajor) ?
                  (<Line data={
                    (() => {
                      let data = regionData.filter(d => d.major_name.split('（')[0] === selectedMajor)
                      console.log(data)
                      return {
                        labels: data.map(d => d.year),
                        datasets: [{
                          label: '最低排名',
                          data: data.map(d => d.rank_min)
                        }]
                      }
                    })()
                  }
                    options={
                      {

                      }
                    } />) : null
              }
            </Col>
          </Row>
        </Col>
        <Col xs={{ span: 12, order: 12 }} lg={{ span: 6, order: 1 }}>
          <Row>
            <Col>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>专业</th>
                    <th>录取批次</th>
                    <th>平均分</th>
                    <th>最低分</th>
                    <th>最低名次</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (enroll) ?
                      enroll
                        .scores.map(
                          (score) => (
                            <tr>
                              <td>{score.major_name.split('（')[0]}</td>
                              <td>{score.enroll_batch}</td>
                              <td>{score.score_avg}</td>
                              <td>{score.score_min}</td>
                              <td>{score.rank_min}</td>
                            </tr>
                          )
                        )
                      : (<tr><td colSpan={5}>暂无数据</td></tr>)
                  }
                </tbody>
              </Table>
            </Col>
          </Row >
        </Col>
      </Row>
      <Row>
        <Col>
          <Card.Title>
            投档线预测
            </Card.Title>
          <Row>
            <Col xs={6}>
              <InstitutePredictionForm institute={institute}/>
            </Col>
            <Col xs={6}>
              
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

const InstituteTabs = (props) => {
  const { path, url, params } = useRouteMatch()
  const institute = props.institute
  const [majors, setMajors] = useState()

  const id = useParams().id

  useEffect(() => {
    fetchInstituteMajors(id, (majors) => {
      setMajors(majors.data)
      console.log(majors.data)
    })
  }, [])


  const ScoreTable = (props) => {
    const [region, setRegion] = useState(constants.regions.find(r => r.region_id === '44'))
    const [relatedInstitutes, setRelatedInstitutes] = useState([])
    const [relatedType, setRelatedType] = useState(constants.types[0])

    const match = useRouteMatch()
    const history = useHistory()

    useEffect(() => {
      fetchInstitutesWithinScoreRange(id, relatedType.type_id, region.region_id, (res) => {
        if (res.data) {
          console.log(res.data)
          setRelatedInstitutes([...(res.data.institutes.filter(i => i.id != id))])
        } else {
          setRelatedInstitutes([])
        }
      })
    }, [region, relatedType])

    return (
      <div>
        <Row className="mb-2">
          <Col>
            <Card.Title>历年最低录取分数</Card.Title>
          </Col>
          <Col xs="auto">
            <FormControl
              as="select"
              size="sm"
              value={region.region_name}
              onChange={(e) => {
                setRegion(constants.regions.find(r => r.region_name === e.target.value))
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
                  (institute.raw.pro_type_min[region.region_id]) ?
                    institute.raw.pro_type_min[region.region_id].map((score) => (
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
            <Button variant="outline-success" size="sm" className="mb-3" onClick={(e) => {
              history.push('stat')
            }}>各专业数据→</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col>
                <p><strong>分数相近院校</strong></p>
              </Col>
              <Col xs="auto">
                <FormControl
                  as="select"
                  size="sm"
                  value={relatedType.type_name}
                  onChange={(e) => {
                    setRelatedType(constants.types.find(t => t.type_name === e.target.value))
                  }}
                >
                  {['理科', '文科'].map(type => (
                    <option>{type}</option>
                  ))}
                </FormControl>

              </Col>
            </Row>
            <ListGroup>
              {(relatedInstitutes.length > 0) ?
                relatedInstitutes.map((i) => (
                  <InstituteCard institute={i} size="sm" score={i.score.split(".")[0]} />
                )) : (<span>未找到符合条件的院校</span>)}

            </ListGroup>
          </Col>
        </Row>
      </div>
    )
  }


  const [posts, setPosts] = useState([])
  const [topics, setTopics] = useState([])

  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/post/fetch`
    console.log(institute._id)
    axios.post(url, {
      queryParams: {
        relatedInstitute: institute._id
      }
    }).then((res) => {
      console.log(res)
      setPosts(res.data.posts)
    })
  }, [])

  useEffect(() => {
    const url = `http://${document.domain}:${constants.serverPort}/topic/fetch`
    console.log(institute._id)
    axios.post(url, {
      queryParams: {
        relatedInstitute: institute._id
      }
    }).then((res) => {
      console.log(res)
      setTopics(res.data.topics)
    })
  }, [])



  return (
    <div>
      <Tab.Container>
        <Card>
          <Router>
            <Card.Header>
              <Nav variant="tabs">
                <Nav.Item>
                  <NavLink to={`general`} className="nav-link p-2" activeClassName="active">概览</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={`major`} className="nav-link p-2" activeClassName="active">开设专业</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={`stats`} className="nav-link p-2" activeClassName="active">数据</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={`discuss`} className="nav-link p-2" activeClassName="active">讨论</NavLink>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Switch>
              <Route path={`${url}`} exact={true}>
                <Redirect to={`${url}/general`} />
              </Route>
              <Route path={`${url}/general`}>
                <Card.Body>
                  <Card.Title>介绍</Card.Title>
                  <Card.Text>
                    {institute.raw.content}...
                </Card.Text>
                  <hr />
                  <Card.Title>规模</Card.Title>
                  <CardColumns>
                    {
                      [
                        { variant: 'Primary', data: (majors) ? majors.data.special_detail["1"].length : institute.raw.num_subject, title: "开设专业" },
                        { variant: 'Warning', data: (majors) ? majors.data.nation_feature.length : 0, title: "国家级特色专业" },
                        { variant: 'Secondary', data: institute.raw.num_master, title: "硕士点" },
                        { variant: 'Success', data: institute.raw.num_doctor, title: "博士点" },
                        { variant: 'Info', data: institute.raw.num_library + "册", title: "图书馆藏" },
                        { variant: 'Dark', data: institute.raw.num_lab, title: "重点实验室" },
                      ].map((feature, idx) => (
                        <>
                          <Card
                            bg={feature.variant.toLowerCase()}
                            text={feature.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ textAlign: "center" }}
                            className=""
                          >
                            <Card.Header>{feature.title}</Card.Header>
                            <Card.Body>
                              <h3>{feature.data}</h3>
                            </Card.Body>
                          </Card>
                        </>
                      ))}
                  </CardColumns>
                  <hr />
                  <ScoreTable />
                  <hr />
                </Card.Body>
              </Route>
              <Route path={`${url}/major`}>
                <Card.Body>
                  <Card.Title>专业列表</Card.Title>
                  <Card.Text>
                    <MajorTable majors={majors} />
                  </Card.Text>
                </Card.Body>
              </Route>
              <Route path={`${url}/stats`}>
                <Card.Body>
                  <EnrollTable iid={id} institute={institute} />
                </Card.Body>
              </Route>
              <Route path={`${url}/discuss`}>
                <Card.Body className="">
                  <Row>
                    <Col>
                      <Card.Title>院校评价</Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
                <PostList posts={posts} />
                <NewPostForm className="p-3" relatedInstitute={institute._id} />
                <Card.Body className="">
                  <Row>
                    <Col>
                      <Card.Title>相关讨论</Card.Title>
                    </Col>
                  </Row>
                </Card.Body>
                <TopicList topics={topics} />
                <NewTopicForm className="p-3" relatedInstitute={institute._id} />
              </Route>
            </Switch>
          </Router>
        </Card>
      </Tab.Container>
    </div >
  )
}


const Detail = (props) => {
  const { path, url, params } = useRouteMatch()
  const history = useHistory()
  const id = useParams().id
  const eventKey = useParams().id
  const loginAs = JSON.parse(window.localStorage.getItem('user'))

  const [institute, setInstitute] = useState()

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchInstituteInfo(id, (res) => {
      document.title = `${res.data.name} - ${constants.title.institute} - ${constants.appName}`
      setInstitute(
        res.data,
      )
      console.log(res.data)
    })
  }, [useParams().id])

  const Header = () => {
    return (
      <div className="mb-3"
        id="header"
      >
        <div className="container">
          <Row>
            <Col xs="auto">
              <Row className="mb-2">
                <Col>
                  <Image width={96} height={96} src={`https://static-data.eol.cn/upload/logo/${institute.id}.jpg`} />
                </Col>
              </Row>
            </Col>
            <Col>
              <p>
                <Row>
                  <Col>
                    <span className="institute-name-150">
                      {institute.name}
                      {
                        (loginAs) ? (
                          <InstituteFollowButton
                            instituteId={institute._id}
                            variant="link"
                            size="sm"
                            className="align-text-bottom"
                          />
                        ) : null
                      }
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
              <InstituteTabs institute={institute} eventKey={eventKey} />
            </>
          ) : null
      }
    </div>
  )
}

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


  useEffect(() => {
    document.title = `${constants.title.institute} - ${constants.appName}`
  }, [])

  const handleQuery = (e) => {
    console.log(queryTags)
    if (e) e.preventDefault();
    if (queryTags.length == 0) {
      const localStorage = window.localStorage.getItem('allInstitutes')
      if (localStorage) {
        console.log('getting data from localStorage')
        setInstitutes(JSON.parse(localStorage))
        setCurrentPage(1)
      } else {
        fetchAllInstitutesInfo((res) => {
          console.log('fetching all data')
          window.localStorage.setItem('allInstitutes', JSON.stringify(res.data.institutes))
          setInstitutes([...res.data.institutes])
          setCurrentPage(1)
        })
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
                        return (<option value={r.region_id}>{r.region_name}</option>)
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
                            {tag.category === 'region' ?
                              constants.regions.find(r => r.region_id === tag.label).region_name
                              : tag.label}
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
                <hr className="mt-2" />
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

      <Card>
        <Card.Header>
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
                <Col>
                  <Form.Control as="select" defaultValue="名称" size="sm" onChange={
                    (e) => {
                      switch (e.target.value) {
                        case "校名":
                          setInstitutes([...institutes.sort((a, b) => a.name.localeCompare(b.name, 'zh'))])
                          break;
                        case "地区":
                          setInstitutes([...institutes.sort((a, b) => {
                            if (parseInt(a.region.province) - parseInt(b.region.province) == 0) {
                              return parseInt(a.region.city) - parseInt(b.region.city)
                            } else {
                              return parseInt(a.region.province) - parseInt(b.region.province)
                            }

                          })])
                          break;
                        case "类别":
                          setInstitutes([...institutes.sort((a, b) => a.labels.join(',').localeCompare(b.labels.join(','), 'zh'))])
                          break;
                        /*
                      case "理科最低分数":
                      case "文科最低分数":
                        break;
                        */
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
        </Card.Header>
        <ListGroup variant="flush">
          {
            [...institutes.slice((currentPage - 1) * instPerPage, currentPage * instPerPage)].map((i, idx) => {
              return (
                <InstituteCard institute={i} />
              )
            }
            )
          }
          <ListGroup.Item>
            <div className="d-md-none">
              {makePaginations(currentPage, setCurrentPage, totalPageNum, 3)}
            </div>
            <div className="d-none d-md-block">
              {makePaginations(currentPage, setCurrentPage, totalPageNum, 4)}
            </div>

          </ListGroup.Item>
        </ListGroup>
      </Card>
      <br />
    </div>
  )
}

const InstitutePage = (props) => {
  const { path, url, params } = useRouteMatch()
  const location = useLocation();
  const [instperpage, setInstperpage] = useState(Math.floor(window.innerHeight / 40))


  useEffect(() => {
    document.title = `${constants.title.institute} - ${constants.appName}`
  }, [])

  return (
    <Router>
      <div className="container mb-3">
        <Switch>
          <Route path={`/institute/:id`} >
            <Detail />
          </Route>
          <Route path={`/institute`} exact={true}>
            <InstituteTable instperpage={instperpage} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default InstitutePage;