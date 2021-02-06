import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

const CustomNavbar = (props) => {
  return (
    <Navbar variant={props.variant} bg={props.bg}>
      <Navbar.Brand href="#">
        {props.title}
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#college">查询学校</Nav.Link>
        <Nav.Link href="#college">查询学校</Nav.Link>
        <Nav.Link href="#forum">考生论坛</Nav.Link>
        <Nav.Link href="#about">关于</Nav.Link>
      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="..." className="mr-sm-2" />
        <Button variant="outline-info">查询</Button>
      </Form>
      
    </Navbar>
  )
}
export default CustomNavbar;