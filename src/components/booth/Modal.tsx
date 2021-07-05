import { useState, useEffect, ChangeEvent } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import QRCodeCanvas from 'qrcode.react';
import styled from '@emotion/styled';
import { IoWarningOutline } from 'react-icons/io5';

import Loading from '../Loading';
import { MenuType, UserType } from '../../types';
import { targetUuidState } from '../../recoils/booth';
import { getUserInfo, postPayment, postPaymentPermission } from '../../apis/booth';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { useBool, useInput, useLoading } from '../../hooks';

type Props = {
  selectedMenu: Omit<MenuType, 'boothId'>;
  closeModal: () => void;
};

type UserInfoProps = {
  targetUser: UserType;
};

type UuidInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClickGetUserInfo: () => void;
  unShowInput: () => void;
};

const Modal = ({ selectedMenu, closeModal }: Props) => {
  const { value, onChange } = useInput('');
  const [isShowUserInfo, setIsShowUserInfo] = useState<boolean>(false);
  const { bool: isShowInput, onTrue: showInput, onFalse: unShowInput } = useBool(false);
  const { loading, startLoading, endLoading } = useLoading(false);
  const { loading: payLoading, startLoading: startPayLoading, endLoading: endPayLoading } = useLoading(false);
  const [targetUser, setTargetUser] = useState<UserType | null>(null);
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
    endLoading();
  };

  const onClickPayment = async () => {
    if (!targetUser) return;

    startPayLoading();
    try {
      await postPayment(selectedMenu.menuId, targetUser.uuid);
      alert('결제가 완료되었습니다.');
    } catch (err) {
      alert('결제 실패');
    }
    endPayLoading();
    closeModal();
  };

  const onClickGetUserInfo = async () => {
    if (value.trim() === '') return alert('고유 번호를 입력해주세요.');

    startLoading();
    try {
      await postPaymentPermission(value);
    } catch (err) {
      alert('사용자 정보 가져오기 실패');
    }
    endLoading();
  };

  useDidMountEffect(() => {
    if (targetUuid !== '') {
      setIsShowUserInfo(true);
      setUserInfo();
    }
  }, [targetUuid]);

  useEffect(() => {
    resetTargetUuid();
    setTargetUser(null);
  }, []);

  return (
    <>
      <Back onClick={closeModal} />
      <Wrap>
        {loading ? (
          <Loading width='100px' style={{ display: 'block', margin: 'auto' }} />
        ) : (
          <>
            <p className='menu_name'>{selectedMenu.name}</p>
            <p className='menu_price'>
              {selectedMenu.price} 코인 {isNegative && <span className='menu_penalty_price'>(예상 지급 코인 : {-selectedMenu.price / 2} 코인)</span>}
            </p>
            {isNegative && (
              <p className='menu_penalty'>
                <IoWarningOutline />
                사용자에게 돈을 지급할 시 수수료가 붙습니다.
              </p>
            )}
            {isShowUserInfo ? (
              <div className='done'>
                {loading ? <Loading width='50px' /> : <UserInfoWrap>{targetUser && <UserInfo targetUser={targetUser} />}</UserInfoWrap>}
                <div className='qr_code'>{targetUuid && <QRCodeCanvas value={targetUuid} style={{ width: '100%', height: '100%' }} />}</div>
              </div>
            ) : (
              <>
                {isShowInput ? (
                  <UuidInput value={value} onChange={onChange} onClickGetUserInfo={onClickGetUserInfo} unShowInput={unShowInput} />
                ) : (
                  <div className='content'>
                    <div className='waiting'>
                      <p className='please-scan flex-center'>QR 코드를 스캔해주세요.</p>
                      <span onClick={showInput}>QR 코드가 없으신가요?</span>
                    </div>
                  </div>
                )}
              </>
            )}
            {payLoading ? (
              <Loading width='36px' height='36px' />
            ) : (
              <div className='buttons'>
                {targetUuid && <button onClick={onClickPayment}>결제</button>}
                <button onClick={closeModal}>취소</button>
              </div>
            )}
          </>
        )}
      </Wrap>
    </>
  );
};

const UserInfo = ({ targetUser }: UserInfoProps) => {
  const { uuid, number, name, coin } = targetUser;

  return (
    <>
      <p>
        <span>고유 번호</span>
        <span>{uuid}</span>
      </p>
      <p>
        <span>학번</span>
        <span>{number}</span>
      </p>
      <p>
        <span>이름</span>
        <span>{name}</span>
      </p>
      <p>
        <span>코인</span>
        <span>{coin.toLocaleString()}</span>
      </p>
    </>
  );
};

const UuidInput = ({ value, onChange, onClickGetUserInfo, unShowInput }: UuidInputProps) => {
  return (
    <UuidInputWrap>
      <p>QR 코드가 스캔이 되지 않는 경우 사용자 고유 번호를 입력해주세요.</p>
      <input
        type='text'
        placeholder='고유 번호(6자리)'
        value={value}
        onChange={onChange}
        onKeyPress={(e) => e.key === 'Enter' && onClickGetUserInfo()}
        autoFocus
      />
      <button onClick={onClickGetUserInfo}>완료</button>
      <span onClick={unShowInput}>QR 코드 스캔하기</span>
    </UuidInputWrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
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
  > .done {
    display: flex;
    justify-content: space-between;
    margin: 32px 0;
    > .qr_code {
      width: 150px;
      height: 150px;
    }
  }
  > .content {
    margin: 32px 0;
    > .waiting {
      text-align: center;
      > .please-scan {
        height: 150px;
        font-size: 24px;
      }
      > span {
        font-size: 14px;
        color: #3187d8;
        cursor: pointer;
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

const UserInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-right: 60px;
  > p > span {
    display: inline-block;
    &:first-of-type {
      width: 80px;
      color: #888888;
    }
    &:last-of-type {
      width: 100px;
      color: #2c2c2c;
      font-weight: 400;
    }
  }
`;

const UuidInputWrap = styled.div`
  margin: 32px 0;
  padding: 32px 0;
  text-align: center;
  > * {
    margin: 0 auto 12px;
  }
  > p {
    font-size: 14px;
    color: #474747;
  }
  > input {
    display: block;
    width: 60%;
    padding: 4px;
    border: 0;
    border-bottom: 2px solid #a1a1a1;
    outline: none;
    text-align: center;
  }
  > button {
    display: block;
    width: 50%;
    padding: 8px;
    border: 0;
    border-radius: 6px;
    outline: none;
    background: #3ad865;
    color: white;
    cursor: pointer;
  }
  > span {
    font-size: 14px;
    color: #3187d8;
    cursor: pointer;
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
