import React, { PropTypes } from 'react';

import connector from './connector';

export class Header extends React.Component {
  static propTypes = {
    onJoin: PropTypes.func.isRequired,
    onLeave: PropTypes.func.isRequired,
    currentRoom: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    }).isRequired,
    currentRoomIsJoined: PropTypes.bool.isRequired,
  }

  renderLeaveButton() {
    const { onLeave, currentRoom } = this.props;
    return (
      <button
        type="button"
        className="btn btn-xs btn-danger"
        onClick={() => onLeave(currentRoom.id)}
      >
        Leave room
      </button>
    );
  }

  renderJoinButton() {
    const { onJoin, currentRoom } = this.props;
    return (
      <button
        type="button"
        className="btn btn-xs btn-primary"
        onClick={() => onJoin(currentRoom.id)}
      >
        Join room
      </button>
    );
  }

  renderRoom() {
    const { currentRoom, currentRoomIsJoined } = this.props;
    return (
      <div className="chatx-header">
        <h2 className="chatx-title">ChatX on #{currentRoom.name}</h2>
        {currentRoomIsJoined ? this.renderLeaveButton() : this.renderJoinButton()}
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
    return currentRoom.name ? this.renderRoom() : this.renderNoRoom();
  }
}

export default connector(Header);
