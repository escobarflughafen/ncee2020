import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Form, FormControl, Button, Nav, Tab, Row, Col, Table, FormGroup } from 'react-bootstrap'
import { Navbar, NavDropdown, Breadcrumb, Pagination } from 'react-bootstrap'

const CNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">高校录取分数线</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">看数据</Nav.Link>
          <Nav.Link href="#home">查学校</Nav.Link>
          <Nav.Link href="#link">讨论区</Nav.Link>
          <Nav.Link href="#about">关于</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
        <Nav.Link href="login">登入</Nav.Link>
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
          <Nav.Link href="#home">设置</Nav.Link>
          <Nav.Link href="#home">反馈</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Tabs = (props) => {
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

const CBreadcrumb = () => (
  <Breadcrumb>
    <Breadcrumb.Item href="#">查学校</Breadcrumb.Item>
    <Breadcrumb.Item active>广东工业大学</Breadcrumb.Item>
  </Breadcrumb>
)


const tabs = [
  {
    key: "1",
    name: "学校概况",
    content: (
      <div>
        广东工业大学由原广东工学院、广东机械学院和华南建设学院(东院)于1995年6月合并组建而成。学校已有近60年的办学历史，是一所以工为主、工理经管文法艺结合的、多科性协调发展的省属重点大学，是广东省高水平大学重点建设高校。
        <br />
　　学校坐落在中国南方名城广州，地理位置优越，校园占地总面积3066.67亩，拥有大学城、东风路、龙洞等多个校区。大学城校区突出工科特色，多个学科相互促进协调发展，创设多个协同创新科研平台。东风路校区突出艺术创意和社工服务氛围的营造，建有设计创意园和成果展示馆。龙洞校区突出管理学与理学氛围的营造，打造环境优美、恬静怡人的花园式校园。
        <br />

　　目前，学校共设有19个学院、4个公共课教学部(中心)、5个博士后科研流动站、4个省攀峰重点学科一级学科、6个省优势重点学科一级学科、5个省特色重点学科二级学科、7个一级学科博士学位授权点、31个二级学科博士学位授权点、23个一级学科硕士学位授权点、92个二级学科硕士学位授权点，具有工程(17个领域)、工商管理、工程管理、会计、翻译、社会工作、金融、艺术8种硕士专业学位授予权，同时具有同等学力人员申请硕士学位授予权。学校现有85个本科专业，自2014年起，所有本科专业均在广东省普通高等学校第一批本科录取批次招生。机械、信息、材料、化工四个学科为广东省“211工程”三期重点建设学科。2012年以来，工程学科位居ESI世界排名前1%行列。2017年7月，材料科学进入ESI世界排名前1%行列。
        <br />

　　学校提出“以更加解放的思想、更加开放的姿态、更加创新的体制机制、更加勤奋务实的工作作风，集聚海内外创新人才，多模式构建创新平台，营造创新氛围，培养创新人才”的发展思路，全面实施大学生创新行动计划、研究生拔尖创新人才培育计划、研究生优质生源“千苗计划”、师资队伍建设“百人计划”、“培英育才计划”以及团队平台重大成果培育计划等重大战略。近年来，学校在师资队伍、学术科研、人才培养等方面发展迅速，成效显著。
        <br />

　　学校高度重视师资队伍建设，师资力量不断增强。学校有职称自主评审权，现有专任教师2000多人，其中正高级职称300多人，副高级职称700多人。2011年以来，学校已引进“百人计划”特聘教授百余名和3名学院院长。其中“长江学者”9人、国家“杰青”9人、国家“优青”5人、教育部“新世纪优秀人才”5人、广东省“领军人才”7人、广东省“珠江学者”23人、广东省“杰青”10人等，同时还聘有外籍院士4人、中国工程院院士4人，已组建并入选广东省“创新团队”9个。高素质师资队伍的建设，为学校人才培养提供了强有力的支撑保证。目前全日制在校生45000余人，其中本科生38000余人，研究生7000余人，并招有不同层次的成人学历教育学生、港澳台生和外国留学生，已形成“学士-硕士-博士”完整的人才培养体系。
        <br />

　　学校坚持把科研工作紧密结合广东经济和社会发展需求，坚持不懈地走产学研相结合的道路，科研整体实力不断增强。学校建设有国家地方联合工程实验室1个、国家地方联合工程研究中心1个、国家发改委现代服务业产业集聚基地1个、教育部重点实验室1个、教育部国际合作联合实验室1个，广东省实验室1个以及其他省级科研平台77个。2017年，学校国家自然科学基金项目突破130项，位列全国高校第八十位;发明专利申请公开数1929件，位列全国高校第八位。近三年，学校科研成果荣获国家科技进步二等奖1项、省部级科学技术奖一等奖6项、中国专利优秀奖4项、教育部高等学校科学研究优秀成果奖(人文社会科学)1项、广东省哲学社会科学优秀成果奖一等奖3项。此外，学校还与地方政府和工业界联合建立了“广州国家现代服务业集成电路设计产业化基地”、“东莞华南设计创新院”、“佛山广工大数控装备协同创新研究院”、“河源广工大协同创新研究院”等多个跨学科协同创新平台，推进广东国防科技工业技术成果产业化应用推广中心落地，前期投入6亿元资助中心建设。目前学校正努力在精密装备、IC设计、工业设计、制药、软物质等领域构建高水平研发平台，促进产学研和协同创新取得实质性成果。
        <br />

　　学校致力于培养有国际视野、有坚实基础、有创新能力的人才。现有7个教育部卓越工程师教育培养计划专业，7个国家级特色专业建设点，1个国家级专业综合改革试点专业， 18个省级特色专业，13个广东省名牌专业，5个省级重点专业，16个省级专业综合改革试点专业;3门国家级精品课程(含双语教学示范课程)，91门省级精品课程(含双语教学示范课程);7个国家级工程实践教育中心、2个国家级研究生联合培养示范基地、1个国家级大学生实践教学基地、38个省级大学生实践教学基地;3个国家级实验教学示范中心，1个国家级虚拟仿真实验教学中心，24个省级实验教学示范中心，3个省级虚拟仿真实验教学中心;1个国家级教学团队。学校办学条件良好，现有计算机15271台套，教学、科研仪器设备固定资产总值12.55亿元。校舍建筑面积156万余平方米。图书馆拥有藏书377.3万册、电子图书224.6万册，并采用共享方式，多渠道、大幅度拓展了信息资源使用范围。学校从学生成才观的理念转变抓起，探索性实施了“重基础、强能力、宽视野、多样性、有担当”的培养方案改革，着力探索以培养创新创业精神和实践能力为重点、基于产学研全程结合的人才培养新模式与新思路，同时将人才培养(特别是本科生培养)纳入高水平科技创新平台建设规划之中。
        <br />

　　学校高度重视对外合作与交流，专门设立出国(境)留学基金和来华留学基金，推进以“学科为主体”的国际合作与交流战略，促进学科和团队与国(境)外高水平大学、科研机构和跨国企业等建立战略合作伙伴关系，搭建合作平台，对接国际一流技术，引进国际一流人才。学校高度重视服务国家“一带一路”发展战略，加强“一带一路”沿线国家人才培养，支持“一带一路”沿线国家学生来华留学与技术培训。学校先后与国(境)外150多所大学和机构建立合作关系，开展合作办学、学生联合培养、师资培养、教学模式改革、合作科研、人才引进和平台建设等多方位合作，推进重点学科建设进入国际前沿，为学校师资队伍国际化、人才培养国际化和科研工作国际化提供良好平台。学校入选国家外专局和教育部“高等学校学科创新引智计划”(“111计划”)。
        <br />

　　通过一系列创新举措，学生综合素质和创新能力不断提高，学生科技创新活动、文化体育活动取得重大突破。2015年，学校承办了第十四届“挑战杯”全国大学生课外学术科技作品竞赛，摘得两项特等奖、两项一等奖、两项二等奖，并以团体总分全国高校第二、广东高校第一的好成绩捧得“优胜杯”，创造了我校参加“挑战杯”竞赛的历史最好成绩，刷新了我校参加“挑战杯”竞赛的获奖层次和整体成绩的记录。 2016年，在“挑战杯•创青春”广东大学生创业大赛中，我们以金奖数第一、团体总分第一捧得“创青春杯”，创造了我校参加广东省“创青春”大学生创业竞赛的历史最好成绩。2017年，在第十五届“挑战杯”全国大学生课外学术科技作品竞赛中，摘得两项特等奖、一项二等奖、三项三等奖，并以特等奖总数全国第二、团体总分广东高校第一的好成绩捧得“优胜杯”。在全国大学生电子商务大赛暨全国高校“创意、创新、创业”电子商务挑战赛总决赛中获得特等奖和一等奖;在第四届中国大学生方程式汽车大赛中，广工大FSAE车队获得营销报告第一名和总成绩第四名的佳绩;学生荣获美国大学生数学建模竞赛一等奖;学生作品分别荣获德国RED DOT(红点)设计大奖和美国IDEA设计大赛铜奖;2名学生先后荣获第七届、第十届中国青少年科技创新奖等;学校篮球队连续三年荣获全国大超联赛总冠军，2011年荣获第八届亚洲大学篮球锦标赛冠军等;学生舞蹈节目获全国大学生艺术展演一等奖等。
        <br />

　　学校全面贯彻党的十九大精神，以习近平新时代中国特色社会主义思想为指导，深入贯彻习近平总书记重要讲话精神，坚定不移地走内涵式发展道路，不断提高办学水平与质量，为建成以工为主、与产业深度融合、极具创造活力的特色鲜明的高水平大学而努力奋斗!
        <br />
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
      <ul class="rule-list clearfix"><li><span class="rule-item ellipsis">广东工业大学2020年本科招生网络直播宣讲会来啦(7月15日-21日)</span><span class="rule-time">2020-07-14</span></li><li><span class="rule-item ellipsis">广东工业大学2020年夏季普通高考招生章程</span><span class="rule-time">2020-06-15</span></li><li><span class="rule-item ellipsis">直播预告 | 广东工业大学“五月十六”招生直播咨询会！</span><span class="rule-time">2020-05-15</span></li><li><span class="rule-item ellipsis">广东高校宣讲会在线报名</span><span class="rule-time">2020-04-12</span></li><li><span class="rule-item ellipsis">广东工业大学2019年夏季普通高考招生章程</span><span class="rule-time">2019-08-10</span></li><li><span class="rule-item ellipsis">广东工业大学2019年招生指南</span><span class="rule-time">2019-06-24</span></li><li><span class="rule-item ellipsis">广东工业大学2019年夏季普通高考招生章程</span><span class="rule-time">2019-06-22</span></li><li><span class="rule-item ellipsis">广东工业大学2019年高水平运动队招生简章</span><span class="rule-time">2019-02-18</span></li><li><span class="rule-item ellipsis">广东工业大学2019年本科艺术类专业招生简章</span><span class="rule-time">2019-02-18</span></li><li><span class="rule-item ellipsis">广东工业大学2018年报考常见问题</span><span class="rule-time">2018-11-19</span></li><li><span class="rule-item ellipsis">广东工业大学2018年食宿条件</span><span class="rule-time">2018-11-19</span></li><li><span class="rule-item ellipsis">广东工业大学2018年本科招生章程</span><span class="rule-time">2018-11-08</span></li><li><span class="rule-item ellipsis">广东工业大学2018年表演专业招生简章</span><span class="rule-time">2018-11-08</span></li><li><span class="rule-item ellipsis">广东工业大学2018年高水平运动队招生简章</span><span class="rule-time">2018-11-08</span></li><li><span class="rule-item ellipsis">广东工业大学2018招生指南</span><span class="rule-time">2018-07-02</span></li><li><span class="rule-item ellipsis">请您为今年的考生简单介绍广东工业大学最新的基本情况</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">选择服从专业调剂，广东工业大学就可随意安排其专业了吗？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">广东工业大学入学后是否可以申请转专业？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">学生在广东工业大学期间可以攻读双专业、双学位、辅修专业吗？   </span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">广东工业大学优秀毕业生可以免试攻读硕士研究生吗？  </span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">2018年，广东工业大学的招生专业和招生计划是否有调整？以及今年录取政策上有哪些新变化？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">广东工业大学的专业录取规则</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">不同时代对于人才的需求是不一样的，一所大学对于人才培养的目标也随时代改变，如今，广东工业大学要培养的是什么样的人？学校人才培养的独特之处在哪里？目前有哪些多样化的人才培养模式？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">重点介绍一下广东工业大学的优势学科或者专业。入学后学生转专业容易吗?</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">考生对于专业的选择，您是否可以提供一些意见？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">广东工业大学对于特别优秀的考生有没有设置新生奖学金？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">在学生创新创业方面，广东工业大学有什么鼓励政策？</span><span class="rule-time">2018-07-01</span></li><li><span class="rule-item ellipsis">专访广东工业大学招办主任-中国教育在线</span><span class="rule-time">2018-06-29</span></li><li><span class="rule-item ellipsis">广东工业大学2018年普通高校招生章程</span><span class="rule-time">2018-06-25</span></li><li><span class="rule-item ellipsis">广东工业大学2018年招生计划</span><span class="rule-time">2018-06-25</span></li><li><span class="rule-item ellipsis">廣東工業大學2018年本科免試招收香港學生簡章</span><span class="rule-time">2018-01-11</span></li><li><span class="rule-item ellipsis">广东工业大学2017年招生计划</span><span class="rule-time">2017-12-29</span></li><li><span class="rule-item ellipsis">广东工业大学2017年普通高校招生章程</span><span class="rule-time">2017-06-30</span></li><li><span class="rule-item ellipsis">2016年广东工业大学特色班介绍</span><span class="rule-time">2016-07-22</span></li><li><span class="rule-item ellipsis">广东工业大学2016年招生计划（含文理,艺术）</span><span class="rule-time">2016-07-22</span></li><li><span class="rule-item ellipsis">广东工业大学2016年普通高校招生章程</span><span class="rule-time">2016-06-18</span></li><li><span class="rule-item ellipsis">2015年广东工业大学招生分数线</span><span class="rule-time">2015-07-15</span></li><li><span class="rule-item ellipsis">2015年广东工业大学招收国防生计划</span><span class="rule-time">2015-07-15</span></li><li><span class="rule-item ellipsis">广东工业大学2015年专业招生计划（网页版）</span><span class="rule-time">2015-06-26</span></li><li><span class="rule-item ellipsis">广东工业大学2015年普通高校招生章程</span><span class="rule-time">2015-06-23</span></li></ul>
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
      <hr />
      <Row>
        {
          [
            {
              user: "alice",
              date: "2020-02-15",
              content: "环境不错，设施都比较完整，工科类挺强的，师资力量不错，教学水平比较高。学校的学习氛围还不错。食堂最好吃的是第二饭堂。我住大学城，感觉大学城比较有科研的氛围。自动化和机械是比较不错的专业，就业也比较好。",
            },
            {
              user: "bob",
              date: "2020-02-09",
              content: "学校共有四个食堂，最好吃的是第二食堂。学校自动化专业、计算机专业最热门。",
            },
            {
              user: "carol",
              date: "2020-02-08",
              content: "我的学校很好，首先是学校环境总体来说就很不错，有山有水，所谓地杰人灵。教室都有空调，nice。饭堂里面的东西又便宜有好吃，可以说是经济实惠。宿舍环境也不错呀，网络好，开着空调上着网。",
            },
            {
              user: "dave",
              date: "2020-01-29",
              content: "师资是非常强大的，现在招收的讲师和研究员都要有海外经历，还要是国内顶尖的985大学毕业，我毕设的本科导师就是清华毕业的。假如你想在大学度过奋斗和充实的四年，高考分数又刚好是广工的水平，建议选择广工，因为广工你能看到很多在做事的人都有一种拼命的干劲，图书馆春夏秋冬都很多人，想去玩很方便，东区走150米就是大学城南站，西区出门也有公交，附近有美食街，电影院坐15分钟公交就到了。",
            }

          ].map((comment) => (
            <div>
              <h6>
                <span style={{ fontWeight: 600 }}>
                  {comment.user}
                </span>
                <span style={{ width: "100%" }}>
                  &emsp;
                </span>
                <span>
                  {comment.date}
                </span>
              </h6>
              <p>
                {comment.content}
              </p>
              <hr />
            </div>
          ))
        }
      </Row>
      <Row>
        <Form>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Control placeholder="姓名" />
              </Col>
              <Col>
                <Form.Control type="email" placeholder="E-mail" />
              </Col>
            </Form.Row>
          </Form.Group>

          <Form.Group>
            <Form.Row>
              <Col xs={6}>
                <Form.Control type="text" placeholder="评价" />
              </Col>
              <Col>
                <input type="submit" name="提交" />
              </Col>

            </Form.Row>
          </Form.Group>
        </Form>
      </Row>
    </div>)
  },
]


function App() {
  return (
    <div>
      <CNavbar />
      <div class="container" style={{ padding: "1em" }}>
        <div>
          <>
            <Alert id="alertdemo" variant="success">
              <Alert.Heading>通知</Alert.Heading>
              <p>
                通知内容
              </p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button onClick={() => {
                  let e = document.getElementById("alertdemo");
                  e.parentNode.removeChild(e);
                }} variant="outline-success">
                  关闭
          </Button>
              </div>
            </Alert>

          </>
          <p>
            <h3>广东工业大学</h3>
          </p>
          <Tabs tabs={tabs} style={{ height: "100%" }} />
        </div>
        <br />
        <CBreadcrumb />
      </div>
      <div style={{ height: "3em" }} />
      <BNavbar />
    </div>
  )
}

export default App;
