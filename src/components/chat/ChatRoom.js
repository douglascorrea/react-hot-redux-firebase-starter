import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import checkAuth from '../requireAuth';
import {
  launchPushMessages,
  requestMessages,
} from '../../actions/messagesActions';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import { getUser } from '../../reducers/userReducer';
import { getLoading } from '../../reducers/loadingReducer';
import { getMessages } from '../../reducers/messagesReducer';
import { isLogged } from '../../reducers/authReducer';

class ChatRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: { value: '' },
    };
  }

  componentWillMount() {
    const { requestMessages, isLogged } = this.props;
    if (isLogged) {
      requestMessages();
    }
  }

  componentWillReceiveProps({ loading }) {
    const { loading: previousLoading } = this.props;
    if (previousLoading !== loading && !loading) {
      this.setState({ message: { value: '' } });
    }
  }

  updateMessage = e => {
    const { message } = this.state;
    const { name, value } = e.target;
    this.setState({ message: { ...message, [name]: value } });
  };

  sendNewMessage = e => {
    e.preventDefault();

    const { user: { uid, email }, launchPushMessages } = this.props;
    const { message: { value } } = this.state;

    const message = {
      value,
      from: {
        uid,
        email,
      },
    };

    launchPushMessages(message);
  };

  render() {
    const { loading, messages, user } = this.props;
    const { message } = this.state;

    return (
      <div>
        <h3>Chat</h3>
        <MessageList messages={messages} currentUser={user} />
        <MessageForm
          onChange={this.updateMessage}
          onClick={this.sendNewMessage}
          saving={loading}
          message={message}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: getUser,
  messages: getMessages,
  loading: getLoading,
  isLogged,
});

const mapDispatchToProps = {
  launchPushMessages,
  requestMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(
  checkAuth(ChatRoom)
);
