import React from 'react';

import UserRow from '~/components/UserRow';

import * as Ui from './Ui';

export default class UserList extends React.PureComponent {

  keyExtractor = item => item.uid

  render() {
    const { list } = this.props;
    return (
        <Ui.Container
          data={list}
          renderItem={UserRow}
          keyExtractor={this.keyExtractor}
        />
    );
  }
}
