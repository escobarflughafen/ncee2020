import 'bootstrap/dist/css/bootstrap.min.css'
import '../../style.css'
import { Alert, Form, FormControl, Button, ButtonGroup, Nav, Tab, Row, Col, Table, Spinner, InputGroup, Dropdown, DropdownButton, ListGroup, Image, Card, CardGroup, CardDeck, Badge, Tabs, FormGroup, ListGroupItem } from 'react-bootstrap'


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


const MsgListItem = (props) => {
  const msg = props.msg || { type: '', text: '' }
  const type = props.msg

  return (
    <>
      {
        (msg.type && msg.text && msg.text.length > 0) ? (
          <ListGroup.Item>
            <Alert {...props} variant={msg.type} className={`${props.className} m-0 align-baseline`}>
              {(msg.type === 'info') ?
                <Spinner
                  animation="border"
                  role="status"
                  className="mr-2"
                  size="sm"
                >
                  <span className="sr-only">Loading...</span>
                </Spinner>
                : null}
              {msg.text}
            </Alert>
          </ListGroup.Item>
        ) : null
      }
    </>
  )

}


export { MsgAlert, MsgListItem }