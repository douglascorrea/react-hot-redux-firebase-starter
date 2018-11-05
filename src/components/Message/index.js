import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import * as Ui from './Ui';

const propTypes = {
  item: PropTypes.shape({
    data: PropTypes.string,
  }).isRequired,
};

const Message = (({ item }) =>
  <Ui.Container key={item.id}>
    <Ui.TextData>
      [{moment(item.date).format('HH:mm')}] {item.user ?
        item.user.displayName
        : ''
      } :
    </Ui.TextData>
    <Ui.TextData>{item.data}</Ui.TextData>
  </Ui.Container>
);

Message.propTypes = propTypes;

export default Message;
