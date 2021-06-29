import { useEffect, useState } from 'react';
import QrReader from 'react-qr-reader';
import styled from '@emotion/styled';

import paymentSuccessSound from '../assets/sound/paymentSuccess.mp3';
import { postPaymentPermission } from '../apis/booth';

type WProp = {
  deviceSize: {
    width: number;
    height: number;
  };
  isScanSuccess: boolean;
};

type DeviceSize = {
  width: number;
  height: number;
};

export const QRCodeReaderPage = () => {
  const [isSelfCameraMode, setIsSelfCameraMode] = useState<boolean>(true);
  const [isScanSuccess, setIsScanSuccess] = useState<boolean>(false);
  const [isEnableScan, setIsEnableScan] = useState<boolean>(true);
  const [deviceSize, setDeviceSize] = useState<DeviceSize>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const onScan = async (data: string | null) => {
    if (!data) return;

    if (isEnableScan && data) {
      const audio = new Audio(paymentSuccessSound);

      audio.play();
      setIsEnableScan(false);
      setIsScanSuccess(true);
      setTimeout(() => {
        setIsScanSuccess(false);
      }, 1000);
      setTimeout(() => {
        setIsEnableScan(true);
      }, 5000);

      try {
        await postPaymentPermission(data);
      } catch (err) {
        alert('사용자 정보 가져오기 실패');
      }
    }
  };

  useEffect(() => {
    const resizeHandler = () => {
      setDeviceSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return (
    <Wrap deviceSize={deviceSize} isScanSuccess={isScanSuccess}>
      <QrReader
        className='qr-code-reader'
        delay={5000}
        onError={() => alert('QR 스캔 실패')}
        onScan={onScan}
        facingMode={isSelfCameraMode ? 'user' : 'environment'}
      />
      <footer
        onClick={() => {
          setIsSelfCameraMode((prev) => !prev);
        }}
      >
        <p>카메라 전환</p>
      </footer>
    </Wrap>
  );
};

const Wrap = styled.div<WProp>`
  background-color: rgba(0, 0, 0, 40%);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 60px;
  > section {
    max-width: 800px;
    max-height: 800px;
    margin: auto;
  }
  > .qr-code-reader {
    transform: scaleX(-1);
    @media screen and (orientation: portrait) {
      width: ${({ deviceSize: { width } }) => width}px;
      height: ${({ deviceSize: { height } }) => height}px;
    }

    @media screen and (orientation: landscape) {
      width: ${({ deviceSize: { width } }) => width - 60}px;
      height: ${({ deviceSize: { height } }) => height - 60}px;
    }

    > section > div {
      box-shadow: inset ${({ isScanSuccess }) => (isScanSuccess ? '0 0 0 5px rgba(0, 255, 0, 50%)' : '0 0 0 5px rgba(255, 0, 0, 50%)')} !important;
    }
  }

  > footer {
    z-index: 1;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #00c250;
    display: flex;
    align-items: center;
    cursor: pointer;

    > p {
      width: 100%;
      text-align: center;
      color: #ffffff;
      font-size: 24px;
    }
  }
`;

const ButtonWrap = styled.button`
  width: 100%;
  padding: 24px;
  border: 0;
  background-color: #79b7ff;
  color: white;
  font-size: 20px;
  cursor: pointer;
`;
