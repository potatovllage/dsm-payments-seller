import styled from '@emotion/styled';
import { FC } from 'react';

import { Navigation } from './';

const withNavigation = (MyComponent: FC) => {
  return ({ ...props }) => (
    <Wrap>
      <Navigation />
      <MyComponent {...props} />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  > main {
    flex: 1;
    margin: 24px 12px;
    padding: 32px 12px;
    border-radius: 4px;
    box-shadow: 0 3px 5px #afafaf;
  }
`;

export default withNavigation;
