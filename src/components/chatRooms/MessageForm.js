import React from 'react';
import TextInput from '../common/TextInput';
import {Component} from 'react/lib/ReactBaseClasses';
import MessageApi from '../../api/message';

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
    MessageApi.create(this.state.message.text, this.props.chatKey);
    const message = this.state.message;
    message.text = '';
    this.setState({message});
  }

  isDisabled() {
    return !this.state.message.text.trim();
  }

  change(event) {
    const field = event.target.name;
    let message = this.state.message;
    message[field] = event.target.value;
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
  chatKey: React.PropTypes.string.isRequired
};

export default MessageForm;
