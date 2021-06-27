import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';

import { useSocket } from '../../hooks/useSocket';
import { connectionConditionState } from '../../recoils/booth';

const SocketConnectionCondition = () => {
  const connectionCondition = useRecoilValue(connectionConditionState);
  const { socket, socketConnectCount } = useSocket();

  return (
    <>
      {connectionCondition && (
        <Wrap>
          실시간 연결이 끊겼습니다. 결제 정보를 실시간으로 받고 싶으면{' '}
          <button
            onClick={() => {
              socketConnectCount.current = 0;
              socket.current?.connect();
            }}
          >
            새로고침
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
  background-color: white;
  box-shadow: 0 0 5px #e2e2e2;
  z-index: 10;
  animation: slideUp 500ms ease-in-out;
  > button {
    margin-left: 8px;
    padding: 8px;
    border: 1px solid #dfdfdf;
    border-radius: 12px;
    background-color: white;
    box-shadow: 0 3px 5px #e2e2e2;
    color: #3161ff;
    cursor: pointer;
    &:active {
      transform: scale(0.95);
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
