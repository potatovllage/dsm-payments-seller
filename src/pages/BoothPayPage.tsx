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
        <span>메뉴를 추가하실 때 가격에 -(마이너스)값을 부여하면 해당 메뉴 결제 시 사용자에게 코인이 지급되고 부스 코인이 차감됩니다.</span>
        {loading && <Loading width='60px' height='60px' />}
      </div>
      <Menus menus={menus} addMenu={addMenu} deleteMenu={deleteMenu} />
    </Wrap>
  );
};

const Wrap = styled.main`
  > div {
    display: flex;
    align-items: flex-end;
    height: 60px;
    line-height: 1;
    margin-bottom: 12px;
    padding: 0 16px;
    text-align: right;
    > span {
      margin-left: 12px;
      color: #5a5a5a;
      font-size: 12px;
    }
  }
  > hr {
    margin: 18px 0;
    border: 1px solid #d2d2d2;
  }
`;
