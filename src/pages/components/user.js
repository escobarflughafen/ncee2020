import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, ModalBody, Popover, OverlayTrigger, Image, InputGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory } from 'react-router-dom'
import constants from '../../utils/constants'
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup'
import SVG from '../../utils/svg'

const loginService = async credentials => {
  const url = `http://${document.domain}:${constants.serverPort}/user/login`
  const res = await axios.post(url, credentials)
  return res
}

const signupService = async profile => {
  const url = `http://${document.domain}:${constants.serverPort}/user/signup`
  const res = await axios.post(url, profile)
  return res
}

const loginSchema = Yup.object().shape({
  username: Yup.string().required('请输入用户名'),
  password: Yup.string().required('请输入密码')
})

const signupValidator = Yup.object().shape({
  username: Yup.string()
    .min(4, '需要至少4个字符')
    .max(16, '用户名过长，最多16个字符')
    .required('请输入用户名'),
  password: Yup.string()
    .min(6, '需要至少6位字符')
    .max(32, '密码过长，最多32个字符')
    .required('请输入密码'),
  name: Yup.string().max(20, '姓名过长，最多20个字符'),
  hint: Yup.string()
    .max(100, '提示过长'),
  year: Yup.string().required('需要选择考生的届次'),
  province: Yup.string().required('需要选择考生的省份'),
  city: Yup.string().required('需要选择考生的城市'),
  about: Yup.string().max(1000, '个人简介过长，请控制在1000字内'),
})

const SignupForm = (props) => {
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const resetMsg = () => setMsg({ type: '', text: '' })

  const handleSubmit = async (body) => {
    resetMsg()
    console.log(body)
    try {
      const res = await signupService(body)
      setMsg({ type: 'success', text: res.data.msg })
      console.log(res.status)
    } catch (err) {
      setMsg({ type: 'danger', text: err.response.data.msg })
      console.log(err)
    }
  }

  return (
    <div>
      {(msg.text.length > 0) ? (<Alert variant={msg.type}>{msg.text}</Alert>) : null}
      <Formik
        onSubmit={handleSubmit}
        initialValues={
          {
            username: '',
            password: '',
            name: '',
            hint: '',
            year: '2021',
            province: '44',
            city: '4401',
            about: ''
          }
        }
        validationSchema={signupValidator}
      >
        {
          ({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
            isValid,
            resetForm
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Row>
                <Col xs={12} sm={4}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>姓名</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>@</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="用户名"
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={!!errors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.username}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>密码</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={12} sm={8}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>密码提示</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        name="hint"
                        value={values.hint}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={4}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <Form.Control
                        as="select"
                        name="year"
                        value={values.year}
                        onChange={handleChange}
                        isValid={touched.year && !errors.year}
                        isInvalid={!!errors.year}
                      >
                        {
                          [
                            '2021',
                            '2020',
                            '2019',
                            '2018',
                            '2017',
                            '2016'
                          ].map((year) => (<option>{year}</option>))
                        }
                      </Form.Control>
                      <InputGroup.Append>
                        <InputGroup.Text>届</InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>省份</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        name="province"
                        value={values.province}
                        onChange={handleChange}
                        isValid={touched.province && !errors.province}
                        isInvalid={!!errors.province}
                      >
                        {
                          constants.regions.map((r) => (<option value={r.region_id}>{r.region_name}</option>))
                        }
                      </Form.Control>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>城市</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        isValid={touched.city && !errors.city}
                        isInvalid={!!errors.city}
                      >
                        {
                          constants.cities
                            .filter(city => city.city_id.slice(0, 2) === values.province)
                            .sort((a, b) => a.city_id.localeCompare(b.city_id))
                            .map((c) => (<option value={c.city_id}>{c.city_name}</option>))
                        }
                      </Form.Control>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <InputGroup hasValidation>
                      <InputGroup.Prepend>
                        <InputGroup.Text>介绍</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="textarea"
                        name="about"
                        value={values.about}
                        onChange={handleChange}
                        isValid={touched.about && !errors.about}
                        isInvalid={!!errors.about}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.about}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col xs="auto">
                  <Button type="submit" variant="success">
                    提交注册
                </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="warning"
                    onClick={() => { resetForm() }}
                  >
                    重置
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}


const LoginForm = (props) => {
  const history = useHistory()
  const [msg, setMsg] = useState({ type: '', text: '' })

  const resetMsg = () => setMsg({ type: '', text: '' })

  const handleSubmit = async (body) => {
    resetMsg()
    console.log(body)
    try {
      const res = await loginService(body)
      console.log(res)
      setMsg({ type: 'success', text: '登入成功' })

      window.localStorage.setItem('user', JSON.stringify(res.data.user))
      window.localStorage.setItem('token', res.data.token)

      setTimeout(() => {
        history.push('/home')
        history.go()
      }, 1000)
    } catch (err) {
      console.log(err.response)
      setMsg({ type: 'danger', text: err.response.data.msg })
    }
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
        isValid,
      }) => (
        <div>
          {(msg.text.length > 0) ? (<Alert variant={msg.type}>{msg.text}</Alert>) : null}
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <InputGroup hasValidation>
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="text"
                      placeholder="用户名..."
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isValid={touched.username && !errors.username}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group>
                  <InputGroup hasValidation>
                    <InputGroup.Prepend>
                      <InputGroup.Text>密码</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col xs="auto">
                <Button type="submit" variant="success">
                  登入
              </Button>
              </Col>
            </Form.Row>
          </Form>
        </div>
      )}
    </Formik>
  )

}

const UserListItem = (props) => {
  const user = props.user
  const history = useHistory()

  return (
    <>

    </>
  )
}

const UserCard = (props) => {
  const user = props.user
  const history = useHistory()
  const [loginAs, setLoginAs] = useState()

  useEffect(() => {
    setLoginAs(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  return (
    (user) ? (
      <>
        <Row>
          <Col xs="auto" className="pr-0">
            <Image width={48} height={48} />
          </Col>
          <Col>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <Button variant="link" className="p-0" onClick={(e) => {
                      history.push(`/user/${user.username}`)
                      history.go()
                    }}>
                      <b>{user.name}</b>
                    </Button>
                    <small className="text-info">@{user.username}</small>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto">
                    <p>
                      {
                        (user.region) ? (
                          <small>
                            <SVG variant="location" className="pr-1" />
                            {constants.regions.find(r => r.region_id === user.region.province).region_name}, {constants.cities.find(c => c.city_id === user.region.city).city_name}
                          </small>
                        ) : null
                      }
                    </p>
                  </Col>
                </Row>
              </Col>
              {
                (loginAs) ? (
                  (loginAs.username === user.username) ? null : (
                    <Col xs="auto">
                      <Button variant="success" size="sm">关注</Button>
                    </Col>
                  )
                ) : null
              }
            </Row>
            <Row>
              <Col>
                <a href={`/user/${user.username}/following`}>
                  {user.following.length} 关注中
                    </a>
              </Col>
              <Col>
                <a href={`/user/${user.username}/follower`}>
                  {user.follower.length} 关注者
                    </a>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <hr className="m-1" />
                  {user.about}
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    ) : null
  )

}


const UserLink = (props) => {

  const UserPopover = (
    <Popover onClick={(e) => { e.stopPropagation() }} >
      <Popover.Content>
        <UserCard user={props.user} />
      </Popover.Content>
    </Popover>
  )

  return (
    <>
      <OverlayTrigger rootClose trigger="click" placement="auto" overlay={UserPopover}>
        <Button size="sm" variant="link" className="p-0" onClick={
          (e) => {
            e.stopPropagation()
          }
        }><b>{props.children}</b></Button>
      </OverlayTrigger>
    </>
  )
}

const UserList = (props) => {

}

const UserNav = (props) => {

}

export { SignupForm, LoginForm, UserCard, UserLink, UserListItem }