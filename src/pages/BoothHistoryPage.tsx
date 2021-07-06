import styled from '@emotion/styled';
import { useState } from 'react';
import { useEffect } from 'react';

import { getPaymentHistory } from '../apis/booth';
import { Loading, LogItem } from '../components';
import { Receipt } from '../types';
import { Wrap as LogItemWrap } from '../components/booth/LogItem';
import { useLoading } from '../hooks';

export const BoothHistoryPage = () => {
  const [histories, setHistories] = useState<Receipt[]>([]);
  const { loading, startLoading, endLoading } = useLoading(false);

  const fetchHistory = async () => {
    startLoading();
    try {
      const { data } = await getPaymentHistory(0);

      setHistories(data.receipts);
    } catch (err) {
      alert('결제 내역 가져오기 실패');
    }
    endLoading();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Wrap>
      <div>
        <h1>결제 내역</h1>
      </div>
      <ul>
        <LogItemWrap>
          <span className='id'>영수증 ID</span>
          <span className='number'>학번</span>
          <span className='name'>이름</span>
          <span className='requestedValue'>요청 거래량</span>
          <span className='tax'>수수료</span>
          <span className='finalValue'>최종 거래량</span>
          <span className='place'>거래 부스</span>
          <span className='time'>시간</span>
        </LogItemWrap>
        {loading ? <Loading width='50px' height='50px' /> : histories.map((history) => <LogItem key={history.id} {...history} />)}
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
  }
  > ul {
    height: calc(75px * 8);
    margin: 0 12px;
    border: 1px solid var(--gray-color);
    text-align: center;
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
