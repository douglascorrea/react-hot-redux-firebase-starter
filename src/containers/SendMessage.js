import React from 'react';
import { connect } from 'react-redux';
import { sendMessage } from '../actions/chatActions';
import TextInput from '../components/common/TextInput';

let SendMessage = ({ dispatch, user }) => {
  let input;
  const setRef = node => {input = node;};
  const onSubmit = event => {
    event.preventDefault();
    if (!input.value.trim()) {
      return;
    }
    dispatch(sendMessage({
      message: input.value,
      nick: user.email.split('@')[0]
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

// TODO: mapStateToProps
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

SendMessage.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  user: React.PropTypes.object.isRequired
};

// TODO: update connect
SendMessage = connect(mapStateToProps, null)(SendMessage);
// SendMessage = connect()(SendMessage);

export default SendMessage;
