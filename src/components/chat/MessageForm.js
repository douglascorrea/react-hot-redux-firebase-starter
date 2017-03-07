/**
 * Created by clementlucas on 07/03/2017.
 */
import React from 'react';
import {Button, Input} from 'react-materialize';

const MessageForm = ({message, onChange, onSubmit}) => {
  // Prevent the user to send empty message
  const sendButtonDisabled = (/^\s*$/).test(message);

  return (
    <form id="message-container">
      <Input
        className="message-input"
        type="text"
        s={12}
        value={message}
        onChange={onChange}
        placeholder="Message..."/>
      <Button
        waves='light'
        type="submit"
        disabled={sendButtonDisabled}
        onClick={onSubmit}
        className="message-send-button">
        Send
      </Button>
    </form>
  )
};

MessageForm.propTypes = {
  message: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default MessageForm;
