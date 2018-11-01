import Styled from 'styled-components';

import { View } from 'react-native';

import * as colors from '~/styles/colors';

import Button from '~/components/Button';
import P from '~/components/P';

export const Header = Styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid ${colors.borderDefault};
`;

export const LogoutButton = Styled(Button)`
  height: 42px;
  border: 0px;
`;

export const LogoutText = Styled(P)`
  color: rgba(0, 0, 0, 0.42);
`;
