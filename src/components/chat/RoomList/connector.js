import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getRooms, getCurrentRoom } from '../../../selectors/chatxSelectors';
import { selectRoom, removeRoom } from '../../../actions/chatxActions';

const mapStateToProps = createStructuredSelector({
  rooms: getRooms,
  currentRoom: getCurrentRoom,
});

const mapDispatchToProps = {
  onRoomSelect: selectRoom,
  onRoomRemove: removeRoom,
};

export default connect(mapStateToProps, mapDispatchToProps);
