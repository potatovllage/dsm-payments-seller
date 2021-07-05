import { NavLink, Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineHistory, MdPayment, AiOutlineLogout, IoQrCode } from 'react-icons/all';
import styled from '@emotion/styled';

const Navigation = () => {
  const logout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <Wrap>
      <NavLink to='/' exact activeClassName='active'>
        <AiOutlineHome />
        <span>홈</span>
      </NavLink>
      <NavLink to='/payment' exact activeClassName='active'>
        <MdPayment />
        <span>결제</span>
      </NavLink>
      <NavLink to='/history' exact activeClassName='active'>
        <AiOutlineHistory />
        <span>결제 내역</span>
      </NavLink>
      <a href='/qr-code.html'>
        <IoQrCode />
        <span>QR 코드</span>
      </a>
      <Link to='/login' onClick={logout}>
        <AiOutlineLogout />
        <span>로그아웃</span>
      </Link>
    </Wrap>
  );
};

const Wrap = styled.nav`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  min-width: 150px;
  margin-top: 24px;
  > a {
    display: flex;
    align-items: center;
    padding: 12px 28px;
    border-radius: 0 18px 18px 0;
    color: #242424;
    font-weight: 300;
    text-decoration: none;
    &.active {
      color: var(--base-color);
      background-color: #f5f5f5;
    }
    > svg {
      width: 20px;
      height: 20px;
      margin-right: 12px;
    }
  }
  @media all and (max-width: 425px) {
    justify-content: center;
    > a > svg {
      display: none;
    }
  }
`;

export default Navigation;
