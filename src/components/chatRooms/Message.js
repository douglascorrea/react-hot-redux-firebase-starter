import React from 'react';
import * as firebase from 'firebase/firebase-browser';

const Message = ({message}) => {
  const classes = ['app-message'];
  if(message.user.uid === firebase.auth().currentUser.uid) {
    classes.push('bg-primary', 'blockquote-reverse', 'own-message');
  } else {
    classes.push('bg-info');
  }
  const dateString = (new Date(message.timestamp)).toLocaleString();
  return (
    <blockquote className={classes.join(' ')}>
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
