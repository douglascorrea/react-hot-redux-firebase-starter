/**
 * Created by clementlucas on 09/03/2017.
 */
import React from 'react';
import {Row, Col} from 'react-bootstrap';
import MessageForm from './MessageForm';

class ChatRoomFocus extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newMessage: ''
    };

    this.onNewMessageChange = this.onNewMessageChange.bind(this);
    this.sendNewMessage = this.sendNewMessage.bind(this);
  }

  onNewMessageChange(event) {
    event.preventDefault();
    this.setState({
      newMessage: event.target.value
    })
  }

  sendNewMessage(event) {
    event.preventDefault();

    const newMessage = this.state.newMessage;

    this.props.onSend(newMessage);
    this.setState({
      newMessage: ''
    })
  }

  render() {
    let res = [];
    let {chatroom} = this.props;

    const isDisplayed = chatroom && chatroom !== null && chatroom.messsages !== null;
    if (isDisplayed) {
      for (const key in chatroom.messages) {
        const lkey = chatroom.messages[key].id;
        const message = chatroom.messages[key].message;
        res.push(
          <li key={lkey}>{message.sender.email} : {message.content}</li>
        );
      }
    } else {
      chatroom = {name: '#'};
    }

    return (
      <div className="container">
        <Row>
          <Col sm={12}>
            <h3>{chatroom.name}</h3>
          </Col>
        </Row>

        <Row>
          <ul>
            {res}
          </ul>
        </Row>

        {
          isDisplayed &&
          <Row>
            <MessageForm
              message={this.state.newMessage}
              onChange={this.onNewMessageChange}
              onSubmit={this.sendNewMessage}/>
          </Row>
        }
      </div>
    );
  }
}

ChatRoomFocus.propTypes = {
  onSend: React.PropTypes.func.isRequired
};

export default ChatRoomFocus;
