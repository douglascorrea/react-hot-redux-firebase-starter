import React from "react";
import { Link } from "react-router";
import checkAuth from "../requireAuth";
import TextInput from "../common/TextInput";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  watchRooms,
  unwatchRooms,
  createRoom
} from "../../actions/chatActions";

class RoomsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      chatRoomName: ""
    };

    this.updateChatRoomName = this.updateChatRoomName.bind(this);
    this.createChatRoom = this.createChatRoom.bind(this);
  }

  componentDidMount() {
    this.props.actions.watchRooms();
  }

  componentWillUnmount() {
    this.props.actions.unwatchRooms();
  }

  updateChatRoomName(event) {
    this.setState({ chatRoomName: event.target.value });
  }

  createChatRoom(event) {
    // Avoid redirection
    event.preventDefault();
    this.props.actions.createRoom(this.state.chatRoomName.trim());
    // Reset the text input
    this.setState({ chatRoomName: "" });
  }

  render() {
    return (
      <div>
        <h1>List of available chat rooms</h1>
        <ul>
          {Object.keys(this.props.rooms).map((name, index) => (
            <li key={index}>
              <Link to={`${this.props.route.path}/${name}`}>{name}</Link>
            </li>
          ))}
        </ul>
        <form onSubmit={this.createChatRoom}>
          <TextInput
            name="chatRoom"
            label="Add a chat room"
            onChange={this.updateChatRoomName}
            value={this.state.chatRoomName}
          />
          <button
            type="submit"
            disabled={!this.state.chatRoomName}
            className="btn btn-primary"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

RoomsPage.propTypes = {
  rooms: React.PropTypes.object.isRequired,
  route: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

const mapStateToProps = ({ chat }) => ({
  rooms: chat.rooms
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { watchRooms, unwatchRooms, createRoom },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkAuth(RoomsPage));
