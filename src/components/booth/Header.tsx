import styled from '@emotion/styled';

const Header = () => {
  return (
    <Wrap>
      <h1>부스 서비스</h1>
    </Wrap>
  );
};

const Wrap = styled.header`
  background-color: var(--base-color);
  padding: 18px 32px;
  > h1 {
    color: white;
    font-size: 20px;
    font-weight: 400;
  }
`;

export default Header;
