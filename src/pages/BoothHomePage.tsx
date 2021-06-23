import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import { Info } from '../components';
import { menuState } from '../recoils/booth';
import { BoothInfoType } from '../types';

export const BoothHomePage = () => {
  const [info, setInfo] = useState<BoothInfoType>({ id: 'b1', password: 'pass', name: '부스1', coin: 10000, totalCoin: 10000 });
  const menus = useRecoilValue(menuState);
  const { name, coin, totalCoin } = info;
  const menuCount = menus.length;
  const userCount = 104;
  const infos = [
    {
      title: '이름',
      content: name,
    },
    {
      title: '이용자',
      content: userCount.toLocaleString(),
    },
    {
      title: '메뉴 수',
      content: menuCount.toLocaleString(),
    },
    {
      title: '보유 코인',
      content: coin.toLocaleString(),
    },
    {
      title: '누적 코인',
      content: totalCoin.toLocaleString(),
    },
  ];

  return (
    <Wrap>
      <Info infos={infos} />
      <div className='graph'>graph</div>
    </Wrap>
  );
};

const Wrap = styled.main`
  display: flex;
  flex-direction: column;
`;
