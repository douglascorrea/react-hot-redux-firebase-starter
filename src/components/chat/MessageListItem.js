import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const MessageListItem = ({value, from = {}, currentUser}) => {
  let msgClassName = "message-left";
  let fromLabel = from.email;

  if (currentUser.email === from.email) {
    msgClassName = "message-right";
    fromLabel = null;
  }

  return (
    <div className="message-wrapper">
      <div className={'message ' + msgClassName}>
        <div className="message-value">{value}</div>
        <div className="from-label">{fromLabel}</div>
      </div>
    </div>
  );
};

MessageListItem.propTypes = {
  value: PropTypes.string.isRequired,
  from: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

export default MessageListItem;
