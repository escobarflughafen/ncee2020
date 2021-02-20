import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect, useHistory, useLocation } from 'react-router-dom'
import SVG from './utils/svg'
import Homepage from './pages/homepage'
import InstitutePage from './pages/institute'
import Statistics from './pages/statistics'
import NavigationBar  from './pages/components/navigation-bar'

// components
const CNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">高校录取分数线</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/home">首页</Link>
          <Link to="/data">看数据</Link>
          <Link to="/institute">查学校</Link>
          <Link to="/forum">讨论区</Link>
          <Link to="/about">关于</Link>
        </Nav>
        <Form inline style={{ marginRight: 8 }}>
          <FormControl type="text" placeholder="..." className="mr-sm-2" />
          <Button variant="outline-success">搜索</Button>
        </Form>

        <Nav.Link href="/login">登入</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

const BNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="bottom">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">设置</Nav.Link>
          <Nav.Link href="/home">反馈</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const InfoTabs = (props) => {
  return (
    <div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              {
                props.tabs.map((tab) => (
                  <Nav.Item>
                    <Nav.Link eventKey={tab.key}>{tab.name}</Nav.Link>
                  </Nav.Item>
                ))
              }
            </Nav>
            <hr />
            <Row>
              <Col>
                <Button variant="success">
                  关注
                </Button>
              </Col>
            </Row>
          </Col>
          <Col sm={9}>
            <Tab.Content style={{ padding: "0" }}>
              {
                props.tabs.map((tab) => (
                  <Tab.Pane eventKey={tab.key}>
                    {tab.content}
                  </Tab.Pane>
                ))
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  )
}

const LoginForm = () => {
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
                            [2021, 2020, 2019, 2018, 2017, 2016, "2016前"].map((year) => (<option>{year}</option>))
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



const BreadcrumbNavigator = ({ path }) => {
  return (
    <Breadcrumb>
      {
        path.map((dir) => {
          return (
            <Breadcrumb.Item
              href={dir.url}
            >
              {dir.name}
            </Breadcrumb.Item>
          )
        })
      }
    </Breadcrumb>
  )
}

// handlers


// pages

const Data = ({ path, setPath }) => {
  return (<div>Data</div>)
}

const Institute = ({ path, setPath }) => {
  return (<InfoTabs tabs={tabs} />)
}

const Forum = ({ path, setPath }) => {
  return (<div>Forum</div>)
}

const About = ({ path, setPath }) => {
  return (<div>About</div>)
}

const Login = ({ path, setPath }) => {
  return (
    <LoginForm />
  )
}

const Account = ({ path, setPath }) => {
  return (<div>Account</div>)
}


// temporary data for test


const tabs = [
  {
    key: "1",
    name: "学校概况",
    content: (
      <div>
        <p>
          广东工业大学由原广东工学院、广东机械学院和华南建设学院(东院)于1995年6月合并组建而成。学校已有近60年的办学历史，是一所以工为主、工理经管文法艺结合的、多科性协调发展的省属重点大学，是广东省高水平大学重点建设高校。
        </p>
      </div>
    )
  },
  {
    key: "2",
    name: "历年分数",
    content: (
      <div>
        <Row class="d-flex flex-row-reverse">
          <Form inline>
            <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
              年份
        </Form.Label>
            <Form.Control
              as="select"
              className="my-1 mr-sm-2"
              id="inlineFormCustomSelectPref"
              size="sm"
              custom
            >
              <option value="1">2020</option>
              <option value="2">2019</option>
              <option value="3">2018</option>
            </Form.Control>
          </Form>
          <br />
        </Row>
        <Row>
          <Table striped bordered hover>
            <tbody><tr><th>专业名称</th><th>最高分</th><th>平均分</th><th>最低分</th><th>最低位次</th><th>录取批次</th></tr><tr><td>软件工程</td><td>580</td><td>563</td><td>557</td><td>26850</td><td>本科批</td></tr><tr><td>计算机科学与技术</td><td>590</td><td>557</td><td>553</td><td>29173</td><td>本科批</td></tr><tr><td>自动化</td><td>587</td><td>558</td><td>550</td><td>31030</td><td>本科批</td></tr><tr><td>数据科学与大数据技术</td><td>575</td><td>555</td><td>549</td><td>31643</td><td>本科批</td></tr><tr><td>电气工程及其自动化</td><td>588</td><td>556</td><td>547</td><td>32930</td><td>本科批</td></tr><tr><td>物联网工程</td><td>570</td><td>549</td><td>546</td><td>33605</td><td>本科批</td></tr><tr><td>网络工程</td><td>557</td><td>549</td><td>546</td><td>33605</td><td>本科批</td></tr><tr><td>信息安全</td><td>560</td><td>548</td><td>545</td><td>34245</td><td>本科批</td></tr><tr><td>机械类（含机械设计制造及其自动化、机械电子工程、车辆工程）</td><td>589</td><td>551</td><td>542</td><td>36258</td><td>本科批</td></tr><tr><td>建筑学</td><td>580</td><td>552</td><td>540</td><td>37642</td><td>本科批</td></tr></tbody>
          </Table>
        </Row>
        <Row>
          <Pagination>
            <Pagination.First />
            <Pagination.Prev />
            <Pagination.Item active>{1}</Pagination.Item>
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Item>{3}</Pagination.Item>
            <Pagination.Item>{4}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>

        </Row>

      </div>
    )
  },
  {
    key: "3",
    name: "招生资讯",
    content: (
      <ul><li><span class="rule-item ellipsis">中山大学2020年本科招生章程</span><span class="rule-time">2020-07-05</span></li><li><span class="rule-item ellipsis">中山大学2020年强基计划招生简章</span><span class="rule-time">2020-05-21</span></li><li><span class="rule-item ellipsis">广东高校宣讲会在线报名</span><span class="rule-time">2020-04-12</span></li><li><span class="rule-item ellipsis">中山大学2019年自主招生简章</span><span class="rule-time">2020-01-07</span></li><li><span class="rule-item ellipsis">中山大学2019年本科招生指南</span><span class="rule-time">2019-06-24</span></li><li><span class="rule-item ellipsis">中山大学2019年本科招生章程</span><span class="rule-time">2019-06-09</span></li><li><span class="rule-item ellipsis">中山大学2019年自主招生招生计划</span><span class="rule-time">2019-03-26</span></li><li><span class="rule-item ellipsis">中山大学2019年自主招生报名条件</span><span class="rule-time">2019-03-26</span></li><li><span class="rule-item ellipsis">中山大学2019年自主招生简章</span><span class="rule-time">2019-03-26</span></li><li><span class="rule-item ellipsis">中山大学2019年外语类保送生招生简章</span><span class="rule-time">2019-02-18</span></li><li><span class="rule-item ellipsis">中山大学2019年高水平运动队招生简章</span><span class="rule-time">2019-02-18</span></li><li><span class="rule-item ellipsis">中山大学2019年高水平艺术团招生简章</span><span class="rule-time">2019-02-18</span></li><li><span class="rule-item ellipsis">中山大学2018年自主招生面试真题</span><span class="rule-time">2019-03-14</span></li><li><span class="rule-item ellipsis">中山大学2018年高校专项计划(农村学生)招生简章</span><span class="rule-time">2018-12-18</span></li><li><span class="rule-item ellipsis">中山大学2018报考常见问题</span><span class="rule-time">2018-11-29</span></li><li><span class="rule-item ellipsis">中山大学2018年高水平艺术团招生简章</span><span class="rule-time">2018-11-08</span></li><li><span class="rule-item ellipsis">中山大学2018年高水平运动队招生简章</span><span class="rule-time">2018-11-08</span></li><li><span class="rule-item ellipsis">中山大学2018年外语类保送生招生简章</span><span class="rule-time">2018-11-08</span></li><li><span class="rule-item ellipsis">中山大学2018年本科招生指南</span><span class="rule-time">2018-07-02</span></li><li><span class="rule-item ellipsis"> 2018中山大学专业招生计划 </span><span class="rule-time">2018-06-24</span></li><li><span class="rule-item ellipsis">中山大学2018年本科招生章程</span><span class="rule-time">2018-06-12</span></li><li><span class="rule-item ellipsis">中山大学2018年自主招生简章</span><span class="rule-time">2018-05-02</span></li><li><span class="rule-item ellipsis">中山大学2018年高校专项计划(农村学生)招生简章</span><span class="rule-time">2018-04-03</span></li><li><span class="rule-item ellipsis">中山大学2017年广东省综合评价录取招生简章</span><span class="rule-time">2017-06-15</span></li><li><span class="rule-item ellipsis">中山大学2017年本科招生章程</span><span class="rule-time">2017-06-15</span></li><li><span class="rule-item ellipsis">中山大学2017年高校专项计划(农村学生)招生简章</span><span class="rule-time">2017-04-25</span></li><li><span class="rule-item ellipsis">中山大学2017年自主招生简章</span><span class="rule-time">2017-03-22</span></li><li><span class="rule-item ellipsis">中山大学2017年外语类保送生招生简章</span><span class="rule-time">2017-03-15</span></li><li><span class="rule-item ellipsis">中山大学2016年本科招生章程</span><span class="rule-time">2016-05-30</span></li><li><span class="rule-item ellipsis">中山大学2016年高水平艺术团招生简章</span><span class="rule-time">2016-01-11</span></li><li><span class="rule-item ellipsis">中山大学2016年高水平运动队招生简章</span><span class="rule-time">2016-01-11</span></li><li><span class="rule-item ellipsis">中山大学2016年外语类保送生招生简章</span><span class="rule-time">2016-01-11</span></li><li><span class="rule-item ellipsis">中山大学2016年澳门保送生招生简章</span><span class="rule-time">2016-01-07</span></li><li><span class="rule-item ellipsis">中山大学2015年专业招生计划（网页版）</span><span class="rule-time">2015-06-26</span></li><li><span class="rule-item ellipsis">中山大学2015年本科招生章程</span><span class="rule-time">2015-06-09</span></li><li><span class="rule-item ellipsis">中山大学2015年自主招生简章</span><span class="rule-time">2015-03-01</span></li><li><span class="rule-item ellipsis">中山大学2015年招收艺术特长生实施办法 </span><span class="rule-time">2015-02-13</span></li><li><span class="rule-item ellipsis">中山大学2015年招收高水平运动员实施办法</span><span class="rule-time">2015-01-22</span></li><li><span class="rule-item ellipsis">中山大学2015年外语类保送生招生简章</span><span class="rule-time">2015-01-22</span></li><li><span class="rule-item ellipsis">中山大学2015年招收艺术特长生实施办法</span><span class="rule-time">2015-01-22</span></li></ul>
    )
  },
  {
    key: "4",
    name: "考生评价",
    content: (<div>

      <Row class="d-flex flex-row-reverse">
        <Form inline>

          <Form.Control
            as="select"
            className="my-1 mr-sm-2"
            id="inlineFormCustomSelectPref"
            size="sm"
            custom
          >
            <option value="1">按时间排序</option>
            <option value="2">按热度排序</option>
          </Form.Control>
        </Form>
      </Row>
      <Row>
        {
          [
            "作为华南地区第一的985211，中大还是蛮占优势的，尤其是要在广州深圳发展的话，学习氛围不错，吃在中东，住在中珠，玩在中南，最好的专业应该就是中山医和岭院管院了。",
            "中山大学，中国前十的大学，华南第一学府。今后考虑在广东发展的朋友可以以此为跳板。学生一般就读于广州大学城校区，地理位置一般，但学习生活条件不错。",
            "学校名气在北边名气不大，不过在华南这边认可度是比较高的。软件工程毕业之后主要去互联网公司，做程序员。",
            "中山大学，华南第一学府，双一流，为985，211高校，离市中心近，学风建设优秀，学风淳朴，体育设备齐全，宿舍环境挺好的，是一所名副其实的好学校 中山医学院更是号称国内前列的医学院，老师们都是一边科研一边教学，现在有五个校区，南校区是本部，环境优美，经常有毕业生来拍婚纱照，真实的红砖绿瓦，各种鸟类栖息于榕树之上。",
            "中山大学是一所历史悠久的高校，优点是学校的教书育人氛围很好，同学之间关系融洽，老师愿意为学生答疑解惑，领导们又很注重学生的个性自由发展。"
          ].map((comment) => (
            <div>
              <p>
                {comment}
              </p>

              <hr />
            </div>
          ))
        }
      </Row>
    </div>)
  },
]


function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      <Router>
        <Navbar className="bg-dark" variant="dark" expand="lg">
          <Link className="navbar-brand" to="/">高校录取分数线</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <Link className="nav-link" to="/home">主页</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/stats">看数据</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/institute">查学校</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/forum">讨论区</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/about">关于</Link>
              </Nav.Item>
            </Nav>
            <Form inline className="mr-2 d-none d-lg-block">
              <FormControl type="text" placeholder="..." className="mr-sm-2" />
              <Button variant="outline-success">搜索</Button>
            </Form>

            <Nav>
              <Nav.Item>
                <Link className="nav-link d-lg-none" to="/search">搜索</Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="nav-link" to="/login">登入</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Switch>
          <div className="container mt-3">
            <Route path="/" exact={true}>
              <Homepage />
            </Route>

            <Route path="/home">
              <Redirect to="/" />
            </Route>

            <Route path="/stats">
              <Statistics />
            </Route>

            <Route path="/institute" component={() => (<InstitutePage />)}>
            </Route>

            <Route path="/forum">
              <Forum />
            </Route>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/account">
              <Account />
            </Route>

            <Route path="/demo1">
              <InfoTabs tabs={tabs} />
            </Route>
            <Route path="/demo2">

            </Route>
            <Route path="/demo3">

            </Route>
            <Route path="/demo4">

            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
