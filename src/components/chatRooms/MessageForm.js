import React from 'react';
import TextInput from '../common/TextInput';
import {Component} from 'react/lib/ReactBaseClasses';
import {createMessage} from '../../actions/chatActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: {
        text: ''
      }
    };

    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
  }

  save(event) {
    event.preventDefault();
    this.props.actions.createMessage(this.state.message.text, this.props.chatKey);
    const message = {text: ''};
    this.setState({message});
  }

  isDisabled() {
    return !this.state.message.text.trim();
  }

  change(event) {
    const field = event.target.name;
    const value = event.target.value;
    const message = {[field]: value};
    return this.setState({message});
  }

  render() {
    return (
      <form>
        <TextInput
          name="text"
          label=""
          placeholder="type new message"
          value={this.state.message.text}
          onChange={this.change}
        />

        <input
          type="submit"
          disabled={this.isDisabled()}
          value="send"
          className="btn btn-secondary"
          onClick={this.save}/>
      </form>
    );
  }
}

MessageForm.propTypes = {
  chatKey: React.PropTypes.string.isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    activeChat: state.chat.activeChat
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({createMessage}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageForm);
