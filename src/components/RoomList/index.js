import React from 'react';

import RoomRow from '~/components/RoomRow';

import * as Ui from './Ui';

export default class RoomList extends React.PureComponent {

  state = {};

  keyExtractor = item => item.id

  renderItem = ({ item }) => (
    <RoomRow
      item={item}
      onPressRoom={this.props.onPressRoom}
    />
  );

  render() {
    const { list } = this.props;
    return (
        <Ui.Container
          data={list}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
    );
  }
}
