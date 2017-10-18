import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

export default class Messages extends Component {
  render() {
    return(
      <div className="col-md-9">
        <ul>
          {this.props.messages.map(message => <Message text={message.message}/>)}
        </ul>
      </div>
    );
  }
}

Messages.PropTypes = {
  messages: PropTypes.array
};

Messages.defaultProps = {
  messages: []
};
