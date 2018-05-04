import React, { PropTypes } from 'react';

class ChatHeader extends React.Component {
  static propTypes = {
    currentRoom: PropTypes.shape({
      name: PropTypes.string,
    }).isRequired,
  }

  renderRoomName() {
    const { currentRoom } = this.props;
    return (
      <div className="chatx-header">
        <h2 className="chatx-title">ChatX on #{currentRoom.name}</h2>
        <button type="button" className="btn btn-xs btn-danger">
          Leave room
        </button>
      </div>
    );
  }

  renderNoRoom() {
    return (
      <div className="chatx-header">
        <h2 className="chatx-title">ChatX</h2>
        (no room selected)
      </div>
    );
  }

  render() {
    const { currentRoom } = this.props;
    return currentRoom.name ? this.renderRoomName() : this.renderNoRoom();
  }
}

export default ChatHeader;
