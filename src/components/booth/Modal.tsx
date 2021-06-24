import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import QRCodeCanvas from 'qrcode.react';
import styled from '@emotion/styled';
import { IoWarningOutline } from 'react-icons/io5';

import { MenuType, UserType } from '../../types';
import { targetUuidState } from '../../recoils/booth';
import { getUserInfo, postPayment } from '../../apis/booth';
import useDidMountEffect from '../../hooks/useDidMountEffect';

type Props = {
  selectedMenu: Omit<MenuType, 'boothId'>;
  closeModal: () => void;
};

const initialUser = { uuid: '', name: '', number: 0, coin: 0 };

const Modal = ({ selectedMenu, closeModal }: Props) => {
  const [bool, setBool] = useState<boolean>(false);
  const [targetUser, setTargetUser] = useState<UserType>(initialUser);
  const targetUuid = useRecoilValue(targetUuidState);
  const resetTargetUuid = useResetRecoilState(targetUuidState);
  const isNegative = selectedMenu.price < 0;

  const setUserInfo = async () => {
    try {
      const { data } = await getUserInfo(targetUuid);

      setTargetUser(data);
    } catch (err) {
      alert('유저 정보 얻기 실패');
    }
  };

  const onClickPayment = async () => {
    closeModal();

    try {
      await postPayment(selectedMenu.menuId, targetUser.uuid);
      closeModal();
    } catch (err) {
      alert('결제 실패');
    }
  };

  useDidMountEffect(() => {
    if (targetUuid !== '') {
      setBool(true);
      setUserInfo();
    }
  }, [targetUuid]);

  useEffect(() => {
    resetTargetUuid();
    setTargetUser(initialUser);
    return () => {
      resetTargetUuid();
      setTargetUser(initialUser);
    };
  }, []);

  return (
    <>
      <Back onClick={closeModal} />
      <Wrap>
        <p className='menu_name'>{selectedMenu.name}</p>
        <p className='menu_price'>
          {selectedMenu.price} 코인 {isNegative && <span className='menu_penalty_price'>(예상 지급 코인 : 500 코인)</span>}
        </p>
        {isNegative && (
          <p className='menu_penalty'>
            <IoWarningOutline />
            사용자에게 돈을 지급할 시 수수료가 붙습니다.
          </p>
        )}
        <div className='content'>
          {bool ? (
            <div className='done'>
              <div className='user_info'>
                <p>
                  <span>고유 번호</span>
                  <span>{targetUser.uuid || ''}</span>
                </p>
                <p>
                  <span>학번</span>
                  <span>{targetUser.number || ''}</span>
                </p>
                <p>
                  <span>이름</span>
                  <span>{targetUser.name || ''}</span>
                </p>
                <p>
                  <span>코인</span>
                  <span>{targetUser.coin || ''}</span>
                </p>
              </div>
              <div className='qr_code'>{targetUuid && <QRCodeCanvas value={targetUuid} style={{ width: '100%', height: '100%' }} />}</div>
            </div>
          ) : (
            <p className='waiting flex-center'>QR 코드를 스캔해주세요.</p>
          )}
        </div>
        <div className='buttons'>
          {targetUuid && <button onClick={onClickPayment}>결제</button>}
          <button onClick={closeModal}>취소</button>
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 52px;
  border-radius: 8px;
  box-shadow: 0 3px 5px #e2e2e2;
  background-color: white;
  font-weight: 300;
  > p {
    font-weight: 200;
  }
  > .menu_name {
    color: #020202;
    font-size: 28px;
  }
  > .menu_price {
    color: #242424;
    font-size: 16px;
    margin: 4px 0 -2px;
    > .menu_penalty_price {
      color: var(--base-color);
    }
  }
  > .menu_penalty {
    display: flex;
    align-items: center;
    font-size: 12px;
    > svg {
      color: var(--base-color);
      margin-right: 4px;
    }
  }
  > .content {
    margin: 32px 0;
    > .waiting {
      height: 150px;
      font-size: 24px;
      text-align: center;
    }
    > .done {
      display: flex;
      > .user_info {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-right: 60px;
        > p {
          > span {
            display: inline-block;
            &:first-of-type {
              width: 80px;
              color: #888888;
            }
            &:last-of-type {
              width: 60px;
              color: #2c2c2c;
              font-weight: 400;
            }
          }
        }
      }
      > .qr_code {
        width: 150px;
        height: 150px;
      }
    }
  }
  > .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    > button {
      margin-left: 12px;
      padding: 10px 24px;
      border: 0;
      border-radius: 4px;
      color: white;
      cursor: pointer;
      &:first-of-type {
        background-color: var(--base-color);
      }
      &:last-of-type {
        background-color: var(--blue-color);
      }
    }
  }
`;

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(206, 206, 206, 0.2);
  cursor: pointer;
`;

const ModalPortal = (props: Props) => {
  const modal = document.getElementById('modal');

  if (!modal) return null;

  return createPortal(<Modal {...props} />, modal);
};

export default ModalPortal;
