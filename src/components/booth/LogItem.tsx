import styled from '@emotion/styled';

type Props = {
  id: number;
  userName: string;
  userNumber: number;
  boothName: string;
  requestedValue: number;
  tax: number;
  finalValue: number;
  createAt: string;
};

const LogItem = ({ id, userNumber, userName, requestedValue, tax, finalValue, boothName, createAt }: Props) => {
  return (
    <Wrap>
      <span className='id'>{id}</span>
      <span className='number'>{userNumber}</span>
      <span className='name'>{userName}</span>
      <span className={`requestedValue ${requestedValue > 0 ? 'positive' : 'negative'}`}>{requestedValue}</span>
      <span className={`tax negative`}>{-tax}</span>
      <span className={`finalValue ${finalValue > 0 ? 'positive' : 'negative'}`}>{finalValue}</span>
      <span className='place'>{boothName}</span>
      <span className='time'>{new Date(createAt).toLocaleTimeString()}</span>
    </Wrap>
  );
};

export const Wrap = styled.li`
  display: flex;
  padding: 12px 8px;
  font-size: 14px;
  &:first-of-type {
    color: #242424;
    font-weight: bold;
    > span {
      border-right: 2px solid var(--gray-color);
    }
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid var(--gray-color);
  }
  > span {
    min-width: 60px;
    padding: 4px 12px;
    color: #3a3a3a;
    &.id {
      width: 10%;
    }
    &.number {
      width: 5%;
    }
    &.name {
      width: 10%;
    }
    &.requestedValue,
    &.tax,
    &.finalValue {
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
      text-align: left;
    }
    &.time {
      width: 20%;
      text-align: left;
    }
  }
`;

export default LogItem;
