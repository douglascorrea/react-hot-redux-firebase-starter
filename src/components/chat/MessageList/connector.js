import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { removeMessage } from '../../../actions/chatxActions';
import { getCurrentMessages, getCurrentRoomIsOwned } from '../../../selectors/chatxSelectors';
import { getCurrentUserUID } from '../../../selectors/authSelectors';
import { getUserIsAdmin } from '../../../selectors/userSelectors';

const mapStateToProps = createStructuredSelector({
  userIsAdmin: getUserIsAdmin,
  currentRoomIsOwned: getCurrentRoomIsOwned,
  currentUserId: getCurrentUserUID,
  currentMessages: getCurrentMessages,
});

const mapDispatchToProps = { removeMessage };

export default connect(mapStateToProps, mapDispatchToProps);
