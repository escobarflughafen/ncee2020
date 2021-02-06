import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'

const flows = [
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2020年本科招生指南",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2021年本科艺术类专业招生简章",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1235",
    wcounter: 213,
    ccounter: 12,
    liked: 13,
    repost: 4,
  },
  {
    category: '动态',
    from: "user01",
    content: "省内排名18000有没有机会被华工录取",
    timestamp: "2021/01/02",
    posturl: "/user/24/23",
    wcounter: 21,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '讨论',
    title: "省内3万名，广工报什么专业好",
    timestamp: "2021/01/02",
    province: "广东",
    posturl: "/forum/1234",
    wcounter: 2111,
    ccounter: 32,
    liked: 23,
    repost: 4,
  },
  {
    category: '新闻',
    from: "中山大学",
    title: "中山大学2020年本科招生章程",
    timestamp: "2021/01/02",
    posturl: "/institute/122/123",
    wcounter: 2113,
    ccounter: 25,
    liked: 12,
    repost: 5,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2020年本科招生指南",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2020年本科招生指南",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2021年本科艺术类专业招生简章",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1235",
    wcounter: 213,
    ccounter: 12,
    liked: 13,
    repost: 4,
  },
  {
    category: '动态',
    from: "user01",
    content: "省内排名18000有没有机会被华工录取",
    timestamp: "2021/01/02",
    posturl: "/user/24/23",
    wcounter: 21,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2021年本科艺术类专业招生简章",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1235",
    wcounter: 213,
    ccounter: 12,
    liked: 13,
    repost: 4,
  },
  {
    category: '动态',
    from: "user01",
    content: "省内排名18000有没有机会被华工录取",
    timestamp: "2021/01/02",
    posturl: "/user/24/23",
    wcounter: 21,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '讨论',
    title: "省内3万名，广工报什么专业好",
    timestamp: "2021/01/02",
    province: "广东",
    posturl: "/forum/1234",
    wcounter: 2111,
    ccounter: 32,
    liked: 23,
    repost: 4,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2020年本科招生指南",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '新闻',
    from: "广东工业大学",
    title: "广东工业大学2021年本科艺术类专业招生简章",
    timestamp: "2021/01/02",
    posturl: "/institute/123/1235",
    wcounter: 213,
    ccounter: 12,
    liked: 13,
    repost: 4,
  },
  {
    category: '动态',
    from: "user01",
    content: "省内排名18000有没有机会被华工录取",
    timestamp: "2021/01/02",
    posturl: "/user/24/23",
    wcounter: 21,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: '新闻',
    from: "中山大学",
    title: "中山大学2020年本科招生章程",
    timestamp: "2021/01/02",
    posturl: "/institute/122/123",
    wcounter: 2113,
    ccounter: 25,
    liked: 12,
    repost: 5,
  }
]
const style = {
  padding: 8,
  paddingBottom: 0
}
const style2 = {

}
const span = {
  marginRight: 2
}
const col = {
  width: "fit-content"
}
const scrolloverflow = {
  height: 560,
  overflow: "auto"
}


const Sidebar = (props) => {


}

const Status = (props) => {
  return (
    <Alert key={1} variant="danger">
      未连接服务器
    </Alert>
  )

}

// as a componenet
const PostEditor = (props) => {
  return (
    <Form>
      <Form.Control as="textarea" rows={3} style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }} />

      <div style={{ display: "block", margin: "0 0 0 auto" }}>
        <Button variant="light" style={{ display: "inline", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} >
          添加图片
              </Button>
        <Button variant="light" type="submit" style={{ display: "inline", borderTopLeftRadius: 0, borderTopRightRadius: 0, borderBottomLeftRadius: 0 }} >
          发布
              </Button>

      </div>
    </Form>

  )
}

const Feeds = (props) => {
  return (
    <div>
      <div>
        <Status />
        <PostEditor />
        <hr />
      </div>
      <ListGroup>
        {
          flows.map((flow) => {
            switch (flow.category) {
              case "新闻":
                return (
                  <ListGroup.Item>
                    <div style={{ padding: 8, paddingTop: 4, paddingBottom: 4 }}>
                      <Row>
                        <Col sm={2}>
                          <Row>
                            <span style={{ fontWeight: 600 }}>{flow.from}</span>
                          </Row>
                          <Row>
                            <Button variant="success" size="sm">
                              关注
                                </Button>
                          </Row>
                          <Row>
                            <span style={style2}>{flow.timestamp}</span>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <p><a href={flow.posturl}>{flow.title}</a></p>
                          </Row>
                          <hr />
                          <Row style={{ textAlign: "right" }}>
                            <Col>
                              <span>{flow.wcounter}</span>
                              已看
                            </Col>
                            <Col>
                              <span>{flow.ccounter}</span>
                              回复
                            </Col>
                            <Col>
                              <span>{flow.repost}</span>
                              转发
                            </Col>
                            <Col>
                              <span>{flow.liked}</span>
                              收藏
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                    </div>
                  </ListGroup.Item>
                )

              case "讨论":
                return (
                  <ListGroup.Item>
                    <div style={{ padding: 8, paddingTop: 2, paddingBottom: 2 }}>
                      <Row>
                        <Col sm={2}>
                          <Row>
                            <span style={{ fontWeight: 600 }}>讨论</span>

                          </Row>
                          <Row>
                            <span style={style2}>{flow.timestamp}</span>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <p>[{flow.province}]<a href={flow.posturl}>{flow.title}</a></p>
                          </Row>
                          <Row style={{ textAlign: "right" }}>
                            <Col>
                              <span>{flow.ccounter}</span>
                              回复
                            </Col>
                            <Col>
                              <span>{flow.repost}</span>
                              转发
                            </Col>
                            <Col>
                              <span>{flow.liked}</span>
                              收藏
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </ListGroup.Item>
                )

              case "动态":
                return (
                  <ListGroup.Item>

                    <div style={{ padding: 8, paddingTop: 4, paddingBottom: 4 }}>
                      <Row>
                        <Col sm={2}>
                          <Row>
                            <span style={{ fontWeight: 600 }}>{flow.from}</span>
                          </Row>
                          <Row>
                            <span style={style2}>{flow.timestamp}</span>
                          </Row>
                        </Col>
                        <Col>
                          <Row>
                            <p>{flow.content}</p>
                          </Row>
                          <Row style={{ textAlign: "right" }}>
                            <Col>
                              <span>{flow.ccounter}</span>
                              回复
                            </Col>
                            <Col>
                              <span>{flow.repost}</span>
                              转发
                            </Col>
                            <Col>
                              <span>{flow.liked}</span>
                              收藏
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </ListGroup.Item>
                )

              default:
                return (<></>)
            }
          })
        }

      </ListGroup>
    </div>
  )

}


const Trends = (props) => {
  return (
    <div>
      <h5>招生咨询</h5>
      <ul>
        {
          [
            "广东工业大学2020年本科招生指南",
            "华南理工大学2020年本科招生指南",
            "中山大学2020年本科招生指南",
            "深圳大学2020年本科招生指南",
            "广州大学2020年本科招生指南",
            "暨南大学2020年本科招生指南",
            "华南师范大学2020年本科招生指南",
            "华南农业大学2020年本科招生指南",
            "南方医科大学2020年本科招生指南",
          ].map((link) => {
            return (
              <>

                <li><a href="https://eolgd.sharedbook.cn/books/hmvs/mobile/index.html?from=singlemessage">{link}</a></li>
                <hr />
              </>
            )
          })
        }
      </ul>
    </div>
  )
}


const Homepage = (props) => {
  return (
    <div>
      <Row>
        <Col sm={12} md={8} lg={8} style={scrolloverflow}>
          <Feeds />
        </Col>

        <Col sm={8} md={4} lg={4}>
          <Trends />
        </Col>
      </Row>
    </div >
  )

}

export default Homepage;