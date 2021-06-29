import { useEffect } from 'react';
import styled from '@emotion/styled';

import { Info } from '../components';
import { useBooth } from '../hooks/useBooth';

export const BoothHomePage = () => {
  const { fetchBooth, loading } = useBooth();

  useEffect(() => {
    fetchBooth();
  }, []);

  return (
    <Wrap>
      <Info loading={loading} />
      <div className='graph'>graph</div>
    </Wrap>
  );
};

const Wrap = styled.main`
  display: flex;
  flex-direction: column;
`;
