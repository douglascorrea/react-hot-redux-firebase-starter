import Styled from 'styled-components';

import {
  View,
  Text,
} from 'react-native';

export const Layout = Styled(View)`
  flex: 1;
  height: 100%;
  width: 100%;
  align-items: center;
`;

export const FormContainer = Styled(View)`
  width: 80%;
  height: 50%;
  margin-top: 10%;
  background-color: white;
`;

export const Footer = Styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
