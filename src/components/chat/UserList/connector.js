import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getCurrentRoomUsers, getCurrentRoomName } from '../../../selectors/chatxSelectors';

const mapStateToProps = createStructuredSelector({
  users: getCurrentRoomUsers,
  currentRoomName: getCurrentRoomName,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps);
