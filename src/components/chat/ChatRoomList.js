/**
 * Created by clementlucas on 08/03/2017.
 */
import React from 'react';
import {ListGroupItem, ListGroup} from 'react-bootstrap';

class ChatRoomList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.selectChatRoom = this.selectChatRoom.bind(this);
  }

  selectChatRoom(name) {
    this.props.onSelect(name);
  }

  render() {
    const {chatrooms} = this.props;

    return (
      <ListGroup className="chatrooms-list">
        {
          chatrooms.map(chatroom => (
            <ListGroupItem
              key={chatroom.id}
              onClick={this.selectChatRoom.bind(null, chatroom.name)}>
              {chatroom.name}
            </ListGroupItem>
          ))
        }
      </ListGroup>
    );
  }
}

ChatRoomList.propTypes = {
  chatrooms: React.PropTypes.array.isRequired,
  onSelect: React.PropTypes.func.isRequired
};

export default ChatRoomList;
