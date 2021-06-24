import styled from '@emotion/styled';

import LogItem from '../components/booth/LogItem';

export const BoothHistoryPage = () => {
  return (
    <Wrap>
      <div>
        <h1>결제 내역</h1>
      </div>
      <ul>
        <LogItem id='순서' number='학번' name='이름' coin='거래량' place='거래 부스' time='시간' />
        <LogItem id='1' number='3213' name='이성진' coin='+1000' place='맛난 음식점' time={new Date().toLocaleTimeString()} />
        <LogItem id='2' number='3213' name='이성진' coin='-1000' place='맛난 음식점' time={new Date().toLocaleTimeString()} />
      </ul>
    </Wrap>
  );
};

const Wrap = styled.main`
  > div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding: 0 16px;
    text-align: right;
  }
  > ul {
    height: calc(75px * 8);
    margin: 0 12px;
    border: 1px solid var(--gray-color);
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: white;
    }
    ::-webkit-scrollbar-thumb {
      background: #e2e2e2;
      border-radius: 4px;
    }
  }
`;
