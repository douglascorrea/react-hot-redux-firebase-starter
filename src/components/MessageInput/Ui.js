import Styled from 'styled-components';

import * as colors from '~/styles/colors';

import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export const Container = Styled(View)`
  height: 42px;
  width: 100%;
  flex-direction: row;
  border-top: 1px solid ${colors.borderDefault};
`;

export const TextInputStyled = Styled(TextInput)`
  width: 100%;
  padding: 10px;
`;

export const SendButton = Styled(TouchableOpacity)`
  border-left: 1px solid ${colors.borderDefault};
  width: fit-content;
  padding: 10px;
`;
