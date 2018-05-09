import React, { PropTypes } from 'react';
import { assoc } from 'ramda';

import connector from './connector';

export class RoomCreator extends React.Component {
  static propTypes = {
    onCreate: PropTypes.func.isRequired,
  }

  state = { roomName: '' }

  onChange = (e) => {
    this.setState(assoc('roomName', e.target.value));
  }

  onSubmitForm = (e) => {
    e.preventDefault();
    const roomName = this.state.roomName.trim().toLowerCase();
    if (roomName) {
      this.setState(assoc('roomName', ''));
      this.props.onCreate(roomName);
    }
  }

  render() {
    return (
      <span>
        <h4>Create a room</h4>
        <form onSubmit={this.onSubmitForm}>
          <input
            type="text"
            onChange={this.onChange}
            className="form-control"
            placeholder="Room name"
            value={this.state.roomName}
          />
        </form>
      </span>
    );
  }
}

export default connector(RoomCreator);
