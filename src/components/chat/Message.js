// Modules
import moment from 'moment';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import R from 'ramda';

// Component
export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };

    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
  }

  handleMouseEnter() {
    this.setState({ hovered: true });
  }

  handleMouseLeave() {
    this.setState({ hovered: false });
  }

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
        paddingTop: '5px',
        paddingBottom: '5px',
        paddingLeft: '10px',
        paddingRight: '10px',
        borderRadius: '10px',
        marginBottom: '10px'
      },
      additionalInformations: {
        marginLeft: '10px',
        marginRight: '10px'
      },
      from: {
        fontWeight: 'bold',
        marginBottom: '0px'
      },
      text: {
        marginBottom: '0px'
      }
    };
    const date = moment(this.props.date).format("MM/DD/YYYY  hh:mm A");

    return(
      <li style={styles.container}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
          {
            !fromCurrentUser ?
              (
                <div>
                  <div style={styles.message}>
                    <p style={styles.from}>{this.props.from}</p>
                    <p style={styles.text}>{this.props.text}</p>
                  </div>
                  {this.state.hovered ?
                    (
                    <span style={styles.additionalInformations}>
                      At {date}
                    </span>
                  ) : null
                  }

                </div>
              )
              : (
                <div>
                  {this.state.hovered ?
                    (
                      <span style={styles.additionalInformations}>
                        At {date}
                      </span>
                    ) : null
                  }
                  <p style={styles.message}>
                    {this.props.text}
                  </p>
                </div>
              )
          }
      </li>
    );
  }
}

// Properties validation
Message.propTypes = {
  text: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  date: PropTypes.string,
  currentUserEmail: PropTypes.string.isRequired
};

Message.defaultProps = {
  date: Date.now()
};
