import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import socketIO from 'socket.io-client';

import { targetUuidState } from '../recoils/booth';

const SOCKET_URL = 'https://d884b5cc4e25.ngrok.io';

export const useSocket = () => {
  const socketRef = useRef<SocketIOClient.Socket>();
  const setTargetUuid = useSetRecoilState(targetUuidState);

  useEffect(() => {
    socketRef.current = socketIO.connect(SOCKET_URL, { transports: ['websocket'] });

    socketRef.current.emit('auth', {
      accessToken: localStorage.getItem('accessToken'),
    });

    socketRef.current.on('booth-payment-permission', setTargetUuid);

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return { socketRef };
};
