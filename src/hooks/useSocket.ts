import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import socketIO from 'socket.io-client';

import { SOCKET_URL } from '../apis/booth';
import { connectionConditionState, targetUuidState } from '../recoils/booth';
import { ERROR } from '../types';

export const useSocket = () => {
  const socket = useRef<SocketIOClient.Socket>();
  const socketConnectCount = useRef<number>(0);
  const setTargetUuid = useSetRecoilState(targetUuidState);
  const setConnectionCondition = useSetRecoilState(connectionConditionState);

  useEffect(() => {
    socket.current = socketIO.connect(SOCKET_URL, {
      transports: ['websocket'],
      forceNew: true,
    });

    socket.current.emit('auth', {
      accessToken: localStorage.getItem('accessToken'),
    });

    socket.current.on('booth-payment-permission', setTargetUuid);

    socket.current.on('connect_error', () => {
      if (socketConnectCount.current > 3) {
        socket.current?.disconnect();
        setConnectionCondition(ERROR);
        return;
      }

      socketConnectCount.current++;
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return { socket, socketConnectCount } as const;
};
