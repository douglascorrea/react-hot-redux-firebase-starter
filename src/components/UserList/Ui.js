import Styled from 'styled-components';

import { FlatList } from 'react-native';

import * as colors from '~/styles/colors';

export const Container = Styled(FlatList)`
  max-height: 100%;
  border-left: 1px solid ${colors.borderDefault}
`;
