import Styled from 'styled-components';

import * as colors from '~/styles/colors';

import { View } from 'react-native';

export const Header = Styled(View)`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid ${colors.borderDefault};
`;
