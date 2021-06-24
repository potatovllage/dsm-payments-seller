import styled from '@emotion/styled';

type Props = {
  id: string;
  number: string;
  name: string;
  coin: string;
  place: string;
  time: string;
};

const LogItem = ({ id, number, name, coin, place, time }: Props) => {
  return (
    <Wrap>
      <span className='id'>{id}</span>
      <span className='number'>{number}</span>
      <span className='name'>{name}</span>
      <span className={`coin ${isNaN(+coin) ? '' : +coin > 0 ? 'positive' : 'negative'}`}>{coin}</span>
      <span className='place'>거래 {place}</span>
      <span className='time'>{time}</span>
    </Wrap>
  );
};

const Wrap = styled.li`
  display: flex;
  padding: 12px 8px;
  border-bottom: 1px solid var(--gray-color);
  font-size: 14px;
  &:first-of-type {
    color: #242424;
    font-weight: bold;
    > span {
      border-right: 2px solid var(--gray-color);
    }
  }
  > span {
    min-width: 60px;
    padding: 4px 12px;
    color: #3a3a3a;
    &.id {
      width: 5%;
    }
    &.number {
      width: 5%;
    }
    &.name {
      width: 10%;
    }
    &.coin {
      width: 15%;
      text-align: right;
      &.positive {
        color: var(--base-color);
      }
      &.negative {
        color: var(--blue-color);
      }
    }
    &.place {
      width: 15%;
    }
    &.time {
      width: 20%;
    }
  }
`;

export default LogItem;
