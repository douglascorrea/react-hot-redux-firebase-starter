import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import * as Ui from './Ui';

const propTypes = {
  item: PropTypes.shape({
    data: PropTypes.string,
  }).isRequired,
};

const User = (({ item }) =>
  <Ui.Container key={item.id}>
    <Ui.DisplayName>{item.displayName}</Ui.DisplayName>
  </Ui.Container>
);

User.propTypes = propTypes;

export default User;
