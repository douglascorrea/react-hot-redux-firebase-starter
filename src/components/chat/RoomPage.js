import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import checkAuth from '../requireAuth';
import {watchCurrentRoom, joinRoom} from '../../actions/roomActions';
import {postMessage, watchMessages} from '../../actions/messageActions';
import CreateMessageForm from './CreateMessageForm';
import MessageList from './MessageList';
import UserList from './UserList';

export class RoomPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: {
        value: ""
      },
      saving: false
    };

    this.updateMessageState = this.updateMessageState.bind(this);
    this.createMessage = this.createMessage.bind(this);
  }

  componentDidMount() {
    const {user} = this.props;

    this.props.actions.watchMessages(this.props.params.roomId);
    this.props.actions.watchCurrentRoom(this.props.params.roomId);

    if (user && user.uid && user.email){
      this.props.actions.joinRoom(
        {uid: user.uid, email: user.email},
        this.props.params.roomId
      );
    }
  }

  updateMessageState(event) {
    const field = event.target.name;
    let message = this.state.message;
    message[field] = event.target.value;
    return this.setState({message: message});
  }

  createMessage(event){
    event.preventDefault();

    const {user} = this.props;

    this.setState({saving: true});

    const message = {
      value: this.state.message.value,
      from: {
        uid: user.uid,
        email: user.email
      }
    };

    this.props.actions.postMessage(message, this.props.params.roomId)
      .then(() => {
        toastr.success('Message Posted');
        this.setState({saving: false, message: {value: ""}});
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false, message: {value: ""}});
      });
  }

  render() {
    return (
      <div>
        <h1>Room: {this.props.currentRoom.name}</h1>
        <UserList
          users={this.props.currentRoom.users || []}
        />
        <MessageList
          messages={this.props.messages}
          currentUser={this.props.user}
        />
        <CreateMessageForm
          onChange={this.updateMessageState}
          onSave={this.createMessage}
          saving={this.state.saving}
          message={this.state.message}
        />
      </div>
    );
  }
}

RoomPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentRoom: PropTypes.object.isRequired
};

RoomPage.contextTypes = {
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    messages: state.messages,
    currentRoom: state.currentRoom
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({postMessage, watchMessages, watchCurrentRoom, joinRoom}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(RoomPage));
