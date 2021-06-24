import styled from '@emotion/styled';

type Info = {
  title: string;
  content: string;
};

type Props = {
  infos: Info[];
};

const Info = ({ infos }: Props) => {
  return (
    <Wrap>
      {infos.map(({ title, content }) => (
        <li key={title}>
          <div>
            <span>{title}</span>
            <span>{content}</span>
          </div>
        </li>
      ))}
    </Wrap>
  );
};

const Wrap = styled.ul`
  flex: 1;
  display: flex;
  > li {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    &:not(:first-of-type) > div {
      border-left: 3px solid #c3c3c3;
    }
    > div {
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      text-align: center;
      > span {
        color: #242424;
        font-weight: 300;
        &:first-of-type {
          margin-bottom: 8px;
          color: #999999;
          font-size: 20px;
        }
        &:last-of-type {
          color: #4c4c4c;
          font-size: 24px;
        }
      }
    }
  }
  @media all and (max-width: 425px) {
    flex-direction: column;
    > li {
      margin: 8px 0;
      > div {
        padding-bottom: 8px;
        border-left: 0 !important;
        border-bottom: 3px solid #c3c3c3;
      }
    }
  }
`;

export default Info;
