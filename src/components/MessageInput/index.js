import React from 'react';
import PropTypes from 'prop-types';

import P from '~/components/P';

import * as Ui from './Ui';

export default class MessageInput extends React.PureComponent {
  static propTypes = {
    onSend: PropTypes.func,
  }

  static defaultProps = {
    onSend: () => 0,
  }

  state = {
    message: {
      data: '',
    },
  }

  textInputRef = React.createRef();

  onChange = (data) => {
    this.setState({
      message: { data },
    });
  }

  clearTextInput = () => {
    this.setState({
      message: { data: '' },
    }, this.focus);
  }

  focus = () =>
    this.textInputRef.current.focus();

  onSend = () =>
    this.props.onSend(this.state.message, this.clearTextInput);

  render() {
    return (
      <Ui.Container>
        <Ui.TextInputStyled
          autoFocus
          ref={this.textInputRef}
          onChangeText={this.onChange}
          value={this.state.message.data}
          onSubmitEditing={this.onSend}
          placeholder="Enter your message"
        />
        <Ui.SendButton
          onPress={this.onSend}
        >
          <P>Send</P>
        </Ui.SendButton>
      </Ui.Container>
    );
  }
}
