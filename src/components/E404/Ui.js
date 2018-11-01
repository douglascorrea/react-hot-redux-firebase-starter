import Styled from 'styled-components';

import {
  View,
  Text,
} from 'react-native';

export const Container = Styled(View)`
  flex: 1;
  width: 100%;
  height: 100%;
  margin-top: 10%;
  align-items: center;
`;

export const ErrorText = Styled(Text)`
  color: red;
  font-size: 16px;
  font-weight: bold;
`;
