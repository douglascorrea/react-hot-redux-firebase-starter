import React from 'react';
import TextInput from '../common/TextInput';
import {Component} from 'react/lib/ReactBaseClasses';
import ChatRoomApi from '../../api/chatRoom';

class ChatRoomForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatRoom: {
        name: ''
      }
    };

    this.save = this.save.bind(this);
    this.change = this.change.bind(this);
  }

  save(event) {
    event.preventDefault();
    ChatRoomApi.create(this.state.chatRoom);
    const chatRoom = {name: ''};
    this.setState({chatRoom});
  }

  isDisabled() {
    return !this.state.chatRoom.name.trim();
  }

  change(event) {
    const field = event.target.name;
    const chatRoom = {[field]: event.target.value};
    return this.setState({chatRoom});
  }

  render() {
    return (
      <form>
        <TextInput
          name="name"
          label="Create new chat"
          value={this.state.chatRoom.name}
          onChange={this.change}
        />

        <input
          type="submit"
          disabled={this.isDisabled()}
          value="Create"
          className="btn btn-secondary"
          onClick={this.save}/>
      </form>
    );
  }

}

export default ChatRoomForm;
