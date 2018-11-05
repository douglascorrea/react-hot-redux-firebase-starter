import Styled from 'styled-components';

import {
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import * as colors from '~/styles/colors';

import Button from '~/components/Button';

export const Container = Styled(View)`
  height: 42px;
  width: 100%;
  flex-direction: row;
  border-bottom: 1px solid ${colors.borderDefault};
`;

export const TextInputStyled = Styled(TextInput)`
  width: 100%;
  padding: 10px;
`;

export const SendButton = Styled(TouchableOpacity)`
  border-left: 1px solid ${colors.borderDefault};
  border-right: 1px solid ${colors.borderDefault};
  width: fit-content;
  padding: 10px;
  border-radius: 0px;
  border-bottom: 0px;
`;
