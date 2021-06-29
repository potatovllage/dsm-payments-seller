import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { Loading } from '../';
import { boothState, menuState } from '../../recoils/booth';

type Props = {
  loading: boolean;
};

const Info = ({ loading }: Props) => {
  const info = useRecoilValue(boothState);
  const menus = useRecoilValue(menuState);
  const { name, coin, numOfUsers, totalCoin } = info;
  const menuCount = menus.length;
  const infos = [
    {
      title: '이름',
      content: name,
    },
    {
      title: '이용자',
      content: numOfUsers.toLocaleString(),
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
      {loading ? (
        <Loading height='80px' />
      ) : (
        infos.map(({ title, content }) => (
          <li key={title}>
            <div>
              <span>{title}</span>
              <span>{content}</span>
            </div>
          </li>
        ))
      )}
    </Wrap>
  );
};

const Wrap = styled.ul`
  flex: 1;
  display: flex;
  > li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &:not(:first-of-type) > div {
      border-left: 3px solid #c3c3c3;
    }
    > div {
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      text-align: center;
      > span {
        color: #242424;
        font-weight: 300;
        &:first-of-type {
          margin-bottom: 8px;
          color: #999999;
          font-size: 20px;
        }
        &:last-of-type {
          color: #4c4c4c;
          font-size: 24px;
        }
      }
    }
  }
  @media all and (max-width: 425px) {
    flex-direction: column;
    > li {
      margin: 8px 0;
      > div {
        padding-bottom: 8px;
        border-left: 0 !important;
        border-bottom: 3px solid #c3c3c3;
      }
    }
  }
`;

export default Info;
