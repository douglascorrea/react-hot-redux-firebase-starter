import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {initRoom, sendMessage} from '../../actions/roomActions';
import MessageInput from './MessageInput';
import MessageContainer from './MessageContainer';
import toastr from 'toastr';

export class RoomPage extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            room : {
                messageContainer : [],
                message : {
                    messageUID : "",
                    text: "",
                    userUID: "",
                    userEmail: ""
                },
                saving: false
            }
        };

        //- Func in constructor to update state value in message input
        this.updateMessageInputState = this.updateMessageInputState.bind(this);
        //- Func in constructor to create message in input to send it
        this.createMessage = this.createMessage.bind(this);

    }

    componentWillMount() {

        this.props.actions.initRoom()
                .then(_ => {
                    return this.setState({
                        room : {
                            message : {
                                text : ""
                            },
                            messageContainer : this.props.room.messageContainer,
                            saving : false
                        }
                    });
                });

    }

    componentWillReceiveProps(nextProps) {
        console.log('Hello');
        this.setState({
            room : {
                message : {
                    text : nextProps.room.message.text
                }
            }
        });
    }

    //- Update value input message
    updateMessageInputState(event) {
        const field = event.target.name;
        let message = this.state.room.message;
        message[field] = event.target.value;
        return this.setState({
            room : {
                message : {
                    text : message.text,
                    userUID : this.props.room.message.userUID,
                    userEmail : this.props.room.message.userEmail
                },
                messageContainer : this.props.room.messageContainer
            }
        });
    }

    //- Create message in input to send it
    createMessage(event) {

      event.preventDefault();
      this.setState({ room : { saving: true }});

      this.props.actions.sendMessage(this.state.room.message, this.state.room.messageContainer)
        .then(_ => {
            console.log(this.props);
            this.componentWillMount();
            toastr.success('Your message are send');
        })
        .catch(error => {
          toastr.error(error.message);
          this.setState({ room : { saving: false }});
        });
    }

    render() {
        return (
            <div className="col-xs-offset-2 col-xs-8">
                <MessageContainer
                    messageContainer={this.props.room.messageContainer}
                />
                <MessageInput
                    onChange={this.updateMessageInputState}
                    onSave={this.createMessage}
                    saving={this.state.room.saving}
                    text={this.props.room.message.text}
                />
            </div>
        );
    }
}

RoomPage.propTypes = {
  actions : PropTypes.object.isRequired,
  room : PropTypes.object,
  message : PropTypes.object,
  text : PropTypes.string,
  userUID : PropTypes.string,
  userEmail : PropTypes.string,
  messageContainer : PropTypes.array
};

RoomPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
      authentificated : state.auth.isLogged,
      room : {
          messageContainer : state.room.messageContainer,
          message : {
              text : state.room.message.text,
              userUID : state.user.currentUserUID,
              userEmail : state.user.currentUserEmail
          }
      }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({sendMessage, initRoom}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomPage);
