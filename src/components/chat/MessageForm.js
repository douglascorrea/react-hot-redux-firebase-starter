import React, { PropTypes } from 'react';
import prop from 'lodash/fp/prop';

import TextInput from '../common/TextInput';

const MessageForm = ({ message, onClick, onChange, loading }) =>
  <form>
    <TextInput
      name="value"
      label="New message"
      onChange={onChange}
      value={prop('value')(message)}
    />
    <input
      type="submit"
      value={loading ? 'Sending ...' : 'Send'}
      className="btn btn-primary"
      onClick={onClick}
    />
  </form>;

MessageForm.defaultProps = {
  message: {},
  onClick: () => {},
  onChange: () => {},
  loading: false,
};

MessageForm.propTypes = {
  message: PropTypes.object,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default MessageForm;
