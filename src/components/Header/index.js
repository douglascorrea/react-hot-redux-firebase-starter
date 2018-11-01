import React from 'react';

import H1 from '~/components/H1';

import * as Ui from './Ui';

export default React.memo(() => (
  <Ui.Header>
    <H1>ChatX</H1>
  </Ui.Header>
));
