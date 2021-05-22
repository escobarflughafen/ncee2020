import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, ModalBody, Popover, Badge, OverlayTrigger, Image, InputGroup, ListGroupItem, Card } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useRouteMatch, useHistory } from 'react-router-dom'
import constants from '../../utils/constants'
import { makePaginations } from './pagination'
import axios from 'axios'
import SVG from '../../utils/svg'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { MsgAlert, MsgListItem } from './msg'

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
  const [i, setI] = useState(props.institute)
  const history = useHistory()
  const token = window.localStorage.getItem('token')
  const loginAs = JSON.parse(window.localStorage.getItem('user'))

  useEffect(() => { setI(props.institute) }, [props.institute])

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
                  <Button
                    variant="link"
                    className="align-text-top"
                    onClick={(e) => { history.push(`/institute/${i.id}/discuss`); history.go() }}
                  >
                    <SVG variant="chat" />
                  </Button>
                </Nav.Item>
                {
                  (loginAs && token) ? (
                    <Nav.Item>
                      {/*i._id*/}
                      <InstituteFollowButton
                        className="align-text-top"
                        variant="link"
                        instituteId={i._id} />
                    </Nav.Item>
                  ) : null
                }
                <Nav.Item>
                  <Button
                    variant="link"
                    className="align-text-top"
                    onClick={(e) => { history.push(`/forum/`); history.go() }}>
                    <SVG variant="share" />
                  </Button>
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


const InstituteFollowButton = (props) => {
  const [followed, setFollowed] = useState(false)
  const instituteId = props.instituteId
  const [loginAs, setLoginAs] = useState(JSON.parse(window.localStorage.getItem('user')))

  useEffect(async () => {
    if (loginAs) {
      const url = `http://${document.domain}:${constants.serverPort}/institute/isfollowed`
      const res = await axios.post(url, {
        user: loginAs._id,
        institute: props.instituteId
      })
      setFollowed(!!res.data.followed)
    }
  }, [props.instituteId])

  const handleToggleFollow = async (e) => {
    e.stopPropagation()
    const token = window.localStorage.getItem('token')
    const auth = (token) ? `bearer ${token}` : null
    if (auth) {
      const url = `http://${document.domain}:${constants.serverPort}/institute/togglefollow`
      try {
        const res = await axios.post(url, { id: instituteId }, { headers: { auth } })
        console.log(res)
        setFollowed(!followed)
      } catch (err) {
        console.log(err.response)
      }
    }
  }

  return (
    <>
      <Button
        {...props}
        onClick={handleToggleFollow}
      >
        {
          (props.children) || (
            <SVG variant="star" fill={followed} />
          )
        }
      </Button>
    </>
  )

}

const InstituteList = (props) => {
  const [currentPage, setCurrentPage] = useState(1)
  const institutes = props.institutes
  const instPerPage = props.instPerPage || 12


  return (
    <ListGroup {...props} variant="flush">
      <ListGroup.Item>
        <Row>
          <Col>
            <span className="annotation">
              关注了 {institutes.length} 所院校
              </span>
          </Col>
        </Row>
      </ListGroup.Item>
      {
        /*
      institutes.map(i=>{
        return <InstituteCard institute={i} />
      })
      */
      }

      {
        [...institutes.slice((currentPage - 1) * instPerPage, currentPage * instPerPage)].map((institute) => {
          return (<InstituteCard institute={institute} />)
        })
      }
      <ListGroup.Item>
        {makePaginations(currentPage, setCurrentPage, Math.ceil(institutes.length / instPerPage), 4)}
      </ListGroup.Item>
    </ListGroup>
  )
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

const InstitutePredictionForm = (props) => {
  const institute = props.institute
  const [indices, setIndices] = useState()

  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const [predictVal, setPredictVal] = useState({})

  useEffect(async () => {
    const url = `http://${document.domain}:${constants.servicePort}/fetch_indices`
    const res = await axios.get(url)
    console.log(res)
    setIndices(res.data)
  }, [])

  const schema = Yup.object().shape({
    last_min: Yup.number().min(0, '最低分为0分').max(750, '最高分为750分').required(),
    last_min_rank: Yup.number().min(0, '最低排名为0').required(),
    last_avg: Yup.number().min(0, '最低分为0分').max(750, '最高分为750分').required(),
    last_avg_rank: Yup.number().min(0, '最低排名为0').required(),
    last_province_line: Yup.number().min(0, '最低分为0分').max(750, '最高分为750分').required(),
    id: Yup.number().required(),
    province_line: Yup.number().min(0, '最低分为0分').max(750, '最高分为750分').required(),
    major_name: Yup.string().required('请选择专业名称'),
    major_category: Yup.string().required('请选择专业类别'),
    major_field: Yup.string().required('请选择专业领域'),
  })
  const handleSubmit = async (body) => {
    console.log(body)
    const url = `http://${document.domain}:${constants.servicePort}/predict`
    const res = await axios.post(url, body)
    console.log(res)
    setPredictVal(res.data)
  }

  return (
    <>
      <MsgAlert msg={msg} />
      <Row>
        <Col>
          <Formik
            onSubmit={handleSubmit}
            initialValues={
              {
                id: institute.id,
                year: 2021,
                subject: 0,
                province_line: 500,
                major_name: '0',
                major_category: '0',
                major_field: '0',
                last_min: 0,
                last_min_rank: 0,
                last_avg: 0,
                last_avg_rank: 0,
                last_province_line: 500,
              }
            }
            validationSchema={schema}
          >
            {
              ({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                errors,
                touched,
                isValid
              }) => {
                return (
                  <Form noValidate onSubmit={handleSubmit}>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>校名</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="text" placeholder={institute?.name} readOnly />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>年份</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="text" placeholder="2021" readOnly />
                    </InputGroup>
                    {
                      /*
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>省份</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control as="select">
                      </Form.Control>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>批次</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control as="select">
                      </Form.Control>
                    </InputGroup>
                       */
                    }
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>科类</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        name="subject"
                        value={values.subject}
                        onChange={handleChange}
                      >
                        {
                          ['文科', '理科'].map((i, idx) => (
                            <option value={idx}>{i}</option>
                          ))
                        }
                      </Form.Control>
                      <InputGroup.Append>
                        <InputGroup.Text className="text-danger">
                          {errors.subject}
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>省控线</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="number"
                        name="province_line"
                        value={values.province_line}
                        onChange={handleChange}
                      />
                      <InputGroup.Append>
                        <InputGroup.Text className="text-danger">
                          {errors.province_line}
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>专业名</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        name="major_name"
                        value={values.major_name}
                        onChange={handleChange}
                      >
                        {
                          (indices) ? indices.major_name.map(i => (
                            <option value={i[0]}>{i[1]}</option>
                          )) : null
                        }
                      </Form.Control>
                      <InputGroup.Append>
                        <InputGroup.Text className="text-danger">
                          {errors.major_name}
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>专业类别</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        name="major_category"
                        value={values.major_category}
                        onChange={handleChange}
                      >
                        {
                          (indices) ? indices.major_category.map(i => (
                            <option value={i[0]}>{i[1]}</option>
                          )) : null
                        }
                      </Form.Control>
                      <InputGroup.Append>
                        <InputGroup.Text className="text-danger">
                          {errors.major_category}
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>专业领域</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        name="major_field"
                        value={values.major_field}
                        onChange={handleChange}
                      >
                        {
                          (indices) ? indices.major_field.map(i => (
                            <option value={i[0]}>{i[1]}</option>
                          )) : null
                        }
                      </Form.Control>
                      <InputGroup.Append>
                        <InputGroup.Text className="text-danger">
                          {errors.major_field}
                        </InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>去年投档线</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="number"
                        name="last_min"
                        value={values.last_min}
                        onChange={handleChange}
                        placeholder="分数" />
                      <Form.Control type="number"
                        name="last_min_rank"
                        value={values.last_min_rank}
                        onChange={handleChange}
                        placeholder="位次" />
                    </InputGroup>
                    <InputGroup size="sm" className="mb-1">
                      <InputGroup.Prepend>
                        <InputGroup.Text>去年平均分</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="number"
                        name="last_avg"
                        value={values.last_avg}
                        onChange={handleChange}
                        placeholder="分数" />
                      <Form.Control type="number"
                        name="last_avg_rank"
                        value={values.last_avg_rank}
                        onChange={handleChange}
                        placeholder="位次" />
                    </InputGroup>
                    <InputGroup size="sm" className="">
                      <InputGroup.Prepend>
                        <InputGroup.Text>去年省控线</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control type="number"
                        name="last_province_line"
                        value={values.last_province_line}
                        onChange={handleChange}
                        />
                    </InputGroup>
                    <p className="text-danger">
                      <small>
                        {errors.last_min}
                        {errors.last_min_rank}
                        {errors.last_avg}
                        {errors.last_avg_rank}
                        {errors.last_province_line}
                      </small>
                    </p>
                    <Button type="submit" variant="info" size="sm">预测</Button>
                  </Form>
                )
              }
            }

          </Formik >
        </Col>
        <Col>
          <Card>
            <Card.Header>
              <strong>投档线预测</strong>
            </Card.Header>
            <Card.Body style={{textAlign: 'center'}}>
              <h4>{predictVal.min && Math.abs(predictVal?.min)}</h4>
            </Card.Body>
            {
              /*
            <Card.Header>
              <strong>最低排名</strong>
            </Card.Header>
            <Card.Body style={{textAlign: 'center'}}>
              <h4>{Math.abs(predictVal?.min_rank)}</h4>
            </Card.Body>
              */
            }
          </Card>
        </Col>
      </Row>
    </>
  )
}

export { InstituteCard, InstituteList, Labels, InstituteSelector, InstituteFollowButton, InstitutePredictionForm }