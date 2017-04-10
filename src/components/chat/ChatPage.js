import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import toastr from 'toastr';
import checkAuth from '../requireAuth';
import {createRoom, watchRooms, leaveRoom} from '../../actions/roomActions';
import CreateRoomForm from './CreateRoomForm';
import RoomList from './RoomList';

export class ChatPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      room: {
        name: ""
      },
      saving: false
    };

    this.updateRoomState = this.updateRoomState.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  componentDidMount() {
    const {user} = this.props;

    // fetch and listen rooms
    this.props.actions.watchRooms();

    // handle feature leaving room
    if (user.currentRoom !== null) {
      this.props.actions.leaveRoom(
        {uid: user.uid, email: user.email},
        user.currentRoom
      );
    }
  }

  updateRoomState(event) {
    const field = event.target.name;
    let room = this.state.room;
    room[field] = event.target.value;
    return this.setState({room: room});
  }

  createRoom(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.createRoom(this.state.room)
      .then(() => {
        toastr.success('Room Created');
        this.setState({saving: false, room: {name: ""}});
      })
      .catch(error => {
        toastr.error(error.message);
        this.setState({saving: false, room: {name: ""}});
      });
  }

  render() {
    return (
      <div>
        <h1>Chat Page</h1>
        <RoomList
          rooms={this.props.rooms}
        />
        <CreateRoomForm
          onChange={this.updateRoomState}
          onSave={this.createRoom}
          saving={this.state.saving}
          room={this.state.room}
        />
      </div>
    );
  }
}

ChatPage.propTypes = {
  dispatch: PropTypes.func,
  actions: PropTypes.object.isRequired,
  rooms: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object.isRequired
};

ChatPage.contextTypes = {
};

const mapStateToProps = (state, ownProps) => {
  return {
    rooms: state.rooms,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({createRoom, leaveRoom, watchRooms}, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(checkAuth(ChatPage));
