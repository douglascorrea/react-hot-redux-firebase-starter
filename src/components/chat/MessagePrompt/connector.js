import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  getCurrentRoomUserMessage,
  getCurrentRoomName,
  getCurrentRoomIsJoined,
  getCurrentRoomId,
} from '../../../selectors/chatxSelectors';

import { changedUserMessage, sendMessage } from '../../../actions/chatxActions';

const mapStateToProps = createStructuredSelector({
  message: getCurrentRoomUserMessage,
  currentRoomId: getCurrentRoomId,
  currentRoomName: getCurrentRoomName,
  currentRoomIsJoined: getCurrentRoomIsJoined,
});

const mapDispatchToProps = {
  changedUserMessage,
  sendMessage,
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const props = { ...stateProps, ...dispatchProps, ...ownProps };
  const roomId = props.currentRoomId;
  return {
    ...props,
    onMessageChange: userMessage => (
      dispatchProps.changedUserMessage({ room: roomId, userMessage })
    ),
    onMessageSubmit: message => (
      dispatchProps.sendMessage({ room: roomId, message })
    ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
