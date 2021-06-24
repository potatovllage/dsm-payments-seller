import { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import styled from '@emotion/styled';

import { postPaymentPermission } from '../apis/booth';

export const BoothQRReaderPage = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onScan = async (data: string | null) => {
    if (!data) return;

    alert(data);

    setIsSuccess(true);

    try {
      await postPaymentPermission(data);
    } catch (err) {
      alert('사용자 고유 번호 보내기 실패');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(false);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen]);

  return (
    <Wrap>
      {isOpen ? (
        <QrReader delay={1000} onError={() => {}} onScan={onScan} facingMode={'user'} />
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
          }}
        >
          QR 리더기 열기
        </button>
      )}
    </Wrap>
  );
};

const Wrap = styled.main`
  > section {
    max-width: 800px;
    max-height: 800px;
    margin: auto;
  }
  > button {
    width: 100%;
    padding: 24px;
    border: 0;
    background-color: #79b7ff;
    color: white;
    font-size: 20px;
    cursor: pointer;
  }
`;
