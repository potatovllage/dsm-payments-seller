import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { IoLogoApple } from 'react-icons/io';
import { Input } from '../components';
import { postBoothLogin } from '../apis/booth';
import { useInput } from '../hooks/useInput';
import { useBool } from '../hooks/useBool';

export const BoothLoginPage = () => {
  const history = useHistory();
  const { value: id, onChange: onChangeId } = useInput('');
  const { value: password, onChange: onChangePassword } = useInput('');
  const { bool: loading, onTrue: startLoading, onFalse: endLoading } = useBool(false);

  const login = async () => {
    startLoading();
    try {
      const { data } = await postBoothLogin(id, password);

      localStorage.setItem('accessToken', data.accessToken);
      history.push('/booth');
    } catch (err) {
      alert('로그인 실패');
      endLoading();
    }
  };

  const isAllTyped = () => {
    if (id.trim() === '' || password.trim() === '') return false;
    return true;
  };

  return (
    <Wrap>
      <div>
        <IoLogoApple />
        <Input
          labelText='아이디'
          inputAttr={{
            type: 'text',
            placeholder: 'id',
            value: id,
            onChange: onChangeId,
          }}
        />
        <Input
          labelText='비밀번호'
          inputAttr={{
            type: 'password',
            placeholder: 'password',
            value: password,
            onChange: onChangePassword,
            onKeyPress: (e) => e.key === 'Enter' && login(),
          }}
        />
        {loading ? (
          <ul className='flex-center'>
            <DotLoaderWrap wait={100} />
            <DotLoaderWrap wait={200} />
            <DotLoaderWrap wait={300} />
          </ul>
        ) : (
          <button disabled={!isAllTyped()} onClick={login}>
            로그인
          </button>
        )}
      </div>
    </Wrap>
  );
};

const Wrap = styled.main`
  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 30%;
    margin: 200px auto 0;
    > svg {
      width: 80px;
      height: 80px;
      margin: 0 auto 30px;
    }
    > button {
      margin-top: 20px;
      padding: 16px;
      border: 0;
      border-radius: 8px;
      background-color: var(--base-color);
      color: white;
      transition: 300ms;
      cursor: pointer;
      &:disabled {
        background-color: gray;
      }
    }
    > ul {
      margin-top: 40px;
      @keyframes dotLoader {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-100%);
        }
        100% {
          transform: translateY(0);
        }
      }
    }
  }
`;

const DotLoaderWrap = styled.li<{ wait: number }>`
  width: 14px;
  height: 14px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #d0d0d0;
  animation: dotLoader 1000ms ${({ wait }) => wait}ms cubic-bezier(0.3, 1, 0.2, 0.95) infinite;
`;
