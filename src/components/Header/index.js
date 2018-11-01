import React from 'react';

import H1 from '~/components/H1';
import P from '~/components/P';

import * as Ui from './Ui';

export default React.memo(({ signOut, showSignOut }) => (
  <Ui.Header>
    <H1>
      ChatX
    </H1>
    {
      showSignOut ?
        <Ui.LogoutButton
          onPress={signOut}
        >
          <Ui.LogoutText>
            SignOut
          </Ui.LogoutText>
        </Ui.LogoutButton>
      : null
    }
  </Ui.Header>
));
