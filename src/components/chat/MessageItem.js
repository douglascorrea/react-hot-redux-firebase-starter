import React, { PropTypes } from 'react';
import prop from 'lodash/fp/prop';

const MessageItem = ({ value, from }) => {
  return (
    <div className="message-wrapper them">
      <div className="circle-wrapper animated bounceIn">
        {prop('email')(from)}
      </div>
      <div className="text-wrapper animated fadeIn">
        {value}
      </div>
    </div>
  );
};

MessageItem.defaultProps = {
  value: '',
  from: {},
};

MessageItem.propTypes = {
  value: PropTypes.string,
  from: PropTypes.object,
};

export default MessageItem;
