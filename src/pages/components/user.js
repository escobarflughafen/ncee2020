import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, Spinner, ListGroup, ModalBody, Popover, OverlayTrigger, Image, InputGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory } from 'react-router-dom'
import constants from '../../utils/constants'
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup'
import SVG from '../../utils/svg'
import { MsgAlert, MsgListItem } from './msg'
import { makePaginations } from './pagination'
import defaultAvatar from '../../resources/default_avatar.png'
import { PostCard } from './post'
import { TopicCard } from './topic'

const serverUrl = `http://${document.domain}:${constants.serverPort}`

const loginService = async credentials => {
  const url = `http://${document.domain}:${constants.serverPort}/user/login`
  return await axios.post(url, credentials)
}

const signupService = async profile => {
  const url = `http://${document.domain}:${constants.serverPort}/user/signup`
  return await axios.post(url, profile)
}

const modifyUserService = async profile => {
  const url = `http://${document.domain}:${constants.serverPort}/user/modify`
  const token = window.localStorage.getItem('token')
  const auth = (token) ? `bearer ${token}` : null

  return await axios.post(url, profile, { headers: { auth } })
}

const toggleFollowService = async user => {
  const url = `http://${document.domain}:${constants.serverPort}/user/togglefollow`
  const token = window.localStorage.getItem('token')
  const auth = (token) ? `bearer ${token}` : null

  return await axios.post(url, { user }, { headers: { auth } })
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

const modifyValidator = Yup.object().shape({
  username: Yup.string()
    .min(4, '需要至少4个字符')
    .max(16, '用户名过长，最多16个字符')
    .nullable(true),
  password: Yup.string()
    .min(6, '需要至少6位字符')
    .max(32, '密码过长，最多32个字符')
    .nullable(true),
  name: Yup.string().max(20, '姓名过长，最多20个字符').nullable(true),
  hint: Yup.string().max(100, '提示过长').nullable(true),
  year: Yup.string().required('需要选择考生的届次').nullable(true),
  province: Yup.string().required('需要选择考生的省份').nullable(true),
  city: Yup.string().required('需要选择考生的城市').nullable(true),
  about: Yup.string().max(1000, '个人简介过长，请控制在1000字内').nullable(true),
})

const SignupForm = (props) => {
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const [loginAs, setLoginAs] = useState(JSON.parse(window.localStorage.getItem('user')))

  const resetMsg = () => setMsg({ type: '', text: '' })
  const history = useHistory()

  const [imagePreviewUrl, setImagePreviewUrl] = useState()
  const [imageReady, setImageReady] = useState(false)
  const [imageFile, setImageFile] = useState()

  useEffect(() => { if (loginAs?.avatar) { setImagePreviewUrl(`http://${document.domain}:${constants.serverPort}${loginAs.avatar}`) } }, [loginAs])

  const handleSubmit = async (body) => {
    resetMsg()
    var avatarPath
    if (imageReady && imageFile) {
      let formData = new FormData();
      const filename = imageFile.name.split('.')

      formData.append('image', imageFile, `avatar_${loginAs?._id || body.username}.${filename[filename.length - 1]}`)
      try {
        const url = `http://${document.domain}:${constants.serverPort}/image/uploadsingle`
        const res = await axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        avatarPath = res.data.path
        console.log(res)
      } catch (err) {
        console.log(err)
        setMsg({ type: 'danger', text: "头像上传失败" })
      }
    }

    try {
      console.log(body)
      const res = (props.modify) ? await modifyUserService({ ...body, avatarPath }) : await signupService({ ...body, avatarPath })
      setMsg({ type: 'success', text: `${res.data.msg}\n${JSON.stringify(body)}` })
      if (props.modify) {
        window.localStorage.setItem('user', JSON.stringify(res.data.user))
      }
      setTimeout(() => { history.push(`/user/${body.username}`); history.go() }, 1000)
    } catch (err) {
      setMsg({ type: 'danger', text: `${err.response.data.msg}\n${JSON.stringify(body)}` })
      console.log(err)
    }
  }


  const handleImage = (e) => {
    e.preventDefault()

    if (e.target.files[0]) {
      var reader = new FileReader()
      var file = e.target.files[0]

      if (file.type.includes('image')) {
        reader.onloadend = () => {
          console.log('file:', file)
          console.log('result:', reader.result)
          setImagePreviewUrl(reader.result)
          setImageFile(file)
          setImageReady(true)
        }

        reader.readAsDataURL(file)
      } else {
        console.log('err: not image')
        alert('格式错误，请上传图片')
      }
    }
  }

  return (
    <div>
      <MsgAlert msg={msg} />
      <Form.Row className="mb-3">
        <Col xs="auto">
          <Image width={96} height={96} src={imagePreviewUrl} />
        </Col>
        <Col>
          <Form.Group>
            <Form.File
              id="avatar"
              name="avatar"
              label="头像"
              onChange={handleImage}
              custom
            />
          </Form.Group>
          <Button className="mr-2" variant="warning" disabled={!imageReady} onClick={() => { setImageReady(false); setImageFile(null); setImagePreviewUrl(loginAs.avatar) }}>
            重置
          </Button>
          <Button variant="dark" disabled={!imagePreviewUrl} onClick={() => { setImagePreviewUrl(null); setImageFile(null) }}>
            不使用头像
          </Button>
        </Col>
      </Form.Row>
      <hr />
      <Formik
        onSubmit={handleSubmit}
        initialValues={
          (props.modify) ? {
            username: loginAs.username,
            password: '',
            name: loginAs.name,
            hint: loginAs.hint,
            year: loginAs.year,
            province: loginAs.region.province,
            city: loginAs.region.city,
            about: loginAs.about
          } : {
            username: '',
            password: '',
            name: '',
            hint: '',
            year: '',
            province: '',
            city: '',
            about: ''
          }
        }
        validationSchema={(props.modify) ? modifyValidator : signupValidator}
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
                <Col xs={12}>
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
                <Col xs={12} sm={6}>
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
                        <option value=''>...</option>
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
                        <option value=''>...</option>
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
                  <Button type="submit" variant="info">
                    {(props.modify) ? '修改个人信息' : '注册'}
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
          <MsgAlert msg={msg} />
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

const FollowButton = (props) => {
  const { user, onFollow, onClick, variant, ...otherProps } = props
  const loginAs = JSON.parse(window.localStorage.getItem('user'))
  const history = useHistory()

  const handleFollow = async (e) => {
    e.stopPropagation()
    try {
      const res = await toggleFollowService(user._id)
      if (onFollow) {
        onFollow({ type: 'success', text: res.data.msg })
      }
      window.localStorage.setItem('user', JSON.stringify(res.data.user))
      setTimeout(() => { onFollow({type:'', text:''}) }, 1000)
    } catch (err) {
      console.log(err.response)
      if (onFollow) {
        onFollow({ type: 'danger', text: err.response.data.msg })
      }
    }
  }


  return (loginAs && (loginAs._id != user._id)) ? ((loginAs.following.find(f => (f === user._id) || (f._id === user._id))) ?
    (<Button {...otherProps} variant={`${variant}`} onClick={handleFollow}>已关注</Button>)
    :
    (<Button {...otherProps} variant={`outline-${variant}`} onClick={handleFollow}>关注</Button>)
  ) : null
}

const UserCard = (props) => {
  const user = props.user
  const history = useHistory()
  const loginAs = JSON.parse(window.localStorage.getItem('user'))
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  return (
    (user) ? (
      <>
        <MsgAlert msg={msg} />
        <Row>
          <Col xs="auto" className="pr-0">
            <UserAvatar width={48} height={48} user={user} />
          </Col>
          <Col>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <a href={`/user/${user.username}`}>
                      <strong>{user.name}</strong>
                    </a>
                    <br />
                    <small className="text-info">@{user.username}</small>
                  </Col>
                </Row>
              </Col>
              <Col xs="auto">
                <FollowButton
                  user={user}
                  size="sm"
                  variant="info"
                  onFollow={setMsg} />
              </Col>
            </Row>
            <UserInteractInfo size="sm" user={user} className="mt-2" onClick={(e) => { e.stopPropagation() }} />
            <Row className="mt-1">
              <Col>
                {user.about}
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    ) : null
  )

}

const UserListItem = (props) => {
  const user = props.user
  const history = useHistory()
  const loginAs = JSON.parse(window.localStorage.getItem('user'))
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  return (
    <>
      <ListGroup.Item action onClick={(e) => { e.stopPropagation(); history.push(`/user/${user.username}`); history.go() }}>
        <Row>
          <Col>
            <MsgAlert msg={msg} />
          </Col>
        </Row>
        {(user) ? (
          <>
            <Row>
              <Col xs="auto" className="pr-0">
                <UserAvatar width={48} height={48} user={user} />
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <a href={`/user/${user.username}`}>
                          <strong>{user.name}</strong>
                        </a>
                        <br />
                        <small className="text-info">@{user.username}</small>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs="auto">
                    <FollowButton
                      user={user}
                      size="sm"
                      variant="info"
                      onFollow={setMsg} />
                  </Col>
                </Row>
                {
                  (user.about) ? (
                    <Row className="">
                      <Col>
                        {user.about}
                      </Col>
                    </Row>
                  ) : null
                }
              </Col>
            </Row>
          </>
        ) : null}
      </ListGroup.Item>
    </>
  )
}


const UserLink = (props) => {

  const UserPopover = (
    <Popover onClick={(e) => { e.stopPropagation() }} >
      <Popover.Content>w
        :w
        <UserCard user={props.user} />
      </Popover.Content>
    </Popover>
  )

  return (
    <>
      <OverlayTrigger rootClose trigger="click" placement="auto" overlay={UserPopover}>
        <Button size="sm" variant="link" className="p-0 align-baseline" onClick={
          (e) => {
            e.stopPropagation()
          }
        }><strong>{props.children}</strong></Button>
      </OverlayTrigger>
    </>
  )
}

const UserList = (props) => {
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const userPerPage = props.userPerPage || 20

  useEffect(() => { setUsers(props.users) }, [props.users])

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col>
              <span className="annotation">
                共 {users.length} 名用户
              </span>
            </Col>
          </Row>
        </ListGroup.Item>
        {
          (users.length) ? (
            <>
              {
                (users.slice((currentPage - 1) * userPerPage, (currentPage) * userPerPage).map((user) => {
                  return (<UserListItem user={user} />)
                }))
              }
              <ListGroup.Item>
                {makePaginations(currentPage, setCurrentPage, Math.ceil(users.length / userPerPage), 4)}
              </ListGroup.Item>
            </>
          ) : null
        }
      </ListGroup>
    </>
  )

}

const UserInteractInfo = (props) => {
  const { user, size, ...otherProps } = props
  const history = useHistory()
  return (
    <Row {...otherProps}>
      <Col xs="auto">
        <Button
          onClick={() => { history.push(`/user/${user.username}/following`); history.go() }}
          variant="link"
          size={size}
          className="p-0 text-dark align-baseline"
        >
          <strong>{user.following.length}</strong> <span className="text-muted">关注中</span>
        </Button>
      </Col>
      <Col xs="auto">
        <Button
          onClick={() => { history.push(`/user/${user.username}/follower`); history.go() }}
          variant="link"
          size={size}
          className="p-0 text-dark align-baseline"
        >
          <strong>{user.follower.length}</strong> <span className="text-muted">关注者</span>
        </Button>
      </Col>
    </Row>
  )
}

const UserActivity = (props) => {
  const [contents, setContents] = useState([])
  const activityPerPage = 12 || props.activityPerPage
  const [currentPage, setCurrentPage] = useState(1)
  const [msg, setMsg] = useState({
    type: '',
    text: ''
  })

  const [refresh, setRefresh] = useState(false)
  useEffect(async () => {
    const users = (props.users || ((props.user) ? [props.user] : null))
    if (users) {
      const postUrl = `http://${document.domain}:${constants.serverPort}/post/fetch`
      const topicUrl = `http://${document.domain}:${constants.serverPort}/forum/fetch`

      try {
        setMsg({ type: 'info', text: '获取动态中' })
        const postRes = await axios.post(postUrl, { users, limit: props.limit })
        const topicRes = await axios.post(topicUrl, { users, limit: props.limit })

        const posts = postRes.data.posts
        const topics = topicRes.data.topics
        console.log(posts, topics)
        let contents = [...posts, ...topics].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        setContents(contents)
        setMsg({ type: '', text: '' })
        setRefresh(false)
      } catch (err) {
        console.log(err)
        setRefresh(false)
        setMsg({ type: 'danger', text: '获取动态失败' })
      }
    }
  }, [props.user, props.users, refresh])

  return (
    <>
      <ListGroup variant="flush">
        <MsgListItem msg={msg} />
        <ListGroup.Item>
          <Row>
            <Col>
              {(contents.length && !props.limit) ? (
                <div>
                  <div className="">共 {contents.length} 条动态</div>
                  <div className="annotation">{`第 ${(currentPage - 1) * activityPerPage + 1}~${currentPage * activityPerPage} 条`}</div>
                </div>
              ) : null}
            </Col>
            <Col xs="auto">
              <Button variant="success" size="sm" onClick={() => { setRefresh(true) }}>
                刷新
                </Button>
            </Col>
          </Row>
        </ListGroup.Item>
        {
          (contents.length) ? (
            contents.slice((currentPage - 1) * activityPerPage, (currentPage) * activityPerPage).map((content) => {
              if (content.author) {
                return (<PostCard post={content} detail />)
              } else if (content.host) {
                return (<TopicCard topic={content} />)
              } else {
                return (<ListGroup.Item></ListGroup.Item>)
              }
            })
          ) : (
            <ListGroup.Item>
              <span className="annotation">没有新动态</span>
            </ListGroup.Item>
          )
        }
        <ListGroup.Item>
          {makePaginations(currentPage, setCurrentPage, Math.ceil(contents.length / activityPerPage), 4)}
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}

const avatarStyle = {
  borderRadius: '.2rem',
}

const UserAvatar = (props) => {
  let { user, src, style, ...otherprops } = props

  return (
    <Image {...otherprops}
      style={{
        ...style,
        ...avatarStyle
      }}
      src={(user.avatar) ? `${serverUrl}${user.avatar}` : defaultAvatar}
    />
  )
}

export { SignupForm, LoginForm, UserCard, UserLink, UserListItem, UserList, toggleFollowService, UserAvatar, UserActivity, FollowButton, UserInteractInfo }