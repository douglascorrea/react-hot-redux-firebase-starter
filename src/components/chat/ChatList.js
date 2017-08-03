import React, { Component } from 'react';
import ChatListItem from './ChatListItem';
import { connect } from 'react-redux';

class ChatList extends Component {

  renderList() {
    return this.props.chatRooms.map((chat) => {
      return (<ChatListItem
      onChatSelect={this.props.onChatSelect}
      key={chat.uid}
      chat={chat} />);
    });
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    chatRooms: state.chatRooms
  }
}

export default connect(mapStateToProps)(ChatList);
