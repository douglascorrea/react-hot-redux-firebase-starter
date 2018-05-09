import { connect } from 'react-redux';

import { createRoom } from '../../../actions/chatxActions';

const mapDispatchToProps = {
  onCreate: createRoom,
};

export default connect(null, mapDispatchToProps);
