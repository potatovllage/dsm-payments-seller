import { useEffect } from 'react';
import styled from '@emotion/styled';

import { Menus, Loading } from '../components';
import { useMenu } from '../hooks/useMenu';

export const BoothPayPage = () => {
  const { menus, getMenus, addMenu, deleteMenu, loading } = useMenu();

  useEffect(() => {
    getMenus();
  }, []);

  return (
    <Wrap>
      <div>
        <h1>결제</h1>
        {loading && <Loading width='60px' height='60px' />}
      </div>
      <Menus menus={menus} addMenu={addMenu} deleteMenu={deleteMenu} />
    </Wrap>
  );
};

const Wrap = styled.main`
  > div {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    height: 60px;
    padding: 0 16px;
    text-align: right;
    > button {
      padding: 8px;
      border: 0;
      border-radius: 8px;
      background-color: var(--base-color);
      color: white;
      cursor: pointer;
    }
  }
  > hr {
    margin: 18px 0;
    border: 1px solid #d2d2d2;
  }
`;
