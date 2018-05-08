import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getCurrentMessages } from '../../../selectors/chatxSelectors';

const mapStateToProps = createStructuredSelector({
  currentMessages: getCurrentMessages,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps);
