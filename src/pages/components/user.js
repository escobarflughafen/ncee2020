import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup, ModalBody, Popover, OverlayTrigger, Image } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import constants from '../../utils/constants'
import axios from 'axios'
import SVG from '../../utils/svg'



const SignUpForm = (props) => {

  const [username, setUsername] = useState()
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const [hint, setHint] = useState()
  const [year, setYear] = useState()
  const [province, setProvince] = useState(constants.regions[0].region_id)
  const [city, setCity] = useState(`${constants.regions[0].region_id}01`)
  const [score, setScore] = useState()
  const [about, setAbout] = useState()

  const handleSubmit = (e) => {
    e.preventDefault()
    const url = `http://${document.domain}:${constants.serverPort}/user/signup`
    axios.post(url, {
      username,
      password,
      name,
      hint,
      year,
      province,
      city,
      score,
      about,
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridUsername">
            <Form.Label>用户名</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => { setUsername(e.target.value) }} />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>密码</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} controlId="hint">
            <Form.Label>密码提示</Form.Label>
            <Form.Control type="text" value={hint} onChange={(e) => { setHint(e.target.value) }} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formGridYear">
            <Form.Label>届</Form.Label>
            <Form.Control as="select" value={year} onChange={(e) => { setYear(e.target.value) }}>
              {
                ['2021', '2020', '2019', '2018', '2017', '2016', "2015"
                ].map((year) => (<option>{year}</option>))
              }
            </Form.Control>
          </Form.Group>
          <Form.Group as={Col} controlId="formGridProvince">
            <Form.Label>省份</Form.Label>
            <Form.Control as="select" value={province} onChange={(e) => { setProvince(e.target.value); setCity(`${e.target.value}01`) }}>
              {
                constants.regions.map((region) => (<option value={region.region_id}>{region.region_name}</option>))
              }
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>城市</Form.Label>
            <Form.Control as="select" value={city} onChange={(e) => { setCity(e.target.value) }} >
              {
                constants.cities.filter((city) => city.city_id.slice(0, 2) === province).sort((a, b) => a.city_id.localeCompare(b.city_id)).map((city) => (<option value={city.city_id}>{city.city_name}</option>))
              }
            </Form.Control>
          </Form.Group>
        </Form.Row>


        <Button variant="primary" type="submit" className="ml-auto" >
          注册
        </Button>
      </Form>
    </>
  )
}

const LoginInForm = (props) => {
  const handleSubmit = (e) => {

  }

  return (
    <>
    </>
  )
}

const UserCard = (props) => {
  const [user, setUser] = useState()

  useEffect(() => {
    setUser({
      username: 'user01',
      name: 'John Smith',
      year: '2020',
      region: {
        province: '44',
        city: '4401'
      },
      score: 623,
      about: '感觉不错',
      registeredDate: Date.now(),
      isAdmin: false,
      follower: [1, 2, 3],
      following: [3, 4, 5, 6]
    })
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
                    <Button variant="link" className="p-0">
                      <b>{user.name}</b>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs="auto">
                    <p>
                      <small>
                        <SVG variant="location" className="pr-1" />
                        {constants.regions.find(r => r.region_id === user.region.province).region_name}, {constants.cities.find(c => c.city_id === user.region.city).city_name}
                      </small>
                    </p>
                  </Col>
                </Row>
              </Col>
              <Col xs="auto">
                <Button variant="success" size="sm">关注</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                {user.following.length} 关注中
              </Col>
              <Col>
                {user.follower.length} 关注者
              </Col>
            </Row>
            <Row>
              <Col>
                <p>
                  <hr className="m-1"/>
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
    <Popover id="popover-basic">
      <Popover.Content>
        <UserCard />
      </Popover.Content>
    </Popover>
  )


  return (
    <>
      <OverlayTrigger trigger="click" placement="right" overlay={UserPopover}>
        <Button variant="link" className="p-0"><b>{props.children}</b></Button>
      </OverlayTrigger>
    </>
  )
}

const UserList = (props) => {

}



export { SignUpForm, LoginInForm, UserCard, UserLink }