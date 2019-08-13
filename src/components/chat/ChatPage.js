import React from "react";
import checkAuth from "../requireAuth";
import { browserHistory } from "react-router";
import { bindActionCreators } from "redux";
import {
  watchRoom,
  unwatchRoom,
  enterRoom,
  leaveRoom,
  sendMessage
} from "../../actions/chatActions";
import { connect } from "react-redux";
import TextInput from "../common/TextInput";

class ChatPage extends React.Component {
  constructor() {
    super();

    this.state = { message: "" };
    this.updateMessage = this.updateMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  async componentDidMount() {
    this.props.actions.watchRoom(this.props.routeParams.room);
    await this.props.actions.enterRoom(
      this.props.email,
      this.props.routeParams.room
    );
  }

  async componentWillUnmount() {
    await this.props.actions.leaveRoom(
      this.props.email,
      this.props.routeParams.room
    );
    this.props.actions.unwatchRoom(this.props.routeParams.room);
  }

  updateMessage(event) {
    this.setState({ message: event.target.value });
  }

  async sendMessage(event) {
    // Avoid redirection
    event.preventDefault();
    await this.props.actions.sendMessage(
      this.props.email,
      this.state.message,
      this.props.routeParams.room
    );
    this.setState({ message: "" });
  }

  render() {
    const name = this.props.routeParams.room;
    const { users, messages } = this.props.rooms[name];
    return (
      <div>
        <div>
          <h1>{name}</h1>
          <p>
            Users:{" "}
            {users.map((user, index) => (
              <span key={index}>
                {index ? " | " : ""}
                {user}
              </span>
            ))}
          </p>
          {messages.map((message, index) => (
            <p key={index}>
              <span>
                <strong>{message.author}</strong>
                {": "}
                {message.content}
              </span>
            </p>
          ))}
          <form onSubmit={this.sendMessage}>
            <TextInput
              name="chatRoom"
              label="Type a message :"
              onChange={this.updateMessage}
              value={this.state.message}
            />
            <button
              type="submit"
              disabled={!this.state.message}
              className="btn btn-primary"
            >
              Send
            </button>
          </form>
        </div>
        <button className="btn btn-primary" onClick={browserHistory.goBack}>
          Go Back
        </button>
      </div>
    );
  }
}

ChatPage.propTypes = {
  email: React.PropTypes.string.isRequired,
  rooms: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired
};

const mapStateToProps = ({ user, chat }) => ({
  email: user.email,
  rooms: chat.rooms
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    { watchRoom, unwatchRoom, enterRoom, leaveRoom, sendMessage },
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(checkAuth(ChatPage));
