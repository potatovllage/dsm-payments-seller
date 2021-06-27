import { useRecoilState, useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import { useSocket } from '../../hooks/useSocket';
import { connectionConditionState } from '../../recoils/booth';
import { ERROR, NORMAL, SUCCESS } from '../../types';

const SocketConnectionCondition = () => {
  const [connectionCondition, setConnectionCondition] = useRecoilState(connectionConditionState);
  const { socket, socketConnectCount } = useSocket();

  return (
    <>
      {connectionCondition === ERROR && (
        <Wrap>
          인터넷 연결이 끊겼습니다. 실시간 결제 정보를 받고 싶으면
          <button
            className='connect-error'
            onClick={() => {
              socketConnectCount.current = 0;
              socket.current?.connect();
            }}
          >
            새로고침
          </button>
        </Wrap>
      )}
      {connectionCondition === SUCCESS && (
        <Wrap>
          인터넷 연결이 복귀되었습니다.
          <button
            onClick={() => {
              setConnectionCondition(NORMAL);
            }}
            className='connect-success'
          >
            X
          </button>
        </Wrap>
      )}
    </>
  );
};

const Wrap = styled.div`
  position: fixed;
  bottom: 18px;
  left: 18px;
  padding: 12px;
  border-radius: 16px;
  background-color: #232626;
  color: #e2e2e2;
  box-shadow: 0 0 5px #e2e2e2;
  font-size: 16px;
  z-index: 10;
  animation: slideUp 500ms ease-in-out;
  > .connect-error {
    padding: 8px;
    border: 0;
    border-radius: 12px;
    outline: none;
    background-color: transparent;
    color: #6bb3ff;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: #4599ff;
    }
  }
  > .connect-success {
    width: 24px;
    height: 24px;
    margin-left: 8px;
    border: 0;
    border-radius: 50%;
    outline: none;
    background-color: #5a6565;
    color: white;
    font-size: 14px;
    cursor: pointer;
    &:hover {
      background-color: #434b4b;
    }
  }
  @keyframes slideUp {
    from {
      bottom: -44px;
    }
    to {
      bottom: 18px;
    }
  }
`;

export default SocketConnectionCondition;
