/**
 * Created by clementlucas on 07/03/2017.
 */
import React from 'react';
import {Form, FormGroup, FormControl, InputGroup, Button} from 'react-bootstrap';

const MessageForm = ({message, onChange, onSubmit}) => {
  // Prevent the user to send empty message
  const sendButtonDisabled = (/^\s*$/).test(message);

  return (
    <Form inline>
      <FormGroup>
        <InputGroup>
          <InputGroup.Addon>Message :</InputGroup.Addon>
          <FormControl value={message} onChange={onChange} type="text" />
        </InputGroup>
      </FormGroup>
      {' '}
      <Button type="submit" disabled={sendButtonDisabled} onClick={onSubmit}>
        Send
      </Button>
    </Form>
  )
};

MessageForm.propTypes = {
  message: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func.isRequired,
};

export default MessageForm;
