// Modules
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';

// Component
class Message extends Component {
  render() {
    const fromCurrentUser = (this.props.currentUserEmail === this.props.from);
    const styles = {
      container: {
        textAlign: fromCurrentUser ? 'right':'left'
      },
      message: {
        display: 'inline-block',
        backgroundColor: fromCurrentUser ? '#0084ff':'#f1f0f0',
        color: fromCurrentUser ? '#ffffff':'#000000',
        paddingTop: '5',
        paddingBottom: '5',
        paddingLeft: '10',
        paddingRight: '10',
        borderRadius: '10'
      }
    };

    return(
      <li style={styles.container}>
          <p style={styles.message}>{this.props.text} - {this.props.from}</p>
      </li>
    );
  }
}

// Properties validation
Message.PropTypes = {
  text: PropTypes.string.isRequired,
  from: PropTypes.string
};

Message.defaultProps = {
  name: 'Unknown'
};

// Connect component to store
function mapStateToProps(state, ownProps) {
  return {
    currentUserEmail: R.propOr('Unknown', 'email', state.user)
  };
}

export default connect(mapStateToProps)(Message);
