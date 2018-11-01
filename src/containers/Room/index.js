import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuid from 'uuid/v4';

import firebaseApi from '~/api/firebase';

import { onLoadMessage } from '~/actions/messageActions';

import Messages from '~/components/Messages';
import MessageInput from '~/components/MessageInput';

import requireAuth from '~/components/requireAuth';

import * as Ui from './Ui';

class Room extends React.PureComponent {
  static propTypes = {
    currentUserUID: PropTypes.string.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      list: [],
    };
    this.messages = firebaseApi.GetDataBaseChild(undefined, 'messages');
    this.listenMessages();
  }

  sendMessage = (message, callback = () => 0) => {
    if (!message.data.length) return callback();
    message.id = uuid();
    message.userId = this.props.currentUserUID;
    this.messages.push(message);
    return callback();
  }

  listenMessages() {
    this.messages
      .limitToLast(10)
      .on('value', (data) => {
        const value = data.val();
        if (value) {
          this.props.onLoadMessage(Object.values(value));
        }
      });
  }

  render() {
    return (
      <Ui.Container>
        <Messages
          list={this.props.room.messages}
        />
        <MessageInput
          onSend={this.sendMessage}
        />
      </Ui.Container>
    );
  }
}

export default requireAuth(connect((state) => ({
  user: state.user,
  room: state.room,
  currentUserUID: state.auth.currentUserUID,
}), (dispatch) => ({
  onLoadMessage: bindActionCreators(onLoadMessage, dispatch),
}))(Room));
