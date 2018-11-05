import Styled from 'styled-components';

import {
  View,
} from 'react-native';

import P from '~/components/P';

export const Container = Styled(View)`
  background-color: #f1f0f0;
  border-radius: 1.3em;
  padding: 6px 12px;
  margin-bottom: 10px;
  width: fit-content;
`;

export const TextData = Styled(P)`
  color: rgba(0, 0, 0, 0.42);
  margin-bottom: 2px;
`;
