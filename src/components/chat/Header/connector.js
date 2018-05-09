import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getCurrentRoom,
  getCurrentRoomIsJoined,
} from '../../../selectors/chatxSelectors';
import { joinRoom, leaveRoom } from '../../../actions/chatxActions';

const mapStateToProps = createStructuredSelector({
  currentRoom: getCurrentRoom,
  currentRoomIsJoined: getCurrentRoomIsJoined,
});

const mapDispatchToProps = {
  onJoin: joinRoom,
  onLeave: leaveRoom,
};

export default connect(mapStateToProps, mapDispatchToProps);
