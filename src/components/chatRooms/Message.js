import React from 'react';
import * as firebase from 'firebase/firebase-browser';
import classnames from 'classnames';

const Message = ({message}) => {
  const isOfCurrentUser = message.user.uid === firebase.auth().currentUser.uid;
  const classes =  classnames('app-message', {
    'bg-primary blockquote-reverse own-message': isOfCurrentUser,
    'bg-info': !isOfCurrentUser
  });

  const dateString = (new Date(message.timestamp)).toLocaleString();
  return (
    <blockquote className={classes}>
      <p> {message.text} </p>
      <footer>
        on {dateString}
        {message.user.uid !== firebase.auth().currentUser.uid &&
        <span> by <cite> {message.user.displayName} </cite></span>
        }
      </footer>
    </blockquote>
  );
};

Message.propTypes = {
  message: React.PropTypes.object.isRequired
};

export default Message;
