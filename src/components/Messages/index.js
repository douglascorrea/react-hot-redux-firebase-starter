import React from 'react';
import PropTypes from 'prop-types';

import Message from '~/components/Message';

import * as Ui from './Ui';

export default class Messages extends React.PureComponent {

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.date,
      data: PropTypes.string,
      ownerId: PropTypes.string,
    })),
  }

  static defaultProps = {
    list: [],
  }

  render() {
    return (
      <Ui.Container
        inverted
        renderItem={Message}
        className="scroll-bar"
        data={this.props.list}
        showsVerticalScrollIndicator
      />
    );
  }
}
