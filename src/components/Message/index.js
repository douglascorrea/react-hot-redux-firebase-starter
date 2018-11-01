import React from 'react';
import PropTypes from 'prop-types';

import * as Ui from './Ui';

const propTypes = {
  item: PropTypes.shape({
    data: PropTypes.string,
  }).isRequired,
};

const Message = (({ item }) =>
  <Ui.Container key={item.id}>
    <Ui.TextData>{item.data}</Ui.TextData>
  </Ui.Container>
);

Message.propTypes = propTypes;

export default Message;
