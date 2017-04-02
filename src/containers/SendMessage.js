import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chatActions';
import TextInput from '../components/common/TextInput';

// TODO: add user content after dispatch
let SendMessage = ({ dispatch }) => {
  let input;
  const setRef = node => {input = node;};
  const onSubmit = event => {
    event.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    dispatch(sendMessage({
      // TODO: add user content
      message: input.value
    }));
    input.value = '';
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input 
          ref={setRef} 
          className="form-control"
        />
        <br />
        <input 
          type="submit"
          className="btn btn-primary"
          value="Send message"
        />
      </form>
    </div>
  );
};

SendMessage.propTypes = {
  dispatch: React.PropTypes.func.isRequired
};

SendMessage = connect()(SendMessage);

export default SendMessage;
