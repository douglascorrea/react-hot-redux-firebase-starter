import React, {Component} from 'react';
import checkAuth from '../requireAuth';
import ChatRoomApi from '../../api/chatRoom';
import ChatRoom from './ChatRoom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addChatFromData, modifyChatFromData} from '../../actions/chatActions';
import ChatRoomsMenu from './ChatRoomsMenu';

class ChatRooms extends Component {
  constructor(props) {
    super(props);
    this.onChatRoomAddition = this.onChatRoomAddition.bind(this);
    this.onChatRoomChanged = this.onChatRoomChanged.bind(this);
    ChatRoomApi.getRef().on('child_added', this.onChatRoomAddition);
    ChatRoomApi.getRef().on('child_changed', this.onChatRoomChanged);
  }

  componentWillUnmount() {
    ChatRoomApi.getRef().off('child_added', this.onChatRoomAddition);
    ChatRoomApi.getRef().off('child_changed', this.onChatRoomChanged);
  }

  onChatRoomAddition(data) {
    this.props.actions.addChatFromData(data);
  }

  onChatRoomChanged(data) {
    this.props.actions.modifyChatFromData(data);
  }

  render() {
    return (
      <div>
        <h1> Chat Rooms </h1>
        <p> Welcome to the Chat Rooms ! </p>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ChatRoomsMenu/>
            </div>
            <div className="col-md-8">
              {!this.props.activeChat &&
              <h3> Please select, join or create a chat </h3>
              }
              {this.props.activeChat &&
              <ChatRoom />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ChatRooms.propTypes = {
  activeChat: React.PropTypes.object,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    activeChat: state.chat.activeChat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({addChatFromData, modifyChatFromData}, dispatch)
  };
}

export default checkAuth(connect(mapStateToProps, mapDispatchToProps)(ChatRooms));
