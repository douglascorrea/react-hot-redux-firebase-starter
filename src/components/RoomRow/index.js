import React from 'react';
import PropTypes from 'prop-types';

import * as Ui from './Ui';

export default class RoomRow extends React.PureComponent {
  static propTypes = {
    onPressRoom: PropTypes.func,
  }

  static defaultProps = {
    onPressRoom: item => item,
  }

  onPressRoom = () => this.props.onPressRoom(this.props.item);

  render() {
    const { item, current } = this.props;
    return (
        <Ui.Container
          onPress={this.onPressRoom}
          backgroundColor={item.backgroundColor}
        >
          <Ui.Name>{item.name}</Ui.Name>
        </Ui.Container>
    );
  }
}
