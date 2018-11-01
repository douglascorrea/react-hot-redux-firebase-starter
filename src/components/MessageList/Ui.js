import Styled from 'styled-components';

import TextInput from '~/components/TextInput';

import {
  View,
  FlatList,
  ScrollView,
} from 'react-native';

export const Container = Styled(FlatList)`
  padding: 10px;
  max-height: 100%;
`;

export const ContentContainer = Styled(View)`
  flex: 1;
  flex-direction: column;
`;
