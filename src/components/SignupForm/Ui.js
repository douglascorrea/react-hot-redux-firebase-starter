import Styled from 'styled-components';


import { View } from 'react-native';

import * as colors from '~/styles/colors';

import Button from '~/components/Button';

export const Container = Styled(View)`
`;

export const Header = Styled(View)`
`;

export const Line = Styled(View)`
  margin-top: 4px;
  margin-bottom: 4px;
  border-bottom: 1px solid ${colors.borderDefault};
`;

export const Footer = Styled(View)`
  flex: 1;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const FormButton = Styled(Button)`
  padding: 10px 42px;
`;
