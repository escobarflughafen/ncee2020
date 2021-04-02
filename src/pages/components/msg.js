import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Table, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup, ListGroupItem } from 'react-bootstrap'


const MsgAlert = (props) => {
  const msg = props.msg || { type: '', text: '' }

  return (
    <>
      {
        (msg.type && msg.text && msg.text.length > 0) ? (
          <Alert {...props} variant={msg.type}>{msg.text}</Alert>
        ) : null
      }
    </>
  )
}


export { MsgAlert }