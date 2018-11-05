import React from 'react';
import PropTypes from 'prop-types';

import P from '~/components/P';

import * as Ui from './Ui';

export default class RoomInput extends React.PureComponent {
  static propTypes = {
    onCreate: PropTypes.func,
  }

  static defaultProps = {
    onCreate: () => 0,
  }

  state = {
    room: {
      name: '',
    },
  }

  textInputRef = React.createRef();

  onChange = (name) => {
    this.setState({
      room: { name },
    });
  }

  clearTextInput = () => {
    this.setState({
      room: { name: '' },
    }, this.focus);
  }

  focus = () =>
    this.textInputRef.current.focus();

  onCreate = () =>
    this.props.onCreate(this.state.room, this.clearTextInput);

  render() {
    return (
      <Ui.Container>
        <Ui.TextInputStyled
          ref={this.textInputRef}
          onChangeText={this.onChange}
          value={this.state.room.name}
          onSubmitEditing={this.onCreate}
          placeholder="Choice a room name"
        />
        <Ui.SendButton
          onPress={this.onCreate}
        >
          <P>Create</P>
        </Ui.SendButton>
      </Ui.Container>
    );
  }
}
