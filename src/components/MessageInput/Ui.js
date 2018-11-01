import Styled from 'styled-components';

import {
  View,
  TextInput,
} from 'react-native';

import Button from '~/components/Button';

export const Container = Styled(View)`
  height: 42px;
  width: 100%;
  flex-direction: row;
`;

export const TextInputStyled = Styled(TextInput)`
  width: 100%;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const SendButton = Styled(Button)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0px;
  border-bottom: 0px;
`;
