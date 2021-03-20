import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import constants from '../utils/constants'
import { LoginInForm, SignUpForm, UserLink } from './components/user'


const SignupForm = (props) => {

  const handleSubmit = (e) => {

  }

  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridUsername">
          <Form.Label>用户名</Form.Label>
          <Form.Control type="text" placeholder="..." />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>密码</Form.Label>
          <Form.Control type="password" placeholder="..." />
        </Form.Group>
      </Form.Row>

      <Form.Group controlId="formGridConfirmPassword">
        <Form.Label>确认密码</Form.Label>
        <Form.Control type="password" placeholder="..." />
      </Form.Group>

      <Form.Group controlId="formGridEmail">
        <Form.Label>电子邮箱</Form.Label>
        <Form.Control type="email" placeholder="address@example.com" />
      </Form.Group>

      <Form.Row>
        {
          // data from https://github.com/wecatch/china_regions
        }

        <Form.Group as={Col} controlId="formGridYear">
          <Form.Label>届</Form.Label>
          <Form.Control as="select">
            {
              [2021, 2020, 2019, 2018, 2017, 2016, "2015前"
              ].map((year) => (<option>{year}</option>))
            }
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridProvince">
          <Form.Label>省份</Form.Label>
          <Form.Control as="select">
            {
              ['北京市',
                '天津市',
                '河北省',
                '山西省',
                '内蒙古自治区',
                '辽宁省',
                '吉林省',
                '黑龙江省',
                '上海市',
                '江苏省',
                '浙江省',
                '安徽省',
                '福建省',
                '江西省',
                '山东省',
                '河南省',
                '湖北省',
                '湖南省',
                '广东省',
                '广西壮族自治区',
                '海南省',
                '重庆市',
                '四川省',
                '贵州省',
                '云南省',
                '西藏自治区',
                '陕西省',
                '甘肃省',
                '青海省',
                '宁夏回族自治区',
                '新疆维吾尔自治区'].map((province) => (<option>{province}</option>))
            }
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>城市</Form.Label>
          <Form.Control />
        </Form.Group>
      </Form.Row>

      {
        /*
        (
      <Form.Group id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
        )
        */
      }

      <Button variant="primary" type="submit" style={{ display: "block", margin: "0 0 0 auto" }} >
        注册
                    </Button>
    </Form>
  )

}

const LoginForm = () => {
  return (
    <div className="container">
      <Row>
        <Col sm={8} md={8} lg={8}>
          <Tab.Container id="account-tabs" defaultActiveKey="login">
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column" style={{ borderRight: "solid 1px", borderColor: "grey", paddingRight: 8 }}>
                  <Nav.Item>
                    <Nav.Link eventKey="login">考生登入</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="signup">用户注册</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="login" >
                    <Row>
                      <Col>
                        <Form style={{ maxWidth: "67%" }}>
                          <Form.Group controlId="formUsername">
                            <Form.Label>用户名</Form.Label>
                            <Form.Control type="text" placeholder="" />
                          </Form.Group>

                          <Form.Group controlId="formPassword">
                            <Form.Label>密码</Form.Label>
                            <Form.Control type="password" placeholder="" />
                            <hr />
                            <Row>
                              <Col>
                                <a href="/forgotpassword">忘记密码</a>
                              </Col>
                              <Col>
                                <Button variant="primary" onClick={() => { alert("登入失败") }} style={{ display: "block", margin: "0 0 0 auto" }}>
                                  登入
                              </Button>
                              </Col>
                            </Row>
                          </Form.Group>
                        </Form>
                      </Col>
                    </Row>
                  </Tab.Pane>

                  <Tab.Pane eventKey="signup">

                    <SignUpForm />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
        <Col sm={4}>
        </Col>
      </Row>
    </div>
  )
}

const Tabs = (props) => {
  return (
    <Row>
      <Col sm={8} md={8} lg={8}>
        <Tab.Container id="account-tabs" defaultActiveKey="login">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column" style={{ borderRight: "solid 1px", borderColor: "grey", paddingRight: 8 }}>
                <Nav.Item>
                  <Nav.Link eventKey="login">考生登入</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="signup">用户注册</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="login" >
                  <LoginForm />
                </Tab.Pane>

                <Tab.Pane eventKey="signup">
                  <SignUpForm />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Col>
      <Col sm={4}>
      </Col>
    </Row>
  )

}

const LoginPage = (props) => {
  useEffect(() => {
    document.title = `${constants.title.login} - ${constants.appName}`
  }, [])


  return (
    <>
      <div className="container">
        <UserLink>admin</UserLink>
      </div>
      <LoginForm />
    </>
  )
}

export default LoginPage;