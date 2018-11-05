import Styled from 'styled-components';
import { TouchableOpacity } from 'react-native';

import * as colors from '~/styles/colors';

import P from '~/components/P';

export const Container = Styled(TouchableOpacity)`
  padding: 10px;
  border-bottom: 1px solid ${colors.borderDefault};
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

export const Name = Styled(P)`
`;
