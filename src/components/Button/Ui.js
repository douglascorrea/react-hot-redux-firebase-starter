import Styled from 'styled-components';

import * as colors from '~/styles/colors';

import { TouchableOpacity } from 'react-native';

export const Button = Styled(TouchableOpacity)`
  border: 1px solid ${colors.borderDefault};
  border-radius: 10px;
  width: fit-content;
  padding: 10px;
`;
