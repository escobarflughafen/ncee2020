import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { Tabs, Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { Badge, Card, Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, NavLink, Redirect } from 'react-router-dom'
import SVG from '../utils/svg'


const feeddata = [
  {
    category: 'news',
    from: "广东工业大学",
    post: {
      title: "广东工业大学2020年本科招生指南",
      brief: "经考生自主报名、我校2021年高水平运动队报名资格审核工作小组审核及考生报名资格初审名单公示，现公布我校2021年高水平运动队初审合格名单，见附表。"
    },
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: 'shortmsg',
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
    category: 'discussion',
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
    category: 'shortmsg',
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
    category: 'post',
    from: "广东工业大学",
    post: {
      title: "广东工业大学2020年本科招生指南",
      brief: "经考生自主报名、我校2021年高水平运动队报名资格审核工作小组审核及考生报名资格初审名单公示，现公布我校2021年高水平运动队初审合格名单，见附表。"
    },
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: 'shortmsg',
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
    category: 'discussion',
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
    category: 'news',
    from: "广东工业大学",
    post: {
      title: "广东工业大学2020年本科招生指南",
      brief: "经考生自主报名、我校2021年高水平运动队报名资格审核工作小组审核及考生报名资格初审名单公示，现公布我校2021年高水平运动队初审合格名单，见附表。"
    },
    timestamp: "2021/01/02",
    posturl: "/institute/123/1234",
    wcounter: 32,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
  {
    category: 'shortmsg',
    from: "user01",
    content: "省内排名18000有没有机会被华工录取",
    timestamp: "2021/01/02",
    posturl: "/user/24/23",
    wcounter: 21,
    ccounter: 3,
    liked: 2,
    repost: 0,
  },
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
  maxHeight: "90vh",
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
      <div>
        <Nav fill>
          <Nav.Item>
            <Nav.Link>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image-fill" viewBox="0 0 16 16">
                <path d="M.002 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V3zm1 9v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12zm5-6.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0z" />
              </svg>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              发布
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </div>
    </Form>

  )
}


// as components

const PostThumbnail = ({ post }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>{post.title}</Card.Title>
        <Card.Text>
          {post.brief}
        </Card.Text>
        <Button variant="success">阅读全文</Button>
      </Card.Body>
    </Card>
  )
}


const matchIcon = (category) => {
  switch (category) {
    case "shortmsg":
      return (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-text" viewBox="0 0 16 16">
            <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />
            <path d="M4 5.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8zm0 2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
          </svg>

        </span>
      )
    case "post":
    case "news":
      return (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
            <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
            <path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
          </svg>
        </span>
      )
    case "discussion":
      return (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-at" viewBox="0 0 16 16">
            <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z" />
          </svg>
        </span>
      )
    default:
      return (
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
      )
  }
}

const Feed = ({ feed }) => {
  return (
    <>
      <ListGroup.Item>
        <Row>
          <Col sm="auto">
            {
              matchIcon(feed.category)
            }
          </Col>
          <Col>
            <Row>
              <Col >
                {
                  feed.from && (<><span style={{ fontWeight: 600 }}>{feed.from}</span></>)
                  || (<span>讨论</span>)
                }
              </Col>
              <Col sm="auto" style={{ textAlign: "right" }}>
                <span>
                  {feed.timestamp}
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="my-2">
                {
                  feed.content
                  ||
                  (
                    feed.post
                    &&
                    (
                      <PostThumbnail post={feed.post} />
                    )
                  )
                }
              </Col>
            </Row>
            <Row>
              <Col style={{fontSize: "80%"}}>
                  <span style={{marginRight: 4}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                  </span>
                  {feed.province}
              </Col>
            </Row>
            <Row style={{ textAlign: "center" }}>
              <Col>
                <Nav fill>
                  <Nav.Item>
                    <Nav.Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                      </svg>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                      </svg>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                      </svg>
                    </Nav.Link>
                  </Nav.Item>
                  {
                    /*
                  <Nav.Item>
                    <Nav.Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
                        <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z" />
                        <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586l7 7L13.586 9l-7-7H2v4.586z" />
                      </svg>
                    </Nav.Link>
                  </Nav.Item>
                    */
                  }
                  <Nav.Item>
                    <Nav.Link>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
                      </svg>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Row>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

const Feeds = (props) => {
  return (
    <div>
      <div>
        <Status />
        <PostEditor />
      </div>
      <ListGroup variant="flush" className="my-3">
        {feeddata.map((feed) => {
          return (<Feed feed={feed} />)
        })}
        {
          /*
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
          */

        }

      </ListGroup>

    </div>
  )

}


const Trends = (props) => {
  return (
    <div>
      <ListGroup>
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
              <ListGroup.Item>
                <a href="/">{link}</a>
              </ListGroup.Item>
            )
          })
        }

      </ListGroup>
    </div>
  )
}


const Homepage = (props) => {
  return (
    <div style={{padding: "1em"}}>
      <Row>
        <Col sm={12} md={8} lg={8} style={scrolloverflow}>
          {// TODO: UPDATE with <Card /> component
          }
          <Tabs defaultActiveKey="feeds" id="uncontrolled-tab-example" fill justify>
            <Tab eventKey="feeds" title="动态">
              <Feeds />
            </Tab>
            <Tab eventKey="interact" title={(<span>消息 <Badge variant="info">3</Badge></span>)}>
            </Tab>
          </Tabs>
        </Col>

        <Col sm={0} md={4} lg={4}>
              <Trends />
        </Col>
      </Row>
    </div >
  )

}

export default Homepage;